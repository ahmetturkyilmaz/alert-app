let environment = process.env.NODE_ENV;

if (!environment) {
	require("dotenv").config();
	environment = process.env.ACTIVE_PROFILE;
}
import { binanceService, notificationService, sqsService } from "./services/factory";

async function processPrices(): Promise<void> {
	try {
		const fetchedPrices = await binanceService.fetchBinancePrices();
		const triggeredNotifications = await notificationService.getTriggeredNotifications(fetchedPrices);
		for (const { symbol, target_price, condition, user_id } of triggeredNotifications) {
			sqsService
				.sendNotification(process.env.AWS_SQS_NOTIFICATION_ARN || "", {
					symbol,
					target_price,
					condition,
					user_id,
				})
				.catch(console.error);
		}
	} catch (error) {
		console.error("Error fetching or processing data:", (error as Error).message);
	}
}

async function loop(): Promise<void> {
	while (true) {
		await processPrices();
		await new Promise((resolve) => setTimeout(resolve, 10000));
	}
}

loop().catch((error) => console.error("Loop error:", error));

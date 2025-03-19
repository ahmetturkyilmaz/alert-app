import type { NotificationService } from "./NotificationService";
import type { SQSService } from "./SQSService";
import { CryptoPriceAdapter } from "./adapters/CryptoPriceAdapter";

export class PriceMonitoringService {
  constructor(
    private readonly priceAdapter: CryptoPriceAdapter,
    private readonly notificationService: NotificationService,
    private readonly sqsService: SQSService,
  ) {}

  async processPrices(): Promise<void> {
    try {
      const fetchedPrices = await this.priceAdapter.fetchPrices();
      const notificationsToTrigger =
        await this.notificationService.getTriggeredNotifications(fetchedPrices);

      for (const notification of notificationsToTrigger) {
        this.sqsService
          .sendNotification(
            process.env.AWS_SQS_NOTIFICATION_ARN || "",
            notification,
          )
          .catch(console.error);
      }
    } catch (error) {
      console.error(
        "Error fetching or processing data:",
        (error as Error).message,
      );
    }
  }

  async startMonitoring(interval = 10000): Promise<void> {
    while (true) {
      await this.processPrices();
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
  }
}

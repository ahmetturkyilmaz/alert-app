import {dbClient} from "../src/config/database";
import {notificationService} from "../src/services";

jest.mock("../src/config/database", () => ({
    dbClient: {
        query: jest.fn(),
    },
}));

describe("getTriggeredNotifications", () => {
    it("should return notifications for matching conditions", async () => {
        const mockPrices = [
            {symbol: "BTCUSDT", price: 46000.0},
            {symbol: "ETHUSDT", price: 3200.0},
        ];

        const mockDbResponse = {
            rows: [
                {symbol: "BTCUSDT", target_price: 45000, condition: ">", user_id: 1, current_price: 46000},
            ],
        };

        (dbClient.query as jest.Mock).mockResolvedValue(mockDbResponse);

        const notifications = await notificationService.getTriggeredNotifications(mockPrices);

        expect(notifications).toEqual([
            {symbol: "BTCUSDT", targetPrice: 45000, condition: ">", userId: 1, currentPrice: 46000},
        ]);

    });

    it("should return an empty array if no conditions are met", async () => {
        const mockPrices = [{symbol: "BTCUSDT", price: 44000.0}];

        (dbClient.query as jest.Mock).mockResolvedValue({rows: []});

        const notifications = await notificationService.getTriggeredNotifications(mockPrices);

        expect(notifications).toEqual([]);
    });

    it("should handle database errors", async () => {
        (dbClient.query as jest.Mock).mockRejectedValue(new Error("DB error"));

        await expect(notificationService.getTriggeredNotifications([])).rejects.toThrow("DB error");
    });
});

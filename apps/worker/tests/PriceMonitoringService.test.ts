import type { BinanceService } from "../src/services/BinanceService";
import type { NotificationService } from "../src/services/NotificationService";
import { PriceMonitoringService } from "../src/services/PriceMonitoringService";
import type { SQSService } from "../src/services/SQSService";

jest.mock("../src/services/BinanceService");
jest.mock("../src/services/NotificationService");
jest.mock("../src/services/SQSService");

describe("PriceMonitoringService", () => {
  let priceMonitoringService: PriceMonitoringService;
  let binanceService: jest.Mocked<BinanceService>;
  let notificationService: jest.Mocked<NotificationService>;
  let sqsService: jest.Mocked<SQSService>;

  beforeEach(() => {
    binanceService = {
      fetchBinancePrices: jest.fn(),
    } as unknown as jest.Mocked<BinanceService>;
    notificationService = {
      getTriggeredNotifications: jest.fn(),
    } as unknown as jest.Mocked<NotificationService>;
    sqsService = {
      sendNotification: jest.fn().mockResolvedValue(undefined),
    } as unknown as jest.Mocked<SQSService>;

    priceMonitoringService = new PriceMonitoringService(
      binanceService,
      notificationService,
      sqsService,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch prices and send notifications when conditions match", async () => {
    const mockPrices = [{ symbol: "BTCUSDT", price: 46000 }];
    const mockNotifications = [
      {
        pair: "BTCUSDT",
        targetPrice: 45000,
        triggerCondition: 2,
        userId: 1,
        currentPrice: 46000,
      },
    ];

    binanceService.fetchBinancePrices.mockResolvedValue(mockPrices);
    notificationService.getTriggeredNotifications.mockResolvedValue(
      mockNotifications,
    );

    await priceMonitoringService.processPrices();

    expect(binanceService.fetchBinancePrices).toHaveBeenCalled();
    expect(notificationService.getTriggeredNotifications).toHaveBeenCalledWith(
      mockPrices,
    );
    expect(sqsService.sendNotification).toHaveBeenCalledWith(
      process.env.AWS_SQS_NOTIFICATION_ARN || "",
      mockNotifications[0],
    );
  });

  it("should handle errors in processPrices gracefully", async () => {
    const error = new Error("Binance API failure");
    binanceService.fetchBinancePrices.mockRejectedValue(error);

    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    await priceMonitoringService.processPrices();

    expect(consoleSpy).toHaveBeenCalledWith(
      "Error fetching or processing data:",
      "Binance API failure",
    );
    consoleSpy.mockRestore();
  });
});

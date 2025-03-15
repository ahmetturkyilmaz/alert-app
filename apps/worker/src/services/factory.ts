import { SQSClient } from "@aws-sdk/client-sqs";
import { BinanceService } from "./BinanceService";
import { NotificationService } from "./NotificationService";
import { PriceMonitoringService } from "./PriceMonitoringService";
import { SQSService } from "./SQSService";

export const binanceService = new BinanceService();
export const notificationService = new NotificationService();
export const sqsService = new SQSService(
  new SQSClient({ region: process.env.AWS_REGION }),
);
export const priceMonitoringService = new PriceMonitoringService(
  binanceService,
  notificationService,
  sqsService,
);

import {SQSClient} from "@aws-sdk/client-sqs";
import {BinanceService} from "./BinanceService";
import {NotificationService} from "./NotificationService";
import {SQSService} from "./SQSService";

export const binanceService = new BinanceService();
export const notificationService = new NotificationService();
export const sqsService = new SQSService(new SQSClient({region: process.env.AWS_REGION}));

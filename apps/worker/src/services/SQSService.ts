import {type SQSClient, SendMessageCommand} from "@aws-sdk/client-sqs";
import type {Alert} from "../types";

export class SQSService {
    private _sqsClient: SQSClient;

    constructor(sqsClient: SQSClient) {
        this._sqsClient = sqsClient;
    }

    async sendNotification(queueUrl: string, {symbol, targetPrice, condition, userId}: Alert): Promise<void> {
        const message = {
            QueueUrl: queueUrl,
            MessageBody: JSON.stringify({symbol, targetPrice, condition, userId}),
        };
        try {
            //	await this._sqsClient.send(new SendMessageCommand(message)); send a message to notification services
            console.debug("Sending message", message);
        } catch (error) {
            console.error("Error sending SQS message:", (error as Error).message);
        }
    }
}

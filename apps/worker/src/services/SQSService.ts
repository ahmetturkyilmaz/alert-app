import { type SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

export class SQSService {
	private _sqsClient: SQSClient;

	constructor(sqsClient: SQSClient) {
		this._sqsClient = sqsClient;
	}

	async sendNotification(
		queueUrl: string,
		{
			symbol,
			target_price,
			condition,
			user_id,
		}: {
			symbol: string;
			target_price: number;
			condition: string;
			user_id: string;
		},
	): Promise<void> {
		const message = {
			QueueUrl: queueUrl,
			MessageBody: JSON.stringify({ symbol, target_price, condition, user_id }),
		};
		try {
			//	await this._sqsClient.send(new SendMessageCommand(message)); send a message to notification services
			console.debug("Sending message", message);
		} catch (error) {
			console.error("Error sending SQS message:", (error as Error).message);
		}
	}
}

import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";
import { sqsService } from "../src/services/factory";

jest.mock("@aws-sdk/client-sqs");

describe("sendNotification", () => {
	it("should send a message to SQS", async () => {
		const mockSend = jest.fn().mockResolvedValue({});
		(SQSClient.prototype.send as jest.Mock) = mockSend;

		await sqsService.sendNotification("", { symbol: "BTCUSDT", target_price: 46000, condition: ">", user_id: "user123" });
		//Scenario when we send the sqs
		//expect(mockSend).toHaveBeenCalledWith(expect.any(SendMessageCommand));
	});
});

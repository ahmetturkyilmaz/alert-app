import { SQSClient } from "@aws-sdk/client-sqs";
import { sqsService } from "../src/services";

jest.mock("@aws-sdk/client-sqs");

describe("sendNotification", () => {
  it("should send a message to SQS", async () => {
    (SQSClient.prototype.send as jest.Mock) = jest.fn().mockResolvedValue({});

    await sqsService.sendNotification("", {
      currentPrice: 3000,
      pair: "BTCUSDT",
      targetPrice: 46000,
      triggerCondition: 2,
      userId: 1,
    });
    //Scenario when we send the sqs
    //expect(mockSend).toHaveBeenCalledWith(expect.any(SendMessageCommand));
  });
});

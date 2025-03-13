# Crypto-Alert-Service

## Design
This solution consists of two main components:

Service – This handles all the information users enter through the UI or API. It processes, validates, and stores the data.

Worker – This component fetches real-time price data from the Binance API and continuously checks if any user-defined notification conditions are met. If a price reaches a level set by the user, the worker prepares the notification details and sends them to AWS SQS for further processing.

Once the message is in AWS SQS, it can trigger an AWS Lambda function, which processes the notification and determines the best way to alert the user. Depending on the user’s preferences, the notification can then be sent via mobile push notifications, email, or desktop alerts.
## Local Installation

```
cd deployments && docker-compose up -d
```

## CI/CD
In a production scenario both service and worker can be placed in AWS ECS along with other services
# Crypto-Alert-Service

## Design
This solution consists of two main components:

Service – This handles all the information users enter through the UI or API. It processes, validates, and stores the data.

Worker – This component fetches real-time price data from the Binance API and continuously checks if any user-defined notification conditions are met. If a price reaches a level set by the user, the worker prepares the notification details and sends them to AWS SQS for further processing.

Once the message is in AWS SQS, it can trigger an AWS Lambda function, which processes the notification and determines the best way to alert the user. Depending on the user’s preferences, the notification can then be sent via mobile push notifications, email, or desktop alerts.

## Local Installation

```shell
cd deployments && docker-compose up -d
```

## CI/CD
In a production environment, both the Service and the Worker components can be deployed on AWS ECS (Elastic Container Service), alongside other services that are part of the application architecture.

The application container images are stored in AWS ECR (Elastic Container Registry), which acts as the central repository for the images. The containers can be pulled from ECR and run in ECS clusters.

And as a database solution AWS RDS can be used.


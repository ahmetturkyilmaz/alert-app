# Crypto-Alert-Service

## Design
This solution consists of two main components:

Service – This handles all the information users enter through the UI or API. It processes, validates, and stores the data.

Worker – This component fetches real-time price data from the Binance API and continuously checks if any user-defined notification conditions are met. If a price reaches a level set by the user, the worker prepares the notification details and sends them to AWS SQS for further processing.

Once the message is in AWS SQS, it can trigger an AWS Lambda function, which processes the notification and determines the best way to alert the user. Depending on the user’s preferences, the notification can then be sent via mobile push notifications, email, or desktop alerts.

<img width="1135" alt="Screenshot 2025-03-17 at 00 54 21" src="https://github.com/user-attachments/assets/b50f169c-dd4d-4adb-b357-b558e17c340d" />

## Local Installation

```shell
cd deployment && docker-compose up -d
```
## Creating an Alert for Bitcoin Price

To create an alert for when the Bitcoin price reaches a certain level, you need to make a POST request to the /api/alerts endpoint. You will provide the following:

- Authorization: Include a Bearer token in the Authorization header. This token should contain your user information.
- Trigger Condition: Specify the condition for the alert (1 for below the target price or 2 for above).
- Target Price: The price at which you want the alert to trigger.
- Pair: The trading pair symbol, such as BTCUSDT.

```
curl --location 'https://alert-service-1735384669.eu-central-1.elb.amazonaws.com/api/alerts' \
--header 'Content-Type: application/json' \
<img width="1262" alt="Screenshot 2025-03-17 at 00 20 35" src="https://github.com/user-attachments/assets/43913463-829b-470d-a2f7-74622c9c7924" />
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlcklkIjoxLCJpYXQiOjE1MTYyMzkwMjJ9.IMAHjoM9_YlMcuyWMRAD1-4Yd0Q-9neuHSznjog6nnY' \
--data '{
    "triggerCondition":2,
    "targetPrice":85024.01000000,
    "pair":"BTCUSDT"
}'
```

## Worker for Sending Notifications

The worker is responsible for checking the database at regular intervals to identify notifications that need to be sent to users. It checks the current Bitcoin price from the Binance API and determines if any alerts need to be triggered.


- The worker checks the database for users who have set alerts based on a price condition (e.g., price above or below a target).
- The current Bitcoin price is fetched from the Binance API.
- Note: The worker does not check if the price has just crossed the target price. To handle this, a pricing service implementation is needed.
- This pricing service could be implemented in various ways, including using an AWS Lambda function to track price changes and notify users when conditions are met.
- Once an alert condition is met, the worker sends a notification to Amazon SQS (Simple Queue Service). From there, any AWS Lambda function can pick up the message and handle the notification (via email, web, or mobile notifications).

Alternative Solution: AWS Lambda
Instead of a worker running at intervals, this pricing logic could be implemented using AWS Lambda to perform real-time checks whenever there's a change in the price, reducing the need for frequent database checks and improving responsiveness.

## CI/CD
In a production environment, both the Service and the Worker components can be deployed on AWS ECS (Elastic Container Service), alongside other services that are part of the application architecture.

The application container images are stored in AWS ECR (Elastic Container Registry), which acts as the central repository for the images. The containers can be pulled from ECR and run in ECS clusters.

And as a database solution AWS RDS can be used.


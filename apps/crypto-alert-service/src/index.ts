import dotenv from "dotenv";

let environment = process.env.NODE_ENV;
if (!environment) {
  dotenv.config();
  environment = process.env.ACTIVE_PROFILE;
}

import bodyParser from "body-parser";
import express from "express";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { errorHandler } from "./middlewares";
import { alerts, healthCheck } from "./routes";
import { standardLimiter } from "./utils/rateLimiters";

const port = process.env.PORT || 3000;
const profile = process.env?.NODE_ENV ?? "development";
import swaggerDocument from "./lib/swagger.json";

export const app = express();

app.use(standardLimiter);
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.get("/api/health-check", healthCheck);
app.use("/api/alerts", alerts);

if (profile === "development") {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

app.use(errorHandler);

app.listen(port, async () => {
  console.debug(`[INFO] REST service listening at ${port}`);
  console.debug(`[INFO] Active Profile: ${profile}`);
});

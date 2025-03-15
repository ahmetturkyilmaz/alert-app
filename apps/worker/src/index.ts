import dotenv from "dotenv";
let environment = process.env.NODE_ENV;

if (!environment) {
  dotenv.config();
  environment = process.env.ACTIVE_PROFILE;
}
import { priceMonitoringService } from "./services";

priceMonitoringService.startMonitoring();

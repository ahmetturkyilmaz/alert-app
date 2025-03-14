let environment = process.env.NODE_ENV;

if (!environment) {
    require("dotenv").config();
    environment = process.env.ACTIVE_PROFILE;
}
import express from "express";
import {priceMonitoringService} from "./services";

export const app = express();


priceMonitoringService.startMonitoring();

app.listen(3020, async () => {
    console.debug(`[INFO] worker started with port ${3020}`);
});

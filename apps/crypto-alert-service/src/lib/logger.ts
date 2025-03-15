import winston from "winston";

export const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "silly" : "debug",
  format: winston.format.json(),
  defaultMeta: {},
  transports: [new winston.transports.Console()],
});

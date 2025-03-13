import express, {type NextFunction, type Request, type Response} from "express";
import {body} from "express-validator";
import {authHandler, validate } from "../middlewares";
import {alertService} from "../services";
import {type AlertRequestBody, tradingPairs} from "../types";
import {getResponse} from "../utils/getResponse";

export const alerts = express.Router();

alerts.get("/", authHandler, async (req: Request, res: Response, next: NextFunction) => {
    alertService
        .findAll(req.user)
        .then((alerts) => res.json(getResponse.success(alerts)))
        .catch((e) => next(e));
});

alerts.post(
    "/",
    authHandler,
    validate([
        body("condition", "InvalidValue").isIn(["<", ">"]),
        body("targetPrice", "InvalidValue").isFloat(),
        body("symbol", "InvalidValue").isIn(tradingPairs),
    ]),
    async (
        req: Request<unknown, AlertRequestBody>,
        res: Response,
        next: NextFunction,
    ) => {
        alertService
            .addAlert(req.user, req.body)
            .then()
            .then((blogs) => res.json(getResponse.success(blogs)))
            .catch((e) => next(e));
    },
);

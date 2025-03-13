import express, { type NextFunction, type Request, type Response } from "express";
import { body } from "express-validator";
import auth from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import { alertService } from "../services/factory";
import { tradingPairs } from "../types/tradingPairs";
import { getResponse } from "../utils/getResponse";

export const alerts = express.Router();

alerts.get("/", auth, async (req: Request, res: Response, next: NextFunction) => {
	alertService
		.findAll(req.user)
		.then((alerts) => res.json(getResponse.success(alerts)))
		.catch((e) => next(e));
});

alerts.post(
	"/",
	auth,
	validate([
		body("condition", "InvalidValue").isIn(["<", ">"]),
		body("targetPrice", "InvalidValue").isFloat(),
		body("symbol", "InvalidValue").isIn(tradingPairs),
	]),
	async (
		req: Request<
			never,
			{
				condition: string;
				targetPrice: string;
				symbol: string;
			}
		>,
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

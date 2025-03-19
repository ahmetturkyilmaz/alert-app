import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import { body, param } from "express-validator";
import { authHandler, validate } from "../middlewares";
import { alertService } from "../services";
import { type AlertRequestBody } from "../types";
import { getResponse } from "../utils/getResponse";
import { allowedTriggerConditions } from "../enums/tradingConditions";
import { tradingPairs } from "../enums/tradingPairs";
import { GenericError } from "../errors";

export const alerts = express.Router();

alerts.get(
  "/",
  authHandler,
  async (req: Request, res: Response, next: NextFunction) => {
    alertService
      .findAll(req.user)
      .then((alerts) => res.json(getResponse.success(alerts)))
      .catch((e) => next(e));
  },
);

alerts.post(
  "/",
  authHandler,
  validate([
    body("triggerCondition", "InvalidValue")
      .isNumeric()
      .isIn(allowedTriggerConditions),
    body("targetPrice", "InvalidValue").isFloat(),
    body("pair", "InvalidValue").isIn(tradingPairs),
  ]),
  async (
    req: Request<unknown, AlertRequestBody>,
    res: Response,
    next: NextFunction,
  ) => {
    alertService
      .addAlert(req.user, req.body)
      .then((alerts) => res.json(getResponse.success(alerts)))
      .catch((e) => next(e));
  },
);
alerts.delete(
  "/:id",
  authHandler,
  validate([param("id", "InvalidValue").isString()]),
  async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return next(new GenericError("BadRequest"));
    }
    alertService
      .deleteAlert(req.user, id)
      .then((alerts) => res.json(getResponse.success(alerts)))
      .catch((e) => next(e));
  },
);

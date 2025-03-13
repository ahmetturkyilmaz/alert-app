import type { NextFunction, Request, Response } from "express";
import type { GenericError } from "../errors";
import { getResponse } from "../utils/getResponse";

export const errorHandler = async (error: GenericError, req: Request, res: Response, next: NextFunction) => {
	if (error) {
		res.status(error.statusCode || 500).json(getResponse.error(error.errorCode ?? "UnknownError", error.errorData));
	} else {
		next();
	}
};

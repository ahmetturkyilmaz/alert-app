import { NextFunction, Request, Response } from "express";
import { GenericError } from "../errors";
import { Prisma } from "@prisma/client";
import { logger } from "../lib/logger";
import { getResponse } from "../utils/getResponse";

export const errorHandler = async (
  error: GenericError | Prisma.PrismaClientKnownRequestError,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error) {
    const statusCode = 500;
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      logger.error("Error: DB", {
        data: { code: error.code, meta: error.meta },
      });
      if (error.code === "P2002") {
        res
          .status(statusCode)
          .json(getResponse.error("UniqueConstraintFailed"));
      } else {
        res.status(statusCode).json(getResponse.error("UnknownServiceError"));
      }
    } else {
      res
        .status(error.statusCode || 500)
        .json(
          getResponse.error(error.errorCode ?? "UnknownError", error.errorData),
        );
    }
  } else {
    next();
  }
};

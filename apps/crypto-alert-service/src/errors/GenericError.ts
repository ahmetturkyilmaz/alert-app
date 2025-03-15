import { logger } from "../lib/logger";

export type ErrorCode =
  | "InternalError"
  | "UnknownError"
  | "BadRequest"
  | "FormError";

const ErrorCodeStatusCodeMap: { [k in ErrorCode]: number } = {
  InternalError: 500,
  BadRequest: 400,
  UnknownError: 500,
  FormError: 400,
};

export class GenericError extends Error {
  errorCode: ErrorCode;
  errorData: object | undefined;
  statusCode: number;

  constructor(errorCode: ErrorCode, debugData?: object, errorData?: object) {
    super("");
    this.errorCode = errorCode;
    this.errorData = errorData;
    this.statusCode = ErrorCodeStatusCodeMap[errorCode];
    if (errorCode !== "InternalError") {
      logger.error(`Error: ${errorCode}`, { data: debugData });
    }
  }
}

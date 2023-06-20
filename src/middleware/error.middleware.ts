import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import ErrorException from "@utils/exceptions/error.exception";
import { ErrorRequestHandler } from "express";
import Joi from "joi";

const errorMiddleware: ErrorRequestHandler = (
  err: ErrorException,
  req,
  res,
  next
) => {
  let error = { ...err };

  console.log(err);

  let errorObject: Record<string, unknown> = {};

  if (err instanceof PrismaClientValidationError) {
    error = new ErrorException("Validation failed", 422);
  }

  if (err instanceof PrismaClientKnownRequestError) {
    if (err.code === "P2002" && err.meta?.target === "users_email_key") {
      error = new ErrorException("Email already exists", 400);
    }

    if (err.code === "P2025") {
      const metaCause = err.meta?.cause;
      const isMetaCauseString = (cause: unknown): cause is string =>
        typeof cause === "string" && typeof cause !== "undefined";

      let message: string = err.message;

      if (isMetaCauseString(metaCause)) {
        message = metaCause;
      }

      error = new ErrorException(message, 404);
    }
  }

  if (err instanceof Joi.ValidationError) {
    err.details.forEach((detail) => {
      errorObject[detail.context?.key as string] = detail.message;
    });

    error = new ErrorException("Validation failed", 422, errorObject);
  }

  res.status(error.statusCode || 500).json({
    message: error.message || err.message || "Something went wrong",
    error: error.errorObject,
  });
};

export default errorMiddleware;

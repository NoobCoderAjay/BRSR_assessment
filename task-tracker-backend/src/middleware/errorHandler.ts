import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";
import config from "../config";

export const errorHandler = (
  err: Error | ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
      stack: config.nodeEnv === "development" ? err.stack : undefined,
    });
    return;
  }

  if (err.name === "ValidationError") {
    res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: [err.message],
      stack: config.nodeEnv === "development" ? err.stack : undefined,
    });
    return;
  }

  if (err.name === "CastError") {
    res.status(400).json({
      success: false,
      message: "Invalid ID format",
      stack: config.nodeEnv === "development" ? err.stack : undefined,
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    stack: config.nodeEnv === "development" ? err.stack : undefined,
  });
};

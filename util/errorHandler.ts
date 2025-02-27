import type { Request, Response, NextFunction } from "express";
import AppError from "./errors";

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error instanceof AppError) {
    res.status(error.status || 400).json({
      status: "error",
      message: error.message,
    });
  }
  console.error(error);
  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
};

export default errorHandler
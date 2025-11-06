// src/middleware/error-handler.ts

import type { Request, Response, NextFunction } from "express";
import { AppError } from "#utils/errors.js";
import { DrizzleError, DrizzleQueryError } from "drizzle-orm/errors";
import { APIError } from "better-auth";

const PG_ERROR_CODES = {
  UNIQUE_VIOLATION: "23505",
} as const;

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  // Log error for debugging
  console.error("Error:", {
    name: error.name,
    message: error.message,
    stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
  });

  if (error instanceof APIError) {
    return res.status(error.statusCode).json({
      success: false,
      error: {
        code: error.statusCode,
        message: error.message,
        ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
      },
    });
  }

  // Handle known AppError instances
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      error: {
        code: error.code,
        message: error.message,
        //...(error.details && { details: error.details }),
        ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
      },
    });
  }

  if (error instanceof DrizzleQueryError) {
    // @ts-ignore
    if (error.cause?.code === PG_ERROR_CODES.UNIQUE_VIOLATION) {
      // Unique violation
      return res.status(409).json({
        success: false,
        error: {
          code: "CONFLICT",
          message: "A conflict occurred",
          ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
        },
      });
    }
  }

  // Handle unknown errors
  return res.status(500).json({
    success: false,
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: process.env.NODE_ENV === "development" ? error.message : "An unexpected error occurred",
      ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
    },
  });
};

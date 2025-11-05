// src/middleware/response-handler.ts

import type { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Response {
      success<T = any>(data: T, statusCode?: number): Response;
    }
  }
}

export const responseHandler = (req: Request, res: Response, next: NextFunction) => {
  res.success = function <T = any>(data: T, statusCode: number = 200): Response {
    return this.status(statusCode).json({
      success: true,
      data,
    });
  };

  next();
};

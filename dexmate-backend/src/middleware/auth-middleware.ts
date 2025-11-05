// middleware/auth-middleware.ts
import type { Request, Response, NextFunction } from "express";
import { auth } from "#lib/auth.js";

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const session = await auth.api.getSession({
      headers: req.headers as any,
    });

    if (!session) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    req.user = session.user;
    next();
  } catch (error) {
    next(error);
  }
};

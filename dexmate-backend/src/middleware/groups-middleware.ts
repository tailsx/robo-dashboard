// middleware/auth-middleware.ts
import type { Request, Response, NextFunction } from "express";
import { auth } from "#lib/auth.js";
import { userGroups } from "#db/schemas/auth-schema.js";
import { z } from "zod";

declare global {
  namespace Express {
    interface Request {
      userGroups?: UserGroups[];
    }
  }
}

type UserGroups = z.infer<typeof userGroups>;

export const appendGroups = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orgs = await auth.api.listOrganizations({
      headers: req.headers as any,
    });

    if (!orgs) {
      next();
      return;
    }

    req.userGroups = orgs;
    next();
  } catch (error) {
    next(error);
  }
};

import type { Response, NextFunction } from "express";
import type { AuthenticatedRequest } from "../types/common.types.js";
import { verifyToken } from "../utils/jwt.js";
import { sendError } from "../utils/api-response.js";

export function authenticateJWT(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    sendError(res, 401, "Unauthorized", "UNAUTHORIZED");
    return;
  }

  const token = authHeader.slice(7);
  try {
    const admin = verifyToken(token);
    req.admin = admin;
    next();
  } catch {
    sendError(res, 401, "Invalid or expired token", "UNAUTHORIZED");
  }
}

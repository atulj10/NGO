import type { Request, Response, NextFunction } from "express";
import { loginSchema } from "../validators/auth.validator.js";
import { authService } from "../services/auth.service.js";
import { sendSuccess } from "../utils/api-response.js";

export async function login(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = loginSchema.parse(req.body);
    const result = await authService.login(data);
    sendSuccess(res, result, "Login successful");
  } catch (err) {
    next(err);
  }
}

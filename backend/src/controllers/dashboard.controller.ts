import type { Request, Response, NextFunction } from "express";
import { dashboardService } from "../services/dashboard.service.js";
import { sendSuccess } from "../utils/api-response.js";

export async function getDashboard(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = await dashboardService.getDashboard();
    sendSuccess(res, data);
  } catch (err) {
    next(err);
  }
}

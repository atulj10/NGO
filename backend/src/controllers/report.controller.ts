import type { Request, Response, NextFunction } from "express";
import {
  createReportSchema,
  updateReportSchema,
  reportQuerySchema,
} from "../validators/report.validator.js";
import { reportService } from "../services/report.service.js";
import { sendSuccess, sendPaginated } from "../utils/api-response.js";
import { parsePagination } from "../utils/pagination.js";

export async function createReport(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = createReportSchema.parse(req.body);
    const report = await reportService.create(data);
    sendSuccess(res, report, "Report created successfully", 201);
  } catch (err) {
    next(err);
  }
}

export async function getReport(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const report = await reportService.findById(id);
    sendSuccess(res, report);
  } catch (err) {
    next(err);
  }
}

export async function getReports(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const query = reportQuerySchema.parse(req.query);
    const { page, limit } = parsePagination({
      page: query.page,
      limit: query.limit,
    });

    const result = await reportService.findMany({
      page,
      limit,
      status: query.status,
      fromDate: query.fromDate ? new Date(query.fromDate) : undefined,
      toDate: query.toDate ? new Date(query.toDate) : undefined,
      date: query.date ? new Date(query.date) : undefined,
    });

    sendPaginated(res, result);
  } catch (err) {
    next(err);
  }
}

export async function updateReport(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const data = updateReportSchema.parse(req.body);
    const report = await reportService.update(id, data);
    sendSuccess(res, report, "Report updated successfully");
  } catch (err) {
    next(err);
  }
}

export async function getCompletedReports(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const query = reportQuerySchema.parse(req.query);
    const { page, limit } = parsePagination({
      page: query.page,
      limit: query.limit,
    });

    const result = await reportService.findCompleted({
      page,
      limit,
      fromDate: query.fromDate ? new Date(query.fromDate) : undefined,
      toDate: query.toDate ? new Date(query.toDate) : undefined,
      date: query.date ? new Date(query.date) : undefined,
    });

    sendPaginated(res, result);
  } catch (err) {
    next(err);
  }
}

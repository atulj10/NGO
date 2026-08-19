import type { ApiResponse, PaginatedResult } from "../types/common.types.js";
import type { Response } from "express";

export function sendSuccess<T>(
  res: Response,
  data: T,
  message?: string,
  statusCode = 200
): void {
  const response: ApiResponse<T> = { success: true, data };
  if (message) response.message = message;
  res.status(statusCode).json(response);
}

export function sendPaginated<T>(
  res: Response,
  result: PaginatedResult<T>,
  message?: string
): void {
  const response: ApiResponse<T[]> = {
    success: true,
    data: result.data,
    pagination: result.pagination,
  };
  if (message) response.message = message;
  res.status(200).json(response);
}

export function sendError(
  res: Response,
  statusCode: number,
  message: string,
  code: string,
  details?: unknown
): void {
  const response: ApiResponse = {
    success: false,
    message,
    error: { code, details },
  };
  res.status(statusCode).json(response);
}

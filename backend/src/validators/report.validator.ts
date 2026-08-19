import { z } from "zod";

export const createReportSchema = z.object({
  eventId: z.string().uuid("Invalid event ID"),
  overview: z.string().min(1, "Overview is required").max(5000),
  status: z.enum(["DRAFT", "COMPLETED"]).optional(),
});

export const updateReportSchema = z.object({
  overview: z.string().min(1).max(5000).optional(),
  status: z.enum(["DRAFT", "COMPLETED"]).optional(),
});

export const reportQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  status: z.enum(["DRAFT", "COMPLETED"]).optional(),
  fromDate: z.string().optional(),
  toDate: z.string().optional(),
  date: z.string().optional(),
});

import { z } from "zod";

export const createEventSchema = z.object({
  name: z.string().min(1, "Event name is required").max(255),
  category: z.string().min(1, "Category is required").max(100),
  description: z.string().max(2000).optional(),
  location: z.string().min(1, "Location is required").max(255),
  date: z.string().datetime("Invalid date format").or(z.date()),
});

export const updateEventSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  category: z.string().min(1).max(100).optional(),
  description: z.string().max(2000).nullable().optional(),
  location: z.string().min(1).max(255).optional(),
  date: z.string().datetime("Invalid date format").or(z.date()).optional(),
});

export const eventQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  search: z.string().optional(),
  fromDate: z.string().optional(),
  toDate: z.string().optional(),
  date: z.string().optional(),
  upcoming: z.string().optional(),
});

import type { Request, Response, NextFunction } from "express";
import {
  createEventSchema,
  updateEventSchema,
  eventQuerySchema,
} from "../validators/event.validator.js";
import { eventService } from "../services/event.service.js";
import { sendSuccess, sendPaginated } from "../utils/api-response.js";
import { parsePagination } from "../utils/pagination.js";
import { NotFoundError } from "../middleware/error.middleware.js";

export async function createEvent(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = createEventSchema.parse(req.body);
    const event = await eventService.create({
      ...data,
      date: new Date(data.date),
    });
    sendSuccess(res, event, "Event created successfully", 201);
  } catch (err) {
    next(err);
  }
}

export async function getEvent(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const event = await eventService.findById(id);
    sendSuccess(res, event);
  } catch (err) {
    next(err);
  }
}

export async function getEvents(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const query = eventQuerySchema.parse(req.query);
    const { page, limit } = parsePagination({
      page: query.page,
      limit: query.limit,
    });

    const result = await eventService.findMany({
      page,
      limit,
      search: query.search,
      fromDate: query.fromDate ? new Date(query.fromDate) : undefined,
      toDate: query.toDate ? new Date(query.toDate) : undefined,
      date: query.date ? new Date(query.date) : undefined,
      upcoming: query.upcoming === "true",
    });

    sendPaginated(res, result);
  } catch (err) {
    next(err);
  }
}

export async function updateEvent(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    const data = updateEventSchema.parse(req.body);
    const updateData: Record<string, unknown> = { ...data };
    if (data.date) {
      updateData.date = new Date(data.date as string);
    }
    const event = await eventService.update(
      id,
      updateData as Parameters<typeof eventService.update>[1]
    );
    sendSuccess(res, event, "Event updated successfully");
  } catch (err) {
    next(err);
  }
}

export async function deleteEvent(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    await eventService.delete(id);
    sendSuccess(res, null, "Event deleted successfully");
  } catch (err) {
    next(err);
  }
}

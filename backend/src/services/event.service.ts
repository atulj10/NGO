import type { CreateEventData, UpdateEventData, EventQueryOptions, EventResponse } from "../types/event.types.js";
import type { PaginatedResult } from "../types/common.types.js";
import { eventRepository } from "../repositories/index.js";
import { NotFoundError } from "../middleware/error.middleware.js";

export class EventService {
  async create(data: CreateEventData): Promise<EventResponse> {
    return eventRepository.create(data);
  }

  async findById(id: string): Promise<EventResponse> {
    const event = await eventRepository.findById(id);
    if (!event) throw new NotFoundError("Event not found");
    return event;
  }

  async findMany(options: EventQueryOptions): Promise<PaginatedResult<EventResponse>> {
    return eventRepository.findMany(options);
  }

  async update(id: string, data: UpdateEventData): Promise<EventResponse> {
    await this.findById(id);
    return eventRepository.update(id, data);
  }

  async countUpcoming(): Promise<number> {
    return eventRepository.countUpcoming();
  }

  async countPending(): Promise<number> {
    return eventRepository.countPending();
  }

  async countThisMonth(): Promise<number> {
    return eventRepository.countThisMonth();
  }

  async countByMonth(): Promise<{ month: string; count: number }[]> {
    return eventRepository.countByMonth();
  }

  async findUpcoming(limit: number): Promise<EventResponse[]> {
    return eventRepository.findUpcoming(limit);
  }
}

export const eventService = new EventService();

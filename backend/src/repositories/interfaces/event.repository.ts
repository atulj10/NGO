import type {
  CreateEventData,
  UpdateEventData,
  EventQueryOptions,
  EventResponse,
} from "../../types/event.types.js";
import type { PaginatedResult } from "../../types/common.types.js";

export interface EventRepository {
  create(data: CreateEventData): Promise<EventResponse>;
  findById(id: string): Promise<EventResponse | null>;
  findMany(options: EventQueryOptions): Promise<PaginatedResult<EventResponse>>;
  update(id: string, data: UpdateEventData): Promise<EventResponse>;
  countUpcoming(): Promise<number>;
  countPending(): Promise<number>;
  countThisMonth(): Promise<number>;
  countByMonth(): Promise<{ month: string; count: number }[]>;
  findUpcoming(limit: number): Promise<EventResponse[]>;
  delete(id: string): Promise<void>;
}

import type { EventRepository } from "../interfaces/event.repository.js";
import { prisma } from "../../config/database.js";
import type {
  CreateEventData,
  UpdateEventData,
  EventQueryOptions,
  EventResponse,
} from "../../types/event.types.js";
import type { PaginatedResult } from "../../types/common.types.js";
import { createPaginatedResult } from "../../utils/pagination.js";
import {
  startOfDay,
  endOfDay,
  startOfMonth,
  startOfNextMonth,
  now,
} from "../../utils/date.js";

function toEventResponse(event: {
  id: string;
  name: string;
  category: string;
  description: string | null;
  location: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  report?: { id: string; status: string } | null;
}): EventResponse {
  return {
    id: event.id,
    name: event.name,
    category: event.category,
    description: event.description,
    location: event.location,
    date: event.date,
    createdAt: event.createdAt,
    updatedAt: event.updatedAt,
    ...(event.report !== undefined && {
      report: event.report
        ? { id: event.report.id, status: event.report.status as "DRAFT" | "COMPLETED" }
        : null,
    }),
  };
}

export class PrismaEventRepository implements EventRepository {
  async create(data: CreateEventData): Promise<EventResponse> {
    const event = await prisma.event.create({ data });
    return toEventResponse(event);
  }

  async findById(id: string): Promise<EventResponse | null> {
    const event = await prisma.event.findUnique({
      where: { id },
      include: { report: { select: { id: true, status: true } } },
    });
    if (!event) return null;
    return toEventResponse(event);
  }

  async findMany(options: EventQueryOptions): Promise<PaginatedResult<EventResponse>> {
    const { page, limit, search, fromDate, toDate, date, upcoming } = options;
    const skip = (page - 1) * limit;
    const nowDate = now();

    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { category: { contains: search } },
        { location: { contains: search } },
      ];
    }

    if (fromDate || toDate) {
      const dateFilter: Record<string, Date> = {};
      if (fromDate) dateFilter.gte = startOfDay(fromDate);
      if (toDate) dateFilter.lte = endOfDay(toDate);
      where.date = dateFilter;
    }

    if (date) {
      where.date = {
        gte: startOfDay(date),
        lte: endOfDay(date),
      };
    }

    if (upcoming) {
      const dateFilter = (where.date as Record<string, Date>) ?? {};
      dateFilter.gt = nowDate;
      where.date = dateFilter;
    }

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        include: { report: { select: { id: true, status: true } } },
        orderBy: { date: "asc" },
        skip,
        take: limit,
      }),
      prisma.event.count({ where }),
    ]);

    return createPaginatedResult(
      events.map((e) => toEventResponse(e)),
      total,
      page,
      limit
    );
  }

  async update(id: string, data: UpdateEventData): Promise<EventResponse> {
    const event = await prisma.event.update({
      where: { id },
      data,
      include: { report: { select: { id: true, status: true } } },
    });
    return toEventResponse(event);
  }

  async countUpcoming(): Promise<number> {
    return prisma.event.count({
      where: { date: { gt: now() } },
    });
  }

  async countPending(): Promise<number> {
    const todayStart = startOfDay(now());
    return prisma.event.count({
      where: {
        date: { lt: todayStart },
        OR: [
          { report: null },
          { report: { status: "DRAFT" } },
        ],
      },
    });
  }

  async countThisMonth(): Promise<number> {
    const monthStart = startOfMonth(now());
    const nextMonthStart = startOfNextMonth(now());
    return prisma.event.count({
      where: {
        date: {
          gte: monthStart,
          lt: nextMonthStart,
        },
      },
    });
  }

  async countByMonth(): Promise<{ month: string; count: number }[]> {
    const currentMonth = now().getMonth();
    const results: { month: string; count: number }[] = [];

    for (let i = 0; i <= currentMonth; i++) {
      const monthDate = new Date(now().getFullYear(), i, 1);
      const nextMonth = new Date(now().getFullYear(), i + 1, 1);
      const count = await prisma.event.count({
        where: {
          date: {
            gte: monthDate,
            lt: nextMonth,
          },
        },
      });
      const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ];
      results.push({ month: monthNames[i] ?? "", count });
    }

    return results;
  }

  async findUpcoming(limit: number): Promise<EventResponse[]> {
    const events = await prisma.event.findMany({
      where: { date: { gt: now() } },
      orderBy: { date: "asc" },
      take: limit,
    });
    return events.map((e) => toEventResponse(e));
  }

  async delete(id: string): Promise<void> {
    await prisma.event.delete({ where: { id } });
  }
}

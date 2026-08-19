import type { ReportRepository } from "../interfaces/report.repository.js";
import { prisma } from "../../config/database.js";
import type {
  CreateReportInput,
  UpdateReportInput,
  ReportQueryOptions,
  ReportResponse,
} from "../../types/report.types.js";
import type { PaginatedResult } from "../../types/common.types.js";
import { createPaginatedResult } from "../../utils/pagination.js";
import { startOfDay, endOfDay } from "../../utils/date.js";

function toReportResponse(report: {
  id: string;
  eventId: string;
  overview: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  event?: {
    id: string;
    name: string;
    category: string;
    location: string;
    date: Date;
  } | null;
  attachments?: {
    id: string;
    reportId: string;
    url: string;
    type: string;
    createdAt: Date;
    updatedAt: Date;
  }[];
}): ReportResponse {
  return {
    id: report.id,
    eventId: report.eventId,
    overview: report.overview,
    status: report.status as "DRAFT" | "COMPLETED",
    createdAt: report.createdAt,
    updatedAt: report.updatedAt,
    ...(report.event !== undefined && {
      event: report.event
        ? {
            id: report.event.id,
            name: report.event.name,
            category: report.event.category,
            location: report.event.location,
            date: report.event.date,
          }
        : undefined,
    }),
    ...(report.attachments && {
      attachments: report.attachments.map((a) => ({
        id: a.id,
        reportId: a.reportId,
        url: a.url,
        type: a.type as "MEDIA" | "SOCIAL_LINK",
        createdAt: a.createdAt,
        updatedAt: a.updatedAt,
      })),
    }),
  };
}

export class PrismaReportRepository implements ReportRepository {
  async create(data: CreateReportInput): Promise<ReportResponse> {
    const report = await prisma.report.create({
      data: {
        eventId: data.eventId,
        overview: data.overview,
        status: data.status ?? "DRAFT",
      },
    });
    return toReportResponse(report);
  }

  async findById(id: string): Promise<ReportResponse | null> {
    const report = await prisma.report.findUnique({
      where: { id },
      include: {
        event: true,
        attachments: true,
      },
    });
    if (!report) return null;
    return toReportResponse(report);
  }

  async findMany(options: ReportQueryOptions): Promise<PaginatedResult<ReportResponse>> {
    const { page, limit, status, fromDate, toDate, date } = options;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

    if (status) {
      where.status = status;
    }

    if (fromDate || toDate || date) {
      const eventDateFilter: Record<string, Date> = {};
      if (fromDate) eventDateFilter.gte = startOfDay(fromDate);
      if (toDate) eventDateFilter.lte = endOfDay(toDate);
      if (date) {
        eventDateFilter.gte = startOfDay(date);
        eventDateFilter.lte = endOfDay(date);
      }
      where.event = { date: eventDateFilter };
    }

    const [reports, total] = await Promise.all([
      prisma.report.findMany({
        where,
        include: {
          event: { select: { id: true, name: true, category: true, location: true, date: true } },
          attachments: true,
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.report.count({ where }),
    ]);

    return createPaginatedResult(
      reports.map((r) => toReportResponse(r)),
      total,
      page,
      limit
    );
  }

  async findCompleted(options: ReportQueryOptions): Promise<PaginatedResult<ReportResponse>> {
    const { page, limit, fromDate, toDate, date } = options;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {
      status: "COMPLETED",
    };

    if (fromDate || toDate || date) {
      const eventDateFilter: Record<string, Date> = {};
      if (fromDate) eventDateFilter.gte = startOfDay(fromDate);
      if (toDate) eventDateFilter.lte = endOfDay(toDate);
      if (date) {
        eventDateFilter.gte = startOfDay(date);
        eventDateFilter.lte = endOfDay(date);
      }
      where.event = { date: eventDateFilter };
    }

    const [reports, total] = await Promise.all([
      prisma.report.findMany({
        where,
        include: {
          event: { select: { id: true, name: true, category: true, location: true, date: true } },
          attachments: true,
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.report.count({ where }),
    ]);

    return createPaginatedResult(
      reports.map((r) => toReportResponse(r)),
      total,
      page,
      limit
    );
  }

  async update(id: string, data: UpdateReportInput): Promise<ReportResponse> {
    const report = await prisma.report.update({
      where: { id },
      data,
      include: {
        event: true,
        attachments: true,
      },
    });
    return toReportResponse(report);
  }

  async findByEventId(eventId: string): Promise<ReportResponse | null> {
    const report = await prisma.report.findUnique({
      where: { eventId },
    });
    if (!report) return null;
    return toReportResponse(report);
  }

  async findRecent(limit: number): Promise<ReportResponse[]> {
    const reports = await prisma.report.findMany({
      include: {
        event: { select: { id: true, name: true, category: true, location: true, date: true } },
      },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
    return reports.map((r) => toReportResponse(r));
  }
}

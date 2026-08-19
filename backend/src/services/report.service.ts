import type {
  CreateReportInput,
  UpdateReportInput,
  ReportQueryOptions,
  ReportResponse,
} from "../types/report.types.js";
import type { PaginatedResult } from "../types/common.types.js";
import { reportRepository, eventRepository, attachmentRepository, fileStorage } from "../repositories/index.js";
import { NotFoundError, ConflictError } from "../middleware/error.middleware.js";

export class ReportService {
  async create(data: CreateReportInput): Promise<ReportResponse> {
    const event = await eventRepository.findById(data.eventId);
    if (!event) {
      throw new NotFoundError("Event not found");
    }

    const existing = await reportRepository.findByEventId(data.eventId);
    if (existing) {
      throw new ConflictError("This event already has a report");
    }

    return reportRepository.create(data);
  }

  async findById(id: string): Promise<ReportResponse> {
    const report = await reportRepository.findById(id);
    if (!report) throw new NotFoundError("Report not found");
    return report;
  }

  async findMany(options: ReportQueryOptions): Promise<PaginatedResult<ReportResponse>> {
    return reportRepository.findMany(options);
  }

  async findCompleted(options: ReportQueryOptions): Promise<PaginatedResult<ReportResponse>> {
    return reportRepository.findCompleted(options);
  }

  async update(id: string, data: UpdateReportInput): Promise<ReportResponse> {
    await this.findById(id);
    return reportRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);

    const attachments = await attachmentRepository.findByReportId(id);
    for (const attachment of attachments) {
      if (attachment.type === "MEDIA") {
        await fileStorage.delete(attachment.url);
      }
    }

    await reportRepository.delete(id);
  }

  async findRecent(limit: number): Promise<ReportResponse[]> {
    return reportRepository.findRecent(limit);
  }
}

export const reportService = new ReportService();

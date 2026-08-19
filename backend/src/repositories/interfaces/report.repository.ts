import type { ReportStatus } from "@prisma/client";
import type {
  CreateReportInput,
  UpdateReportInput,
  ReportQueryOptions,
  ReportResponse,
} from "../../types/report.types.js";
import type { PaginatedResult } from "../../types/common.types.js";

export interface ReportRepository {
  create(data: CreateReportInput): Promise<ReportResponse>;
  findById(id: string): Promise<ReportResponse | null>;
  findMany(options: ReportQueryOptions): Promise<PaginatedResult<ReportResponse>>;
  findCompleted(options: ReportQueryOptions): Promise<PaginatedResult<ReportResponse>>;
  update(id: string, data: UpdateReportInput): Promise<ReportResponse>;
  findByEventId(eventId: string): Promise<ReportResponse | null>;
  findRecent(limit: number): Promise<ReportResponse[]>;
  delete(id: string): Promise<void>;
}

import type { AttachmentType } from "@prisma/client";
import type { AttachmentResponse } from "../../types/report.types.js";

export interface AttachmentRepository {
  create(reportId: string, url: string, type: AttachmentType): Promise<AttachmentResponse>;
  findById(id: string): Promise<AttachmentResponse | null>;
  findByReportId(reportId: string): Promise<AttachmentResponse[]>;
  delete(id: string): Promise<void>;
}

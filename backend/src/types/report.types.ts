import type { ReportStatus, AttachmentType } from "@prisma/client";

export interface CreateReportInput {
  eventId: string;
  overview: string;
  status?: ReportStatus;
}

export interface UpdateReportInput {
  overview?: string;
  status?: ReportStatus;
}

export interface ReportQueryOptions {
  page: number;
  limit: number;
  status?: ReportStatus;
  fromDate?: Date;
  toDate?: Date;
  date?: Date;
}

export interface ReportResponse {
  id: string;
  eventId: string;
  overview: string;
  status: ReportStatus;
  createdAt: Date;
  updatedAt: Date;
  event?: {
    id: string;
    name: string;
    category: string;
    location: string;
    date: Date;
  };
  attachments?: AttachmentResponse[];
}

export interface AttachmentResponse {
  id: string;
  reportId: string;
  url: string;
  type: AttachmentType;
  createdAt: Date;
  updatedAt: Date;
}

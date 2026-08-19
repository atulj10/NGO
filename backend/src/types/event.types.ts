import type { ReportStatus, AttachmentType } from "@prisma/client";

export interface CreateEventData {
  name: string;
  category: string;
  description?: string;
  location: string;
  date: Date;
}

export interface UpdateEventData {
  name?: string;
  category?: string;
  description?: string;
  location?: string;
  date?: Date;
}

export interface EventQueryOptions {
  page: number;
  limit: number;
  search?: string;
  fromDate?: Date;
  toDate?: Date;
  date?: Date;
  upcoming?: boolean;
}

export interface EventResponse {
  id: string;
  name: string;
  category: string;
  description: string | null;
  location: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  report?: {
    id: string;
    status: ReportStatus;
  } | null;
}

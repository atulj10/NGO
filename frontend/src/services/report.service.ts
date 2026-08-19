import api from "./api";
import type { ApiReport, ApiAttachment, PaginatedResponse, ApiResponse } from "./types";

export interface ReportQueryParams {
  page?: number;
  limit?: number;
  status?: string;
  fromDate?: string;
  toDate?: string;
}

export async function getReports(
  params?: ReportQueryParams
): Promise<PaginatedResponse<ApiReport>> {
  const { data } = await api.get<PaginatedResponse<ApiReport>>("/reports", {
    params,
  });
  return data;
}

export async function getReport(id: string): Promise<ApiResponse<ApiReport>> {
  const { data } = await api.get<ApiResponse<ApiReport>>(`/reports/${id}`);
  return data;
}

export async function createReport(payload: {
  eventId: string;
  overview: string;
  status?: "DRAFT" | "COMPLETED";
}): Promise<ApiResponse<ApiReport>> {
  const { data } = await api.post<ApiResponse<ApiReport>>("/reports", payload);
  return data;
}

export async function uploadAttachment(
  reportId: string,
  file: File
): Promise<ApiResponse<ApiAttachment>> {
  const formData = new FormData();
  formData.append("file", file);
  const { data } = await api.post<ApiResponse<ApiAttachment>>(
    `/reports/${reportId}/attachments`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return data;
}

export async function getAttachments(
  reportId: string
): Promise<ApiResponse<ApiAttachment[]>> {
  const { data } = await api.get<ApiResponse<ApiAttachment[]>>(
    `/reports/${reportId}/attachments`
  );
  return data;
}

export async function updateReport(
  id: string,
  payload: {
    overview?: string;
    status?: "DRAFT" | "COMPLETED";
  }
): Promise<ApiResponse<ApiReport>> {
  const { data } = await api.patch<ApiResponse<ApiReport>>(`/reports/${id}`, payload);
  return data;
}

export async function deleteReport(id: string): Promise<ApiResponse<null>> {
  const { data } = await api.delete<ApiResponse<null>>(`/reports/${id}`);
  return data;
}

export async function deleteAttachment(id: string): Promise<ApiResponse<null>> {
  const { data } = await api.delete<ApiResponse<null>>(`/attachments/${id}`);
  return data;
}

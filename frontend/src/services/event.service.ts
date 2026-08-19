import api from "./api";
import type { ApiEvent, PaginatedResponse, ApiResponse } from "./types";

export interface EventQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  fromDate?: string;
  toDate?: string;
  upcoming?: string;
}

export async function getEvents(
  params?: EventQueryParams
): Promise<PaginatedResponse<ApiEvent>> {
  const { data } = await api.get<PaginatedResponse<ApiEvent>>("/events", {
    params,
  });
  return data;
}

export async function getEvent(id: string): Promise<ApiResponse<ApiEvent>> {
  const { data } = await api.get<ApiResponse<ApiEvent>>(`/events/${id}`);
  return data;
}

export async function createEvent(eventData: {
  name: string;
  category: string;
  description?: string;
  location: string;
  date: string;
}): Promise<ApiResponse<ApiEvent>> {
  const { data } = await api.post<ApiResponse<ApiEvent>>("/events", eventData);
  return data;
}

export async function updateEvent(
  id: string,
  eventData: {
    name?: string;
    category?: string;
    description?: string;
    location?: string;
    date?: string;
  }
): Promise<ApiResponse<ApiEvent>> {
  const { data } = await api.patch<ApiResponse<ApiEvent>>(`/events/${id}`, eventData);
  return data;
}

export async function deleteEvent(id: string): Promise<ApiResponse<null>> {
  const { data } = await api.delete<ApiResponse<null>>(`/events/${id}`);
  return data;
}

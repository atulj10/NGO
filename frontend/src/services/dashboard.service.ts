import api from "./api";
import type { DashboardData, ApiResponse } from "./types";

export async function getDashboard(): Promise<ApiResponse<DashboardData>> {
  const { data } = await api.get<ApiResponse<DashboardData>>("/dashboard");
  return data;
}

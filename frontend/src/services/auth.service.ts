import api from "./api";
import type { LoginResponse, ApiResponse } from "./types";

export async function login(
  email: string,
  password: string
): Promise<LoginResponse> {
  const { data } = await api.post<ApiResponse<LoginResponse>>("/auth/login", {
    email,
    password,
  });
  return data.data;
}

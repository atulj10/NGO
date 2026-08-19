import type { ReportStatus, AttachmentType } from "@prisma/client";

export interface AdminPayload {
  id: string;
  name: string;
  email: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginResponse {
  admin: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

import type { AdminPayload } from "../../types/auth.types.js";

export interface AdminRepository {
  findByEmail(email: string): Promise<AdminPayload & { password: string } | null>;
  findById(id: string): Promise<AdminPayload | null>;
}

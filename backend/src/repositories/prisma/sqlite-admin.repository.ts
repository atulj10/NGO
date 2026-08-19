import type { AdminRepository } from "../interfaces/admin.repository.js";
import { prisma } from "../../config/database.js";
import type { AdminPayload } from "../../types/auth.types.js";

interface AdminWithPassword extends AdminPayload {
  password: string;
}

export class PrismaAdminRepository implements AdminRepository {
  async findByEmail(email: string): Promise<AdminWithPassword | null> {
    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) return null;
    return {
      id: admin.id,
      name: admin.name,
      email: admin.email,
      password: admin.password,
    };
  }

  async findById(id: string): Promise<AdminPayload | null> {
    const admin = await prisma.admin.findUnique({ where: { id } });
    if (!admin) return null;
    return {
      id: admin.id,
      name: admin.name,
      email: admin.email,
    };
  }
}

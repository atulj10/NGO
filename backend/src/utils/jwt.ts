import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import type { AuthenticatedAdmin } from "../types/common.types.js";

export function generateToken(admin: AuthenticatedAdmin): string {
  return jwt.sign(
    { id: admin.id, name: admin.name, email: admin.email },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN }
  );
}

export function verifyToken(token: string): AuthenticatedAdmin {
  return jwt.verify(token, env.JWT_SECRET) as AuthenticatedAdmin;
}

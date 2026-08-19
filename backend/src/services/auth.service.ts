import type { LoginInput, LoginResponse } from "../types/auth.types.js";
import type { AuthenticatedAdmin } from "../types/common.types.js";
import { adminRepository } from "../repositories/index.js";
import { comparePassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";
import { UnauthorizedError } from "../middleware/error.middleware.js";

export class AuthService {
  async login(data: LoginInput): Promise<LoginResponse> {
    const admin = await adminRepository.findByEmail(data.email);
    if (!admin) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const valid = await comparePassword(data.password, admin.password);
    if (!valid) {
      throw new UnauthorizedError("Invalid email or password");
    }

    const payload: AuthenticatedAdmin = {
      id: admin.id,
      name: admin.name,
      email: admin.email,
    };

    const token = generateToken(payload);

    return {
      admin: payload,
      token,
    };
  }
}

export const authService = new AuthService();

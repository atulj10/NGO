import type { FileStorage } from "../interfaces/file-storage.js";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

export class LocalFileStorage implements FileStorage {
  private uploadDir: string;

  constructor(uploadDir = path.resolve("uploads/reports")) {
    this.uploadDir = uploadDir;
  }

  async save(buffer: Buffer, originalName: string, _mimetype: string): Promise<string> {
    await fs.mkdir(this.uploadDir, { recursive: true });
    const ext = path.extname(originalName);
    const filename = `${uuidv4()}${ext}`;
    const filePath = path.join(this.uploadDir, filename);
    await fs.writeFile(filePath, buffer);
    return `/uploads/reports/${filename}`;
  }

  async delete(filePath: string): Promise<void> {
    const fullPath = path.resolve(filePath.replace(/^\//, ""));
    try {
      await fs.unlink(fullPath);
    } catch {
      // File may not exist — handle gracefully
    }
  }
}

import type { AdminRepository } from "./interfaces/admin.repository.js";
import type { EventRepository } from "./interfaces/event.repository.js";
import type { ReportRepository } from "./interfaces/report.repository.js";
import type { AttachmentRepository } from "./interfaces/attachment.repository.js";
import type { FileStorage } from "./interfaces/file-storage.js";
import { PrismaAdminRepository } from "./prisma/sqlite-admin.repository.js";
import { PrismaEventRepository } from "./prisma/sqlite-event.repository.js";
import { PrismaReportRepository } from "./prisma/sqlite-report.repository.js";
import { PrismaAttachmentRepository } from "./prisma/sqlite-attachment.repository.js";
import { LocalFileStorage } from "./prisma/local-file-storage.js";

export const adminRepository: AdminRepository = new PrismaAdminRepository();
export const eventRepository: EventRepository = new PrismaEventRepository();
export const reportRepository: ReportRepository = new PrismaReportRepository();
export const attachmentRepository: AttachmentRepository = new PrismaAttachmentRepository();
export const fileStorage: FileStorage = new LocalFileStorage();

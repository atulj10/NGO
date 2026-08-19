import type { AttachmentType } from "@prisma/client";
import type { AttachmentResponse } from "../types/report.types.js";
import { attachmentRepository, reportRepository, fileStorage } from "../repositories/index.js";
import { NotFoundError } from "../middleware/error.middleware.js";

export class AttachmentService {
  async create(
    reportId: string,
    file: Express.Multer.File
  ): Promise<AttachmentResponse> {
    const report = await reportRepository.findById(reportId);
    if (!report) {
      throw new NotFoundError("Report not found");
    }

    const url = await fileStorage.save(
      file.buffer,
      file.originalname,
      file.mimetype
    );

    return attachmentRepository.create(reportId, url, "MEDIA" as AttachmentType);
  }

  async createSocialLink(
    reportId: string,
    url: string
  ): Promise<AttachmentResponse> {
    const report = await reportRepository.findById(reportId);
    if (!report) {
      throw new NotFoundError("Report not found");
    }

    return attachmentRepository.create(reportId, url, "SOCIAL_LINK" as AttachmentType);
  }

  async findByReportId(reportId: string): Promise<AttachmentResponse[]> {
    return attachmentRepository.findByReportId(reportId);
  }

  async delete(id: string): Promise<void> {
    const attachment = await attachmentRepository.findById(id);
    if (!attachment) {
      throw new NotFoundError("Attachment not found");
    }

    if (attachment.type === "MEDIA") {
      await fileStorage.delete(attachment.url);
    }

    await attachmentRepository.delete(id);
  }
}

export const attachmentService = new AttachmentService();

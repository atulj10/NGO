import type { AttachmentRepository } from "../interfaces/attachment.repository.js";
import { prisma } from "../../config/database.js";
import type { AttachmentResponse } from "../../types/report.types.js";
import type { AttachmentType } from "@prisma/client";

function toAttachmentResponse(attachment: {
  id: string;
  reportId: string;
  url: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}): AttachmentResponse {
  return {
    id: attachment.id,
    reportId: attachment.reportId,
    url: attachment.url,
    type: attachment.type as AttachmentType,
    createdAt: attachment.createdAt,
    updatedAt: attachment.updatedAt,
  };
}

export class PrismaAttachmentRepository implements AttachmentRepository {
  async create(reportId: string, url: string, type: AttachmentType): Promise<AttachmentResponse> {
    const attachment = await prisma.attachment.create({
      data: { reportId, url, type },
    });
    return toAttachmentResponse(attachment);
  }

  async findById(id: string): Promise<AttachmentResponse | null> {
    const attachment = await prisma.attachment.findUnique({ where: { id } });
    if (!attachment) return null;
    return toAttachmentResponse(attachment);
  }

  async findByReportId(reportId: string): Promise<AttachmentResponse[]> {
    const attachments = await prisma.attachment.findMany({
      where: { reportId },
      orderBy: { createdAt: "asc" },
    });
    return attachments.map((a) => toAttachmentResponse(a));
  }

  async delete(id: string): Promise<void> {
    await prisma.attachment.delete({ where: { id } });
  }
}

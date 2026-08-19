import type { Request, Response, NextFunction } from "express";
import { attachmentService } from "../services/attachment.service.js";
import { sendSuccess } from "../utils/api-response.js";

export async function uploadAttachment(
  req: Request<{ reportId: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { reportId } = req.params;
    const file = req.file;
    if (!file) {
      res.status(400).json({
        success: false,
        message: "No file provided",
        error: { code: "NO_FILE" },
      });
      return;
    }

    const attachment = await attachmentService.create(reportId, file);
    sendSuccess(res, attachment, "Attachment uploaded successfully", 201);
  } catch (err) {
    next(err);
  }
}

export async function getAttachments(
  req: Request<{ reportId: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { reportId } = req.params;
    const attachments = await attachmentService.findByReportId(reportId);
    sendSuccess(res, attachments);
  } catch (err) {
    next(err);
  }
}

export async function deleteAttachment(
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params;
    await attachmentService.delete(id);
    sendSuccess(res, null, "Attachment deleted successfully");
  } catch (err) {
    next(err);
  }
}

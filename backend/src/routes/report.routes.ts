import { Router } from "express";
import {
  createReport,
  getReport,
  getReports,
  updateReport,
  deleteReport,
} from "../controllers/report.controller.js";
import { uploadAttachment, getAttachments } from "../controllers/attachment.controller.js";
import { uploadSingle } from "../middleware/upload.middleware.js";

const router = Router();

router.get("/", getReports);
router.post("/", createReport);
router.get("/:id", getReport);
router.patch("/:id", updateReport);
router.delete("/:id", deleteReport);

// Attachments nested under reports
router.post("/:reportId/attachments", uploadSingle, uploadAttachment);
router.get("/:reportId/attachments", getAttachments);

export default router;

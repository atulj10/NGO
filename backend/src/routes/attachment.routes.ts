import { Router } from "express";
import { deleteAttachment } from "../controllers/attachment.controller.js";

const router = Router();

router.delete("/:id", deleteAttachment);

export default router;

import { Router } from "express";
import { getCompletedReports } from "../controllers/report.controller.js";

const router = Router();

router.get("/completed", getCompletedReports);

export default router;

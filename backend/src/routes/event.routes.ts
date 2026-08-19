import { Router } from "express";
import {
  createEvent,
  getEvent,
  getEvents,
  updateEvent,
} from "../controllers/event.controller.js";

const router = Router();

router.post("/", createEvent);
router.get("/", getEvents);
router.get("/:id", getEvent);
router.patch("/:id", updateEvent);

export default router;

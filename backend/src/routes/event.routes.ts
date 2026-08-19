import { Router } from "express";
import {
  createEvent,
  getEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller.js";

const router = Router();

router.post("/", createEvent);
router.get("/", getEvents);
router.get("/:id", getEvent);
router.patch("/:id", updateEvent);
router.delete("/:id", deleteEvent);

export default router;

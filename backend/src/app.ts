import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { env } from "./config/env.js";
import { authenticateJWT } from "./middleware/auth.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import eventRoutes from "./routes/event.routes.js";
import reportRoutes from "./routes/report.routes.js";
import reportPublicRoutes from "./routes/report-public.routes.js";
import attachmentRoutes from "./routes/attachment.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";

const app = express();

app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(express.json());

// Static file serving for uploads
app.use("/uploads", express.static(path.resolve("uploads")));

// Public routes
app.use("/api/auth", authRoutes);

// Public reports endpoint (no JWT)
app.use("/api/reports", reportPublicRoutes);

// Protected routes
app.use("/api/events", authenticateJWT, eventRoutes);
app.use("/api/reports", authenticateJWT, reportRoutes);
app.use("/api/attachments", authenticateJWT, attachmentRoutes);
app.use("/api/dashboard", authenticateJWT, dashboardRoutes);

// Error handler
app.use(errorHandler);

export default app;

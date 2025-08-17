import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import qrRoutes from "./routes/qr";
import eventRoutes from "./routes/events";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
const PORT = parseInt(process.env.PORT || "3000", 10);

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: "Too many requests from this IP, please try again later.",
    retryAfter: "15 minutes",
  },
});
app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "🎫 CodeGate Events & Ticketing API",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    endpoints: {
      "POST /api/qr/generate": "Generate QR code from text",
      "POST /api/qr/batch": "Generate multiple QR codes",
      "GET /api/qr/formats": "Get supported formats",
      "GET /api/events": "Get all events",
      "POST /api/events": "Create new event",
      "POST /api/events/:id/tickets": "Purchase event tickets",
      "POST /api/events/checkin": "Check-in with QR code",
      "GET /health": "Health check",
    },
  });
});

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use("/api/qr", qrRoutes);
app.use("/api/events", eventRoutes);

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
    method: req.method,
  });
});

// CRITICAL: Bind to all interfaces for Render deployment
app.listen(PORT, () => {
  console.log(`🚀 CodeGate Events API running on port localhost:${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🌍 Server accessible on all interfaces`);
  console.log(`🔗 Health check: /health`);
});

export default app;

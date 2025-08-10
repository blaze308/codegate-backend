import { Router, Request, Response } from "express";
import QRCode from "qrcode";
import sharp from "sharp";
import {
  validateQRRequest,
  validateBatchRequest,
} from "../middleware/validation";
import { QRRequest, BatchQRRequest } from "../types/qr";

const router = Router();

// Generate single QR code
router.post(
  "/generate",
  validateQRRequest,
  async (req: Request, res: Response) => {
    try {
      const { text, options = {} }: QRRequest = req.body;

      let qrCode: string;

      if (options.format === "svg") {
        qrCode = await QRCode.toString(text, { type: "svg" });
      } else {
        // Default to PNG data URL
        qrCode = await QRCode.toDataURL(text, {
          width: options.width || 256,
          margin: options.margin || 1,
          color: {
            dark: options.darkColor || "#000000",
            light: options.lightColor || "#FFFFFF",
          },
          errorCorrectionLevel: options.errorCorrectionLevel || "M",
        });
      }

      res.json({
        success: true,
        data: {
          qrCode,
          text,
          format: options.format || "png",
          options: {
            width: options.width || 256,
            margin: options.margin || 1,
            darkColor: options.darkColor || "#000000",
            lightColor: options.lightColor || "#FFFFFF",
            errorCorrectionLevel: options.errorCorrectionLevel || "M",
          },
          generatedAt: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error("QR Code generation error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to generate QR code",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
);

// Generate multiple QR codes
router.post(
  "/batch",
  validateBatchRequest,
  async (req: Request, res: Response) => {
    try {
      const { items, options = {} }: BatchQRRequest = req.body;

      const results = await Promise.all(
        items.map(async (item, index) => {
          try {
            const qrCode = await QRCode.toDataURL(item.text, {
              width: options.width || 256,
              margin: options.margin || 1,
              color: {
                dark: options.darkColor || "#000000",
                light: options.lightColor || "#FFFFFF",
              },
              errorCorrectionLevel: options.errorCorrectionLevel || "M",
            });
            return {
              id: item.id || `qr_${index}`,
              text: item.text,
              qrCode,
              success: true,
            };
          } catch (error) {
            return {
              id: item.id || `qr_${index}`,
              text: item.text,
              qrCode: null,
              success: false,
              error: error instanceof Error ? error.message : "Unknown error",
            };
          }
        })
      );

      const successful = results.filter((r) => r.success).length;
      const failed = results.filter((r) => !r.success).length;

      res.json({
        success: true,
        data: {
          results,
          summary: {
            total: items.length,
            successful,
            failed,
          },
          options: {
            width: options.width || 256,
            margin: options.margin || 1,
            darkColor: options.darkColor || "#000000",
            lightColor: options.lightColor || "#FFFFFF",
            errorCorrectionLevel: options.errorCorrectionLevel || "M",
          },
          generatedAt: new Date().toISOString(),
        },
      });
    } catch (error) {
      console.error("Batch QR Code generation error:", error);
      res.status(500).json({
        success: false,
        error: "Failed to generate QR codes",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
);

// Get supported formats and options
router.get("/formats", (req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      formats: ["png", "svg", "pdf"],
      errorCorrectionLevels: ["L", "M", "Q", "H"],
      defaultOptions: {
        format: "png",
        width: 256,
        quality: 0.92,
        margin: 1,
        darkColor: "#000000",
        lightColor: "#FFFFFF",
        errorCorrectionLevel: "M",
      },
      limits: {
        maxTextLength: 2048,
        maxBatchSize: 50,
        maxWidth: 1024,
        minWidth: 64,
      },
    },
  });
});

// Get QR code info/stats
router.get("/info", (req: Request, res: Response) => {
  const { text } = req.query;

  if (!text || typeof text !== "string") {
    return res.status(400).json({
      success: false,
      error: "Text parameter is required",
    });
  }

  try {
    // Calculate approximate data capacity
    const textLength = text.length;
    const estimatedSize = Math.ceil(textLength * 1.2); // Rough estimation

    return res.json({
      success: true,
      data: {
        text,
        length: textLength,
        estimatedQRSize: estimatedSize,
        recommendedErrorCorrection: textLength > 100 ? "H" : "M",
        supportedFormats: ["png", "svg", "pdf"],
        maxCapacity: {
          numeric: 7089,
          alphanumeric: 4296,
          binary: 2953,
          kanji: 1817,
        },
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to analyze text",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;

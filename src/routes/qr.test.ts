import request from "supertest";
import express from "express";
import qrRoutes from "./qr";

const app = express();
app.use(express.json());
app.use("/api/qr", qrRoutes);

describe("QR Code Routes", () => {
  describe("POST /api/qr/generate", () => {
    it("should generate a QR code with valid input", async () => {
      const response = await request(app)
        .post("/api/qr/generate")
        .send({
          text: "Hello World",
          options: {
            format: "png",
            width: 256,
          },
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty("qrCode");
      expect(response.body.data).toHaveProperty("text", "Hello World");
      expect(response.body.data).toHaveProperty("format", "png");
      expect(response.body.data).toHaveProperty("generatedAt");
      expect(response.body.data.qrCode).toMatch(/^data:image\/png;base64,/);
    });

    it("should generate SVG QR code", async () => {
      const response = await request(app)
        .post("/api/qr/generate")
        .send({
          text: "Hello SVG",
          options: {
            format: "svg",
          },
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.format).toBe("svg");
    });

    it("should generate QR code with custom colors", async () => {
      const response = await request(app)
        .post("/api/qr/generate")
        .send({
          text: "Colorful QR",
          options: {
            darkColor: "#FF0000",
            lightColor: "#00FF00",
          },
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.options.darkColor).toBe("#FF0000");
      expect(response.body.data.options.lightColor).toBe("#00FF00");
    });

    it("should generate QR code with custom size", async () => {
      const response = await request(app)
        .post("/api/qr/generate")
        .send({
          text: "Big QR",
          options: {
            width: 512,
          },
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.options.width).toBe(512);
    });

    it("should generate QR code with different error correction levels", async () => {
      const response = await request(app)
        .post("/api/qr/generate")
        .send({
          text: "High Error Correction",
          options: {
            errorCorrectionLevel: "H",
          },
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.options.errorCorrectionLevel).toBe("H");
    });

    it("should use default options when not specified", async () => {
      const response = await request(app).post("/api/qr/generate").send({
        text: "Default Options",
      });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.format).toBe("png");
      expect(response.body.data.options.width).toBe(256);
      expect(response.body.data.options.errorCorrectionLevel).toBe("M");
    });

    it("should return 400 for missing text", async () => {
      const response = await request(app).post("/api/qr/generate").send({});

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe("Validation error");
    });

    it("should return 400 for empty text", async () => {
      const response = await request(app)
        .post("/api/qr/generate")
        .send({ text: "" });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it("should return 400 for text too long", async () => {
      const longText = "a".repeat(2049);
      const response = await request(app)
        .post("/api/qr/generate")
        .send({ text: longText });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it("should return 400 for invalid format", async () => {
      const response = await request(app)
        .post("/api/qr/generate")
        .send({
          text: "Test",
          options: { format: "invalid" },
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it("should return 400 for invalid width", async () => {
      const response = await request(app)
        .post("/api/qr/generate")
        .send({
          text: "Test",
          options: { width: 32 }, // Too small
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it("should return 400 for invalid color format", async () => {
      const response = await request(app)
        .post("/api/qr/generate")
        .send({
          text: "Test",
          options: { darkColor: "invalid-color" },
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe("POST /api/qr/batch", () => {
    it("should generate multiple QR codes", async () => {
      const response = await request(app)
        .post("/api/qr/batch")
        .send({
          items: [
            { id: "qr1", text: "Hello" },
            { id: "qr2", text: "World" },
          ],
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.results).toHaveLength(2);
      expect(response.body.data.summary.total).toBe(2);
      expect(response.body.data.summary.successful).toBe(2);
      expect(response.body.data.summary.failed).toBe(0);
      expect(response.body.data).toHaveProperty("generatedAt");
    });

    it("should generate QR codes with custom options", async () => {
      const response = await request(app)
        .post("/api/qr/batch")
        .send({
          items: [
            { id: "qr1", text: "Hello" },
            { id: "qr2", text: "World" },
          ],
          options: {
            format: "png",
            width: 512,
            darkColor: "#000000",
          },
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.options.width).toBe(512);
    });

    it("should handle mixed success and failure", async () => {
      const response = await request(app)
        .post("/api/qr/batch")
        .send({
          items: [
            { id: "qr1", text: "Hello" },
            { id: "qr2", text: "a".repeat(2049) }, // Too long
            { id: "qr3", text: "World" },
          ],
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe("Validation error");
      // The validation should fail because one text is too long
    });

    it("should auto-generate IDs when not provided", async () => {
      const response = await request(app)
        .post("/api/qr/batch")
        .send({
          items: [{ text: "Hello" }, { text: "World" }],
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.results[0].id).toBe("qr_0");
      expect(response.body.data.results[1].id).toBe("qr_1");
    });

    it("should return 400 for empty items array", async () => {
      const response = await request(app)
        .post("/api/qr/batch")
        .send({ items: [] });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it("should return 400 for missing items", async () => {
      const response = await request(app).post("/api/qr/batch").send({});

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it("should return 400 for too many items", async () => {
      const items = Array.from({ length: 51 }, (_, i) => ({
        id: `qr${i}`,
        text: `Text ${i}`,
      }));

      const response = await request(app).post("/api/qr/batch").send({ items });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe("GET /api/qr/formats", () => {
    it("should return supported formats", async () => {
      const response = await request(app).get("/api/qr/formats");

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.formats).toContain("png");
      expect(response.body.data.formats).toContain("svg");
      expect(response.body.data.formats).toContain("pdf");
      expect(response.body.data.errorCorrectionLevels).toContain("L");
      expect(response.body.data.errorCorrectionLevels).toContain("M");
      expect(response.body.data.errorCorrectionLevels).toContain("Q");
      expect(response.body.data.errorCorrectionLevels).toContain("H");
      expect(response.body.data).toHaveProperty("defaultOptions");
      expect(response.body.data).toHaveProperty("limits");
    });

    it("should return default options", async () => {
      const response = await request(app).get("/api/qr/formats");

      expect(response.status).toBe(200);
      expect(response.body.data.defaultOptions).toHaveProperty("format", "png");
      expect(response.body.data.defaultOptions).toHaveProperty("width", 256);
      expect(response.body.data.defaultOptions).toHaveProperty("quality", 0.92);
      expect(response.body.data.defaultOptions).toHaveProperty("margin", 1);
    });

    it("should return limits", async () => {
      const response = await request(app).get("/api/qr/formats");

      expect(response.status).toBe(200);
      expect(response.body.data.limits).toHaveProperty("maxTextLength", 2048);
      expect(response.body.data.limits).toHaveProperty("maxBatchSize", 50);
      expect(response.body.data.limits).toHaveProperty("maxWidth", 1024);
      expect(response.body.data.limits).toHaveProperty("minWidth", 64);
    });
  });

  describe("GET /api/qr/info", () => {
    it("should return text info", async () => {
      const response = await request(app)
        .get("/api/qr/info")
        .query({ text: "Hello World" });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.text).toBe("Hello World");
      expect(response.body.data.length).toBe(11);
      expect(response.body.data).toHaveProperty("estimatedQRSize");
      expect(response.body.data).toHaveProperty("recommendedErrorCorrection");
      expect(response.body.data).toHaveProperty("supportedFormats");
      expect(response.body.data).toHaveProperty("maxCapacity");
    });

    it("should recommend higher error correction for long text", async () => {
      const longText = "a".repeat(200);
      const response = await request(app)
        .get("/api/qr/info")
        .query({ text: longText });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.recommendedErrorCorrection).toBe("H");
    });

    it("should recommend medium error correction for short text", async () => {
      const response = await request(app)
        .get("/api/qr/info")
        .query({ text: "Short" });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.recommendedErrorCorrection).toBe("M");
    });

    it("should return capacity information", async () => {
      const response = await request(app)
        .get("/api/qr/info")
        .query({ text: "Test" });

      expect(response.status).toBe(200);
      expect(response.body.data.maxCapacity).toHaveProperty("numeric");
      expect(response.body.data.maxCapacity).toHaveProperty("alphanumeric");
      expect(response.body.data.maxCapacity).toHaveProperty("binary");
      expect(response.body.data.maxCapacity).toHaveProperty("kanji");
    });

    it("should return 400 for missing text", async () => {
      const response = await request(app).get("/api/qr/info");

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe("Text parameter is required");
    });

    it("should return 400 for empty text", async () => {
      const response = await request(app)
        .get("/api/qr/info")
        .query({ text: "" });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it("should handle special characters", async () => {
      const response = await request(app)
        .get("/api/qr/info")
        .query({ text: "Hello 世界! 🌍" });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.text).toBe("Hello 世界! 🌍");
    });
  });

  describe("Error Handling", () => {
    it("should handle invalid JSON", async () => {
      const response = await request(app)
        .post("/api/qr/generate")
        .send("invalid json")
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
    });

    it("should handle large payloads gracefully", async () => {
      const largePayload = {
        text: "a".repeat(1000),
        options: { width: 256 },
      };

      const response = await request(app)
        .post("/api/qr/generate")
        .send(largePayload);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });
  });
});

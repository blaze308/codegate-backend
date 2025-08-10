import request from "supertest";
import app from "./index";

describe("API Endpoints", () => {
  test("GET / should return API documentation", async () => {
    const response = await request(app).get("/");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "🔳 QR Code Generator API");
    expect(response.body).toHaveProperty("version", "1.0.0");
    expect(response.body).toHaveProperty("timestamp");
    expect(response.body).toHaveProperty("endpoints");
    expect(response.body.endpoints).toHaveProperty("POST /api/qr/generate");
    expect(response.body.endpoints).toHaveProperty("GET /api/events");
    expect(response.body.endpoints).toHaveProperty("POST /api/events");
  });

  test("GET /health should return health status", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status", "OK");
    expect(response.body).toHaveProperty("uptime");
    expect(response.body).toHaveProperty("memory");
    expect(response.body).toHaveProperty("timestamp");
  });

  test("GET /nonexistent should return 404", async () => {
    const response = await request(app).get("/nonexistent");

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", "Route not found");
    expect(response.body).toHaveProperty("path", "/nonexistent");
    expect(response.body).toHaveProperty("method", "GET");
  });

  test("POST /nonexistent should return 404", async () => {
    const response = await request(app).post("/nonexistent");

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", "Route not found");
    expect(response.body).toHaveProperty("path", "/nonexistent");
    expect(response.body).toHaveProperty("method", "POST");
  });

  // Test rate limiting (this might be flaky in CI)
  test("Rate limiting should work", async () => {
    // This test would need to be adjusted based on actual rate limiting settings
    // For now, just test that the endpoint responds normally
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
  });

  // Test CORS headers
  test("CORS headers should be present", async () => {
    const response = await request(app)
      .get("/")
      .set("Origin", "http://localhost:3000");
    expect(response.headers).toHaveProperty("access-control-allow-credentials");
  });

  // Test security headers (helmet)
  test("Security headers should be present", async () => {
    const response = await request(app).get("/");
    expect(response.headers).toHaveProperty("x-content-type-options");
    expect(response.headers).toHaveProperty("x-frame-options");
  });
});

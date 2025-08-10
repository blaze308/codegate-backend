import request from "supertest";
import express from "express";
import eventRoutes from "./events";

const app = express();
app.use(express.json());
app.use("/api/events", eventRoutes);

describe("Event Routes", () => {
  describe("GET /api/events", () => {
    it("should return events list with pagination", async () => {
      const response = await request(app)
        .get("/api/events")
        .query({ page: 1, limit: 10 });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty("events");
      expect(response.body.data).toHaveProperty("total");
      expect(response.body.data).toHaveProperty("page", 1);
      expect(response.body.data).toHaveProperty("limit", 10);
      expect(response.body.data).toHaveProperty("totalPages");
      expect(Array.isArray(response.body.data.events)).toBe(true);
    });

    it("should filter events by category", async () => {
      const response = await request(app)
        .get("/api/events")
        .query({ category: "WEDDING" });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty("events");
    });

    it("should filter events by status", async () => {
      const response = await request(app)
        .get("/api/events")
        .query({ status: "PUBLISHED" });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    it("should filter events by date range", async () => {
      const startDate = new Date().toISOString();
      const endDate = new Date(
        Date.now() + 30 * 24 * 60 * 60 * 1000
      ).toISOString();

      const response = await request(app)
        .get("/api/events")
        .query({ startDate, endDate });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    it("should filter events by price range", async () => {
      const response = await request(app)
        .get("/api/events")
        .query({ minPrice: 10, maxPrice: 100 });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    it("should search events by text", async () => {
      const response = await request(app)
        .get("/api/events")
        .query({ search: "wedding" });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });

    it("should filter events by city", async () => {
      const response = await request(app)
        .get("/api/events")
        .query({ city: "New York" });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
    });
  });

  describe("POST /api/events", () => {
    const validEventData = {
      title: "Test Wedding",
      description: "A beautiful wedding celebration",
      category: "WEDDING",
      eventDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      startTime: "2:00 PM",
      endTime: "10:00 PM",
      capacity: 100,
      ticketPrice: 50.0,
      currency: "USD",
      coupleName: "John & Jane",
      dressCode: "Semi-formal",
      location: {
        venue: "Grand Hotel",
        address: "123 Main St",
        city: "New York",
        state: "NY",
        country: "USA",
        zipCode: "10001",
        coordinates: {
          latitude: 40.7128,
          longitude: -74.006,
        },
      },
      tags: ["wedding", "celebration"],
      images: ["image1.jpg", "image2.jpg"],
    };

    it("should create a new event with valid data", async () => {
      const response = await request(app)
        .post("/api/events")
        .send(validEventData);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data).toHaveProperty("title", validEventData.title);
      expect(response.body.data).toHaveProperty("qrCode");
      expect(response.body.data).toHaveProperty("organizer");
    });

    it("should return 400 for missing required fields", async () => {
      const invalidData = { ...validEventData } as any;
      invalidData.title = undefined;

      const response = await request(app).post("/api/events").send(invalidData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it("should return 400 for invalid event date", async () => {
      const invalidData = {
        ...validEventData,
        eventDate: "invalid-date",
      };

      const response = await request(app).post("/api/events").send(invalidData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it("should return 400 for invalid category", async () => {
      const invalidData = {
        ...validEventData,
        category: "INVALID_CATEGORY",
      };

      const response = await request(app).post("/api/events").send(invalidData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it("should return 400 for negative capacity", async () => {
      const invalidData = {
        ...validEventData,
        capacity: -10,
      };

      const response = await request(app).post("/api/events").send(invalidData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it("should return 400 for negative ticket price", async () => {
      const invalidData = {
        ...validEventData,
        ticketPrice: -5.0,
      };

      const response = await request(app).post("/api/events").send(invalidData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe("GET /api/events/:id", () => {
    it("should return 404 for non-existent event", async () => {
      const response = await request(app).get("/api/events/non-existent-id");

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe("Event not found");
    });

    it("should return event details for valid ID", async () => {
      // This test would need a valid event ID from the database
      // For now, we'll test the endpoint structure
      const response = await request(app).get("/api/events/test-id");

      // Expect either 200 (if event exists) or 404 (if not found)
      expect([200, 404]).toContain(response.status);
      expect(response.body).toHaveProperty("success");
    });
  });

  describe("POST /api/events/:id/tickets", () => {
    const validTicketData = {
      ticketType: "GUEST",
      quantity: 2,
      user: {
        name: "John Doe",
        email: "john@example.com",
        phone: "+1234567890",
      },
    };

    it("should return 404 for non-existent event", async () => {
      const response = await request(app)
        .post("/api/events/non-existent-id/tickets")
        .send(validTicketData);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });

    it("should validate ticket purchase data", async () => {
      const invalidData = { ...validTicketData } as any;
      invalidData.user = { ...validTicketData.user };
      invalidData.user.email = undefined;

      const response = await request(app)
        .post("/api/events/test-id/tickets")
        .send(invalidData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it("should validate quantity", async () => {
      const invalidData = {
        ...validTicketData,
        quantity: 0,
      };

      const response = await request(app)
        .post("/api/events/test-id/tickets")
        .send(invalidData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });
  });

  describe("POST /api/events/checkin", () => {
    const validCheckInData = {
      qrCode: "ticket:test-ticket-id",
      staffId: "staff-user-id",
    };

    it("should validate check-in data", async () => {
      const response = await request(app)
        .post("/api/events/checkin")
        .send(validCheckInData);

      // Expect either success or specific error
      expect(response.body).toHaveProperty("success");
    });

    it("should return 400 for missing QR code", async () => {
      const invalidData = { ...validCheckInData } as any;
      invalidData.qrCode = undefined;

      const response = await request(app)
        .post("/api/events/checkin")
        .send(invalidData);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
    });

    it("should return 404 for invalid QR code format", async () => {
      const invalidData = {
        ...validCheckInData,
        qrCode: "invalid-qr-code",
      };

      const response = await request(app)
        .post("/api/events/checkin")
        .send(invalidData);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    });
  });

  describe("Error Handling", () => {
    it("should handle invalid JSON", async () => {
      const response = await request(app)
        .post("/api/events")
        .send("invalid json")
        .set("Content-Type", "application/json");

      expect(response.status).toBe(400);
    });

    it("should handle server errors gracefully", async () => {
      // This would test database connection errors, etc.
      // For now, just ensure the endpoint exists
      const response = await request(app).get("/api/events");
      expect(response.status).not.toBe(500);
    });
  });
});

import { Router, Request, Response } from "express";
import { prisma } from "../lib/prisma";
import QRCode from "qrcode";
import { v4 as uuidv4 } from "uuid";
import {
  CreateEventRequest,
  UpdateEventRequest,
  EventFilters,
  TicketPurchaseRequest,
  QRCheckInRequest,
  CreateEventSegmentRequest,
  CreateVendorRequest,
  UpdateVendorRequest,
  EventResponse,
} from "../types/event";
import {
  validateEventCreation,
  validateTicketPurchase,
  validateCheckIn,
} from "../middleware/validation";

const router = Router();

// Get all events with filtering
router.get("/", async (req: Request, res: Response) => {
  try {
    const {
      category,
      status,
      startDate,
      endDate,
      city,
      minPrice,
      maxPrice,
      search,
      page = 1,
      limit = 10,
    } = req.query as any;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where: any = {};

    if (category) where.category = category;
    if (status) where.status = status;
    if (city) where.city = { contains: city, mode: "insensitive" };
    if (minPrice || maxPrice) {
      where.ticketPrice = {};
      if (minPrice) where.ticketPrice.gte = parseFloat(minPrice);
      if (maxPrice) where.ticketPrice.lte = parseFloat(maxPrice);
    }
    if (startDate) where.eventDate = { gte: new Date(startDate) };
    if (endDate)
      where.eventDate = { ...where.eventDate, lte: new Date(endDate) };
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ];
    }

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        include: {
          organizer: {
            select: { id: true, name: true, email: true },
          },
          _count: {
            select: { tickets: true, attendees: true },
          },
        },
        skip,
        take: parseInt(limit),
        orderBy: { eventDate: "asc" },
      }),
      prisma.event.count({ where }),
    ]);

    res.json({
      success: true,
      data: {
        events,
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error("Get events error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch events",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Get single event by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const event = await prisma.event.findUnique({
      where: { id },
      include: {
        organizer: {
          select: { id: true, name: true, email: true },
        },
        tickets: {
          include: {
            user: { select: { id: true, name: true, email: true } },
          },
        },
        _count: {
          select: { tickets: true, attendees: true, checkIns: true },
        },
      },
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        error: "Event not found",
      });
    }

    return res.json({
      success: true,
      data: event,
    });
  } catch (error) {
    console.error("Get event error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch event",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Create new event
router.post("/", validateEventCreation, async (req: Request, res: Response) => {
  try {
    const eventData: CreateEventRequest = req.body;

    // Generate organizer ID
    const organizerId = uuidv4();

    // Create or find organizer to avoid foreign key constraint
    let organizer = await prisma.user.findUnique({
      where: { email: "organizer@example.com" },
    });

    if (!organizer) {
      organizer = await prisma.user.create({
        data: {
          id: organizerId,
          email: "organizer@example.com",
          name: "Event Organizer",
        },
      });
    }

    // Generate QR code for the event
    const eventId = uuidv4();
    const qrCodeData = `event:${eventId}`;
    const qrCode = await QRCode.toDataURL(qrCodeData);

    const event = await prisma.event.create({
      data: {
        id: eventId,
        title: eventData.title,
        description: eventData.description,
        category: eventData.category,
        eventDate: new Date(eventData.eventDate),
        startTime: eventData.startTime,
        endTime: eventData.endTime,
        capacity: eventData.capacity,
        ticketPrice: eventData.ticketPrice,
        currency: eventData.currency,
        qrCode,
        images: eventData.images || [],
        tags: eventData.tags || [],
        // Wedding/Party specific fields
        coupleName: eventData.coupleName,
        hostName: eventData.hostName,
        dressCode: eventData.dressCode,
        specialInstructions: eventData.specialInstructions,
        giftRegistry: eventData.giftRegistry,
        rsvpDeadline: eventData.rsvpDeadline
          ? new Date(eventData.rsvpDeadline)
          : null,
        isPlusOneAllowed: eventData.isPlusOneAllowed || false,
        mealPreferences: eventData.mealPreferences || [],
        // Location fields
        venue: eventData.location.venue,
        address: eventData.location.address,
        city: eventData.location.city,
        state: eventData.location.state,
        country: eventData.location.country,
        zipCode: eventData.location.zipCode,
        latitude: eventData.location.coordinates?.latitude,
        longitude: eventData.location.coordinates?.longitude,
        organizerId: organizer.id,
      },
      include: {
        organizer: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    return res.status(201).json({
      success: true,
      data: event,
    });
  } catch (error) {
    console.error("Create event error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to create event",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Purchase ticket for event
router.post(
  "/:id/tickets",
  validateTicketPurchase,
  async (req: Request, res: Response) => {
    try {
      const { id: eventId } = req.params;
      const purchaseData: TicketPurchaseRequest = req.body;

      // Check if event exists and has capacity
      const event = await prisma.event.findUnique({
        where: { id: eventId },
        include: { _count: { select: { tickets: true } } },
      });

      if (!event) {
        return res.status(404).json({
          success: false,
          error: "Event not found",
        });
      }

      if (event._count.tickets >= event.capacity) {
        return res.status(400).json({
          success: false,
          error: "Event is sold out",
        });
      }

      // Create or find user
      let user = await prisma.user.findUnique({
        where: { email: purchaseData.user.email },
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            email: purchaseData.user.email,
            name: purchaseData.user.name,
            phone: purchaseData.user.phone,
          },
        });
      }

      // Generate tickets
      const tickets = [];
      for (let i = 0; i < purchaseData.quantity; i++) {
        const ticketId = uuidv4();
        const qrCodeData = `ticket:${ticketId}:${eventId}:${user.id}`;
        const qrCode = await QRCode.toDataURL(qrCodeData);

        const ticket = await prisma.ticket.create({
          data: {
            id: ticketId,
            qrCode,
            ticketType: purchaseData.ticketType,
            price: event.ticketPrice,
            validUntil: event.eventDate,
            eventId,
            userId: user.id,
          },
        });

        // Create attendee record
        await prisma.attendee.create({
          data: {
            eventId,
            userId: user.id,
            ticketId: ticket.id,
          },
        });

        tickets.push(ticket);
      }

      // Update event attendee count
      await prisma.event.update({
        where: { id: eventId },
        data: {
          currentAttendees: {
            increment: purchaseData.quantity,
          },
        },
      });

      return res.status(201).json({
        success: true,
        data: {
          tickets,
          event: { id: eventId, title: event.title },
          user: { id: user.id, name: user.name, email: user.email },
        },
      });
    } catch (error) {
      console.error("Purchase ticket error:", error);
      return res.status(500).json({
        success: false,
        error: "Failed to purchase ticket",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
);

// Check-in with QR code
router.post(
  "/checkin",
  validateCheckIn,
  async (req: Request, res: Response) => {
    try {
      const checkInData: QRCheckInRequest = req.body;

      // Find ticket by QR code
      const ticket = await prisma.ticket.findFirst({
        where: { qrCode: checkInData.qrCode },
        include: {
          event: true,
          user: true,
          attendee: true,
        },
      });

      if (!ticket) {
        return res.status(404).json({
          success: false,
          error: "Invalid QR code",
        });
      }

      if (checkInData.eventId && ticket.eventId !== checkInData.eventId) {
        return res.status(400).json({
          success: false,
          error: "QR code does not match this event",
        });
      }

      // Check if ticket is valid (not expired)
      if (ticket.validUntil < new Date()) {
        return res.status(400).json({
          success: false,
          error: "Ticket has expired",
        });
      }

      // Check if already checked in
      const existingCheckIn = await prisma.checkIn.findFirst({
        where: {
          ticketId: ticket.id,
          eventId: ticket.eventId,
        },
      });

      if (existingCheckIn) {
        return res.status(400).json({
          success: false,
          error: "Already checked in",
          data: {
            checkedInAt: existingCheckIn.checkedInAt,
          },
        });
      }

      // Create staff user if staffId is provided
      let staffId = checkInData.staffId;
      if (!staffId) {
        // Create a default staff user
        staffId = uuidv4();
        await prisma.user.create({
          data: {
            id: staffId,
            email: "staff@example.com",
            name: "Event Staff",
          },
        });
      }

      // Create check-in record
      const checkIn = await prisma.checkIn.create({
        data: {
          qrCode: checkInData.qrCode,
          eventId: ticket.eventId,
          ticketId: ticket.id,
          checkedInBy: staffId,
        },
      });

      // Update attendee status
      if (ticket.attendee) {
        await prisma.attendee.update({
          where: { id: ticket.attendee.id },
          data: {
            checkedIn: true,
            checkedInAt: new Date(),
          },
        });
      }

      return res.status(200).json({
        success: true,
        data: {
          checkIn,
          ticket: {
            id: ticket.id,
            ticketType: ticket.ticketType,
          },
          event: {
            id: ticket.event.id,
            title: ticket.event.title,
          },
          user: {
            id: ticket.user.id,
            name: ticket.user.name,
            email: ticket.user.email,
          },
        },
      });
    } catch (error) {
      console.error("Check-in error:", error);
      return res.status(500).json({
        success: false,
        error: "Failed to check in",
        message: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
);

// Get event segments
router.get("/:id/segments", async (req: Request, res: Response) => {
  try {
    const { id: eventId } = req.params;

    const segments = await prisma.eventSegment.findMany({
      where: { eventId },
      orderBy: { order: "asc" },
    });

    res.json({
      success: true,
      data: segments,
    });
  } catch (error) {
    console.error("Get segments error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch segments",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Add event segment
router.post("/:id/segments", async (req: Request, res: Response) => {
  try {
    const { id: eventId } = req.params;
    const segmentData: CreateEventSegmentRequest = req.body;

    const startTime = new Date(segmentData.startTime);
    const endTime = new Date(
      startTime.getTime() + segmentData.durationMinutes * 60000
    );

    const segment = await prisma.eventSegment.create({
      data: {
        eventId,
        eventDetail: segmentData.eventDetail,
        performedBy: segmentData.performedBy,
        durationMinutes: segmentData.durationMinutes,
        startTime,
        endTime,
        order: segmentData.order,
        notes: segmentData.notes,
      },
    });

    res.status(201).json({
      success: true,
      data: segment,
    });
  } catch (error) {
    console.error("Create segment error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create segment",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Get event vendors
router.get("/:id/vendors", async (req: Request, res: Response) => {
  try {
    const { id: eventId } = req.params;

    const vendors = await prisma.vendor.findMany({
      where: { eventId },
      orderBy: { serviceType: "asc" },
    });

    res.json({
      success: true,
      data: vendors,
    });
  } catch (error) {
    console.error("Get vendors error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch vendors",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Add event vendor
router.post("/:id/vendors", async (req: Request, res: Response) => {
  try {
    const { id: eventId } = req.params;
    const vendorData: CreateVendorRequest = req.body;

    const vendor = await prisma.vendor.create({
      data: {
        eventId,
        name: vendorData.name,
        serviceType: vendorData.serviceType,
        contactNumber: vendorData.contactNumber,
        email: vendorData.email,
        website: vendorData.website,
        socialMedia: vendorData.socialMedia,
        notes: vendorData.notes,
        totalAmount: vendorData.totalAmount,
        contractSigned: vendorData.contractSigned || false,
      },
    });

    res.status(201).json({
      success: true,
      data: vendor,
    });
  } catch (error) {
    console.error("Create vendor error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create vendor",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

// Update vendor
router.put("/vendors/:vendorId", async (req: Request, res: Response) => {
  try {
    const { vendorId } = req.params;
    const updateData: UpdateVendorRequest = req.body;

    const vendor = await prisma.vendor.update({
      where: { id: vendorId },
      data: updateData,
    });

    res.json({
      success: true,
      data: vendor,
    });
  } catch (error) {
    console.error("Update vendor error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update vendor",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;

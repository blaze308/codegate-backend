import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const qrRequestSchema = Joi.object({
  text: Joi.string().required().max(2048).messages({
    "string.empty": "Text is required",
    "string.max": "Text must not exceed 2048 characters",
  }),
  options: Joi.object({
    format: Joi.string().valid("png", "svg", "pdf").default("png"),
    width: Joi.number().integer().min(64).max(1024).default(256),
    quality: Joi.number().min(0.1).max(1).default(0.92),
    margin: Joi.number().integer().min(0).max(10).default(1),
    darkColor: Joi.string()
      .pattern(/^#[0-9A-Fa-f]{6}$/)
      .default("#000000"),
    lightColor: Joi.string()
      .pattern(/^#[0-9A-Fa-f]{6}$/)
      .default("#FFFFFF"),
    errorCorrectionLevel: Joi.string().valid("L", "M", "Q", "H").default("M"),
  }).optional(),
});

const batchRequestSchema = Joi.object({
  items: Joi.array()
    .items(
      Joi.object({
        id: Joi.string().optional(),
        text: Joi.string().required().max(2048),
      })
    )
    .min(1)
    .max(50)
    .required()
    .messages({
      "array.min": "At least one item is required",
      "array.max": "Maximum 50 items allowed",
    }),
  options: Joi.object({
    format: Joi.string().valid("png", "svg", "pdf").default("png"),
    width: Joi.number().integer().min(64).max(1024).default(256),
    quality: Joi.number().min(0.1).max(1).default(0.92),
    margin: Joi.number().integer().min(0).max(10).default(1),
    darkColor: Joi.string()
      .pattern(/^#[0-9A-Fa-f]{6}$/)
      .default("#000000"),
    lightColor: Joi.string()
      .pattern(/^#[0-9A-Fa-f]{6}$/)
      .default("#FFFFFF"),
    errorCorrectionLevel: Joi.string().valid("L", "M", "Q", "H").default("M"),
  }).optional(),
});

// Event validation schemas
const eventCreationSchema = Joi.object({
  title: Joi.string().required().min(1).max(255).messages({
    "string.empty": "Title is required",
    "string.min": "Title must be at least 1 character",
    "string.max": "Title must not exceed 255 characters",
  }),
  description: Joi.string().required().min(1).max(2000).messages({
    "string.empty": "Description is required",
    "string.min": "Description must be at least 1 character",
    "string.max": "Description must not exceed 2000 characters",
  }),
  category: Joi.string()
    .valid(
      "WEDDING",
      "RECEPTION",
      "ENGAGEMENT_PARTY",
      "BIRTHDAY_PARTY",
      "ANNIVERSARY",
      "BABY_SHOWER",
      "BRIDAL_SHOWER",
      "GRADUATION",
      "HOLIDAY_PARTY",
      "CORPORATE_EVENT",
      "BUSINESS_MEETING"
    )
    .required()
    .messages({
      "any.only": "Category must be one of the valid event categories",
    }),
  eventDate: Joi.date().iso().greater("now").required().messages({
    "date.base": "Event date must be a valid date",
    "date.greater": "Event date must be in the future",
    "date.format": "Event date must be in ISO format",
  }),
  startTime: Joi.string().required().messages({
    "string.empty": "Start time is required",
  }),
  endTime: Joi.string().optional(),
  capacity: Joi.number().integer().min(1).max(10000).required().messages({
    "number.base": "Capacity must be a number",
    "number.integer": "Capacity must be an integer",
    "number.min": "Capacity must be at least 1",
    "number.max": "Capacity must not exceed 10,000",
  }),
  ticketPrice: Joi.number().min(0).required().messages({
    "number.base": "Ticket price must be a number",
    "number.min": "Ticket price cannot be negative",
  }),
  currency: Joi.string().length(3).default("USD").messages({
    "string.length": "Currency must be a 3-character code",
  }),
  location: Joi.object({
    venue: Joi.string().required().messages({
      "string.empty": "Venue is required",
    }),
    address: Joi.string().required().messages({
      "string.empty": "Address is required",
    }),
    city: Joi.string().required().messages({
      "string.empty": "City is required",
    }),
    state: Joi.string().required().messages({
      "string.empty": "State is required",
    }),
    country: Joi.string().required().messages({
      "string.empty": "Country is required",
    }),
    zipCode: Joi.string().required().messages({
      "string.empty": "ZIP code is required",
    }),
    coordinates: Joi.object({
      latitude: Joi.number().min(-90).max(90).optional(),
      longitude: Joi.number().min(-180).max(180).optional(),
    }).optional(),
  }).required(),
  // Optional fields
  coupleName: Joi.string().optional(),
  hostName: Joi.string().optional(),
  dressCode: Joi.string().optional(),
  specialInstructions: Joi.string().optional(),
  giftRegistry: Joi.string().optional(),
  rsvpDeadline: Joi.date().iso().optional(),
  isPlusOneAllowed: Joi.boolean().default(false),
  mealPreferences: Joi.array().items(Joi.string()).default([]),
  tags: Joi.array().items(Joi.string()).default([]),
  images: Joi.array().items(Joi.string()).default([]),
});

const ticketPurchaseSchema = Joi.object({
  ticketType: Joi.string()
    .valid("GUEST", "PLUS_ONE", "FAMILY", "CHILD", "VIP", "VENDOR", "STAFF")
    .required()
    .messages({
      "any.only":
        "Ticket type must be one of: GUEST, PLUS_ONE, FAMILY, CHILD, VIP, VENDOR, STAFF",
    }),
  quantity: Joi.number().integer().min(1).max(10).required().messages({
    "number.base": "Quantity must be a number",
    "number.integer": "Quantity must be an integer",
    "number.min": "Quantity must be at least 1",
    "number.max": "Quantity cannot exceed 10",
  }),
  user: Joi.object({
    name: Joi.string().required().messages({
      "string.empty": "Name is required",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Email must be valid",
      "string.empty": "Email is required",
    }),
    phone: Joi.string().optional(),
  }).required(),
});

const checkInSchema = Joi.object({
  qrCode: Joi.string().required().messages({
    "string.empty": "QR code is required",
  }),
  eventId: Joi.string().optional(),
  staffId: Joi.string().optional(),
});

export const validateQRRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error, value } = qrRequestSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      error: "Validation error",
      details: error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      })),
    });
  }

  req.body = value;
  return next();
};

export const validateBatchRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error, value } = batchRequestSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      error: "Validation error",
      details: error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      })),
    });
  }

  req.body = value;
  return next();
};

export const validateEventCreation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error, value } = eventCreationSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      error: "Validation error",
      details: error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      })),
    });
  }

  req.body = value;
  return next();
};

export const validateTicketPurchase = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error, value } = ticketPurchaseSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      error: "Validation error",
      details: error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      })),
    });
  }

  req.body = value;
  return next();
};

export const validateCheckIn = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error, value } = checkInSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      error: "Validation error",
      details: error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      })),
    });
  }

  req.body = value;
  return next();
};

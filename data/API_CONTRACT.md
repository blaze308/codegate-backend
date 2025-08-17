# CodeGate Events & Ticketing API Contract

**Base URL:** `http://localhost:3000`  
**Version:** 1.0.0  
**Content-Type:** `application/json`

## 📋 Table of Contents

- [Authentication](#authentication)
- [Response Format](#response-format)
- [Error Handling](#error-handling)
- [Rate Limiting](#rate-limiting)
- [Events API](#events-api)
- [QR Code API](#qr-code-api)
- [System Endpoints](#system-endpoints)
- [Data Types](#data-types)

---

## 🔐 Authentication

Currently, no authentication is required for API endpoints. This will be implemented in future versions.

---

## 📄 Response Format

All API responses follow a consistent format:

### Success Response

```json
{
  "success": true,
  "data": {
    // Response data here
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error Type",
  "message": "Detailed error message",
  "details": [
    {
      "field": "fieldName",
      "message": "Specific field error"
    }
  ]
}
```

---

## ⚠️ Error Handling

### HTTP Status Codes

| Code  | Description           | When It Occurs                                 |
| ----- | --------------------- | ---------------------------------------------- |
| `200` | OK                    | Successful GET requests                        |
| `201` | Created               | Successful POST requests that create resources |
| `400` | Bad Request           | Validation errors, malformed requests          |
| `404` | Not Found             | Resource not found, invalid endpoints          |
| `429` | Too Many Requests     | Rate limit exceeded                            |
| `500` | Internal Server Error | Server-side errors                             |

### Common Error Types

#### Validation Errors (400)

```json
{
  "success": false,
  "error": "Validation error",
  "details": [
    {
      "field": "eventDate",
      "message": "Event date must be in the future"
    }
  ]
}
```

#### Not Found Errors (404)

```json
{
  "success": false,
  "error": "Event not found"
}
```

#### Rate Limit Errors (429)

```json
{
  "error": "Too many requests from this IP, please try again later.",
  "retryAfter": "15 minutes"
}
```

---

## 🎯 Rate Limiting

- **Window:** 15 minutes
- **Limit:** 100 requests per IP
- **Headers:** Standard rate limit headers included in responses

---

## 🎉 Events API

### GET /api/events

**Description:** Retrieve a paginated list of events with optional filtering

#### Query Parameters

| Parameter   | Type   | Required | Description                          | Example                    |
| ----------- | ------ | -------- | ------------------------------------ | -------------------------- |
| `category`  | string | No       | Filter by event category             | `WEDDING`                  |
| `status`    | string | No       | Filter by event status               | `PUBLISHED`                |
| `city`      | string | No       | Filter by city (case-insensitive)    | `New York`                 |
| `search`    | string | No       | Search in title/description          | `birthday`                 |
| `startDate` | string | No       | Filter events from date (ISO format) | `2025-01-01T00:00:00.000Z` |
| `endDate`   | string | No       | Filter events to date (ISO format)   | `2025-12-31T23:59:59.999Z` |
| `minPrice`  | number | No       | Minimum ticket price                 | `25.50`                    |
| `maxPrice`  | number | No       | Maximum ticket price                 | `100.00`                   |
| `page`      | number | No       | Page number (default: 1)             | `2`                        |
| `limit`     | number | No       | Items per page (default: 10)         | `5`                        |

#### Example Request

```http
GET /api/events?category=WEDDING&city=New%20York&page=1&limit=5
```

#### Success Response (200)

```json
{
  "success": true,
  "data": {
    "events": [
      {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "title": "Sarah & Mike's Wedding",
        "description": "A beautiful celebration of love",
        "category": "WEDDING",
        "eventDate": "2025-08-15T14:00:00.000Z",
        "startTime": "14:00",
        "endTime": "23:00",
        "capacity": 150,
        "currentAttendees": 45,
        "ticketPrice": 0,
        "currency": "USD",
        "status": "PUBLISHED",
        "venue": "Grand Ballroom",
        "address": "123 Wedding Ave",
        "city": "New York",
        "state": "NY",
        "country": "USA",
        "zipCode": "10001",
        "coupleName": "Sarah & Mike",
        "isPlusOneAllowed": true,
        "organizer": {
          "id": "organizer-id",
          "name": "Event Organizer",
          "email": "organizer@example.com"
        },
        "_count": {
          "tickets": 45,
          "attendees": 45
        }
      }
    ],
    "total": 1,
    "page": 1,
    "limit": 5,
    "totalPages": 1
  }
}
```

#### Error Responses

- **500:** Server error fetching events

---

### GET /api/events/:id

**Description:** Retrieve detailed information about a specific event

#### Path Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| `id`      | string | Yes      | Event UUID  |

#### Example Request

```http
GET /api/events/123e4567-e89b-12d3-a456-426614174000
```

#### Success Response (200)

```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Sarah & Mike's Wedding",
    // ... all event fields
    "organizer": {
      "id": "organizer-id",
      "name": "Event Organizer",
      "email": "organizer@example.com"
    },
    "tickets": [
      {
        "id": "ticket-id",
        "qrCode": "data:image/png;base64,iVBORw0KGgoAAAA...",
        "ticketType": "GUEST",
        "price": 75.0,
        "status": "ACTIVE",
        "user": {
          "id": "user-id",
          "name": "Alice Johnson",
          "email": "alice@example.com"
        }
      }
    ],
    "_count": {
      "tickets": 45,
      "attendees": 45,
      "checkIns": 30
    }
  }
}
```

#### Error Responses

- **404:** Event not found
- **500:** Server error fetching event

---

### POST /api/events

**Description:** Create a new event

#### Request Body

```json
{
  "title": "Beautiful Wedding Celebration",
  "description": "Join us for a magical evening celebrating love and unity",
  "category": "WEDDING",
  "eventDate": "2025-08-15T14:00:00.000Z",
  "startTime": "14:00",
  "endTime": "23:00",
  "capacity": 150,
  "ticketPrice": 75.0,
  "currency": "USD",
  "location": {
    "venue": "Grand Ballroom",
    "address": "123 Wedding Avenue",
    "city": "New York",
    "state": "NY",
    "country": "USA",
    "zipCode": "10001",
    "coordinates": {
      "latitude": 40.7128,
      "longitude": -74.006
    }
  },
  "coupleName": "Sarah & Mike",
  "hostName": "The Johnson Family",
  "dressCode": "Formal",
  "specialInstructions": "Please arrive 30 minutes early",
  "giftRegistry": "https://registry.example.com/sarah-mike",
  "rsvpDeadline": "2025-07-15T23:59:59.999Z",
  "isPlusOneAllowed": true,
  "mealPreferences": ["Vegetarian", "Gluten-Free"],
  "tags": ["wedding", "celebration", "love"],
  "images": ["https://example.com/venue1.jpg"]
}
```

#### Field Validation Rules

| Field              | Type   | Required | Validation Rules         | Error Messages                                                           |
| ------------------ | ------ | -------- | ------------------------ | ------------------------------------------------------------------------ |
| `title`            | string | Yes      | 1-255 characters         | "Title is required", "Title must not exceed 255 characters"              |
| `description`      | string | Yes      | 1-2000 characters        | "Description is required", "Description must not exceed 2000 characters" |
| `category`         | string | Yes      | Must be valid enum       | "Category must be one of the valid event categories"                     |
| `eventDate`        | string | Yes      | ISO date, must be future | "Event date must be a valid date", "Event date must be in the future"    |
| `startTime`        | string | Yes      | Time string              | "Start time is required"                                                 |
| `endTime`          | string | No       | Time string              | -                                                                        |
| `capacity`         | number | Yes      | Integer, 1-10000         | "Capacity must be at least 1", "Capacity must not exceed 10,000"         |
| `ticketPrice`      | number | Yes      | ≥ 0                      | "Ticket price cannot be negative"                                        |
| `currency`         | string | No       | 3-character code         | "Currency must be a 3-character code"                                    |
| `location.venue`   | string | Yes      | Required                 | "Venue is required"                                                      |
| `location.address` | string | Yes      | Required                 | "Address is required"                                                    |
| `location.city`    | string | Yes      | Required                 | "City is required"                                                       |
| `location.state`   | string | Yes      | Required                 | "State is required"                                                      |
| `location.country` | string | Yes      | Required                 | "Country is required"                                                    |
| `location.zipCode` | string | Yes      | Required                 | "ZIP code is required"                                                   |

#### Valid Categories

- `WEDDING`
- `RECEPTION`
- `ENGAGEMENT_PARTY`
- `BIRTHDAY_PARTY`
- `ANNIVERSARY`
- `BABY_SHOWER`
- `BRIDAL_SHOWER`
- `GRADUATION`
- `HOLIDAY_PARTY`
- `CORPORATE_EVENT`
- `BUSINESS_MEETING`

#### Success Response (201)

```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Beautiful Wedding Celebration",
    "qrCode": "data:image/png;base64,iVBORw0KGgoAAAA...",
    // ... all event fields
    "organizer": {
      "id": "organizer-id",
      "name": "Event Organizer",
      "email": "organizer@example.com"
    }
  }
}
```

#### Error Responses

- **400:** Validation errors (see validation rules above)
- **500:** Server error creating event

---

### POST /api/events/:id/tickets

**Description:** Purchase tickets for an event

#### Path Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| `id`      | string | Yes      | Event UUID  |

#### Request Body

```json
{
  "ticketType": "GUEST",
  "quantity": 2,
  "user": {
    "name": "Alice Johnson",
    "email": "alice.johnson@example.com",
    "phone": "+1-555-123-4567"
  }
}
```

#### Field Validation Rules

| Field        | Type   | Required | Validation Rules   | Error Messages                                                                   |
| ------------ | ------ | -------- | ------------------ | -------------------------------------------------------------------------------- |
| `ticketType` | string | Yes      | Must be valid enum | "Ticket type must be one of: GUEST, PLUS_ONE, FAMILY, CHILD, VIP, VENDOR, STAFF" |
| `quantity`   | number | Yes      | Integer, 1-10      | "Quantity must be at least 1", "Quantity cannot exceed 10"                       |
| `user.name`  | string | Yes      | Required           | "Name is required"                                                               |
| `user.email` | string | Yes      | Valid email format | "Email must be valid", "Email is required"                                       |
| `user.phone` | string | No       | Optional           | -                                                                                |

#### Valid Ticket Types

- `GUEST` - Regular event attendee
- `PLUS_ONE` - Guest's plus-one
- `FAMILY` - Family member
- `CHILD` - Child attendee
- `VIP` - VIP guest
- `VENDOR` - Event vendor/supplier
- `STAFF` - Event staff member

#### Success Response (201)

```json
{
  "success": true,
  "data": {
    "tickets": [
      {
        "id": "ticket-id-1",
        "qrCode": "data:image/png;base64,iVBORw0KGgoAAAA...",
        "ticketType": "GUEST",
        "price": 75.0,
        "validUntil": "2025-08-15T14:00:00.000Z"
      }
    ],
    "event": {
      "id": "event-id",
      "title": "Beautiful Wedding Celebration"
    },
    "user": {
      "id": "user-id",
      "name": "Alice Johnson",
      "email": "alice.johnson@example.com"
    }
  }
}
```

#### Error Responses

- **400:** Validation errors, event sold out
- **404:** Event not found
- **500:** Server error purchasing tickets

---

### POST /api/events/checkin

**Description:** Check-in to an event using a QR code

#### Request Body

```json
{
  "qrCode": "data:image/png;base64,iVBORw0KGgoAAAA...",
  "eventId": "123e4567-e89b-12d3-a456-426614174000",
  "staffId": "staff-user-id"
}
```

#### Field Validation Rules

| Field     | Type   | Required | Validation Rules | Error Messages        |
| --------- | ------ | -------- | ---------------- | --------------------- |
| `qrCode`  | string | Yes      | Required         | "QR code is required" |
| `eventId` | string | No       | Optional UUID    | -                     |
| `staffId` | string | No       | Optional UUID    | -                     |

#### Success Response (200)

```json
{
  "success": true,
  "data": {
    "checkIn": {
      "id": "checkin-id",
      "checkedInAt": "2025-08-15T14:30:00.000Z"
    },
    "ticket": {
      "id": "ticket-id",
      "ticketType": "GUEST"
    },
    "event": {
      "id": "event-id",
      "title": "Beautiful Wedding Celebration"
    },
    "user": {
      "id": "user-id",
      "name": "Alice Johnson",
      "email": "alice.johnson@example.com"
    }
  }
}
```

#### Error Responses

- **400:** Invalid QR code, ticket expired, already checked in, QR code mismatch
- **404:** Invalid QR code
- **500:** Server error during check-in

#### Specific Error Messages

```json
// Invalid QR code
{
  "success": false,
  "error": "Invalid QR code"
}

// QR code doesn't match event
{
  "success": false,
  "error": "QR code does not match this event"
}

// Ticket expired
{
  "success": false,
  "error": "Ticket has expired"
}

// Already checked in
{
  "success": false,
  "error": "Already checked in",
  "data": {
    "checkedInAt": "2025-08-15T14:30:00.000Z"
  }
}
```

---

### GET /api/events/:id/segments

**Description:** Get event segments (schedule/agenda)

#### Success Response (200)

```json
{
  "success": true,
  "data": [
    {
      "id": "segment-id",
      "eventId": "event-id",
      "eventDetail": "Ceremony",
      "performedBy": "Officiant",
      "durationMinutes": 30,
      "startTime": "2025-08-15T14:00:00.000Z",
      "endTime": "2025-08-15T14:30:00.000Z",
      "order": 1,
      "notes": "Ring exchange at 14:15"
    }
  ]
}
```

---

### POST /api/events/:id/segments

**Description:** Add a segment to an event

#### Request Body

```json
{
  "eventDetail": "Ceremony",
  "performedBy": "Officiant",
  "durationMinutes": 30,
  "startTime": "2025-08-15T14:00:00.000Z",
  "order": 1,
  "notes": "Ring exchange at 14:15"
}
```

---

### GET /api/events/:id/vendors

**Description:** Get event vendors

#### Success Response (200)

```json
{
  "success": true,
  "data": [
    {
      "id": "vendor-id",
      "eventId": "event-id",
      "name": "Beautiful Flowers Co.",
      "serviceType": "Florist",
      "contactNumber": "+1-555-987-6543",
      "email": "contact@beautifulflowers.com",
      "website": "https://beautifulflowers.com",
      "totalAmount": 1500.0,
      "contractSigned": true
    }
  ]
}
```

---

### POST /api/events/:id/vendors

**Description:** Add a vendor to an event

#### Request Body

```json
{
  "name": "Beautiful Flowers Co.",
  "serviceType": "Florist",
  "contactNumber": "+1-555-987-6543",
  "email": "contact@beautifulflowers.com",
  "website": "https://beautifulflowers.com",
  "socialMedia": {
    "instagram": "@beautifulflowers",
    "facebook": "beautifulflowersco"
  },
  "notes": "Specializes in wedding bouquets",
  "totalAmount": 1500.0,
  "contractSigned": true
}
```

---

## 🔳 QR Code API

### POST /api/qr/generate

**Description:** Generate a single QR code

#### Request Body

```json
{
  "text": "https://example.com/event/123",
  "options": {
    "format": "png",
    "width": 256,
    "quality": 0.92,
    "margin": 1,
    "darkColor": "#000000",
    "lightColor": "#FFFFFF",
    "errorCorrectionLevel": "M"
  }
}
```

#### Field Validation Rules

| Field            | Type   | Required | Validation Rules    | Error Messages                                             |
| ---------------- | ------ | -------- | ------------------- | ---------------------------------------------------------- |
| `text`           | string | Yes      | 1-2048 characters   | "Text is required", "Text must not exceed 2048 characters" |
| `options.format` | string | No       | "png", "svg", "pdf" | -                                                          |
| `options.width`  | number | No       | 64-1024             | -                                                          |
| `options.margin` | number | No       | 0-10                | -                                                          |

#### Success Response (200)

```json
{
  "success": true,
  "data": {
    "qrCode": "data:image/png;base64,iVBORw0KGgoAAAA...",
    "text": "https://example.com/event/123",
    "format": "png",
    "options": {
      "width": 256,
      "margin": 1,
      "darkColor": "#000000",
      "lightColor": "#FFFFFF",
      "errorCorrectionLevel": "M"
    },
    "generatedAt": "2025-01-07T12:00:00.000Z"
  }
}
```

#### Error Responses

- **400:** Validation errors
- **500:** QR code generation failed

---

### POST /api/qr/batch

**Description:** Generate multiple QR codes

#### Request Body

```json
{
  "items": [
    {
      "id": "event-1",
      "text": "https://example.com/event/123"
    },
    {
      "id": "event-2",
      "text": "https://example.com/event/456"
    }
  ],
  "options": {
    "format": "png",
    "width": 256
  }
}
```

#### Field Validation Rules

| Field          | Type   | Required | Validation Rules    | Error Messages                                              |
| -------------- | ------ | -------- | ------------------- | ----------------------------------------------------------- |
| `items`        | array  | Yes      | 1-50 items          | "At least one item is required", "Maximum 50 items allowed" |
| `items[].text` | string | Yes      | 1-2048 characters   | -                                                           |
| `items[].id`   | string | No       | Optional identifier | -                                                           |

#### Success Response (200)

```json
{
  "success": true,
  "data": {
    "results": [
      {
        "id": "event-1",
        "text": "https://example.com/event/123",
        "qrCode": "data:image/png;base64,iVBORw0KGgoAAAA...",
        "success": true
      },
      {
        "id": "event-2",
        "text": "https://example.com/event/456",
        "qrCode": "data:image/png;base64,iVBORw0KGgoAAAA...",
        "success": true
      }
    ],
    "summary": {
      "total": 2,
      "successful": 2,
      "failed": 0
    },
    "options": {
      "width": 256,
      "margin": 1,
      "darkColor": "#000000",
      "lightColor": "#FFFFFF",
      "errorCorrectionLevel": "M"
    },
    "generatedAt": "2025-01-07T12:00:00.000Z"
  }
}
```

---

### GET /api/qr/formats

**Description:** Get supported QR code formats and options

#### Success Response (200)

```json
{
  "success": true,
  "data": {
    "formats": ["png", "svg", "pdf"],
    "errorCorrectionLevels": ["L", "M", "Q", "H"],
    "defaultOptions": {
      "format": "png",
      "width": 256,
      "quality": 0.92,
      "margin": 1,
      "darkColor": "#000000",
      "lightColor": "#FFFFFF",
      "errorCorrectionLevel": "M"
    },
    "limits": {
      "maxTextLength": 2048,
      "maxBatchSize": 50,
      "maxWidth": 1024,
      "minWidth": 64
    }
  }
}
```

---

### GET /api/qr/info

**Description:** Get information about QR code capacity for given text

#### Query Parameters

| Parameter | Type   | Required | Description     |
| --------- | ------ | -------- | --------------- |
| `text`    | string | Yes      | Text to analyze |

#### Example Request

```http
GET /api/qr/info?text=https://example.com/event/123
```

#### Success Response (200)

```json
{
  "success": true,
  "data": {
    "text": "https://example.com/event/123",
    "length": 31,
    "estimatedQRSize": 38,
    "recommendedErrorCorrection": "M",
    "supportedFormats": ["png", "svg", "pdf"],
    "maxCapacity": {
      "numeric": 7089,
      "alphanumeric": 4296,
      "binary": 2953,
      "kanji": 1817
    }
  }
}
```

#### Error Responses

- **400:** Missing text parameter
- **500:** Text analysis failed

---

## 🔧 System Endpoints

### GET /

**Description:** API documentation and endpoint listing

#### Success Response (200)

```json
{
  "message": "🎫 CodeGate Events & Ticketing API",
  "version": "1.0.0",
  "timestamp": "2025-01-07T12:00:00.000Z",
  "endpoints": {
    "POST /api/qr/generate": "Generate QR code from text",
    "POST /api/qr/batch": "Generate multiple QR codes",
    "GET /api/qr/formats": "Get supported formats",
    "GET /api/events": "Get all events",
    "POST /api/events": "Create new event",
    "POST /api/events/:id/tickets": "Purchase event tickets",
    "POST /api/events/checkin": "Check-in with QR code",
    "GET /health": "Health check"
  }
}
```

---

### GET /health

**Description:** Health check endpoint

#### Success Response (200)

```json
{
  "status": "OK",
  "uptime": 123456.789,
  "memory": {
    "rss": 45678912,
    "heapTotal": 34567890,
    "heapUsed": 23456789,
    "external": 1234567
  },
  "timestamp": "2025-01-07T12:00:00.000Z"
}
```

---

### 404 Handler

**Description:** Handles requests to non-existent endpoints

#### Error Response (404)

```json
{
  "error": "Route not found",
  "path": "/api/nonexistent",
  "method": "GET"
}
```

---

## 📊 Data Types

### Event Categories

```typescript
type EventCategory =
  | "WEDDING"
  | "RECEPTION"
  | "ENGAGEMENT_PARTY"
  | "BIRTHDAY_PARTY"
  | "ANNIVERSARY"
  | "BABY_SHOWER"
  | "BRIDAL_SHOWER"
  | "GRADUATION"
  | "HOLIDAY_PARTY"
  | "CORPORATE_EVENT"
  | "BUSINESS_MEETING";
```

### Ticket Types

```typescript
type TicketType =
  | "GUEST"
  | "PLUS_ONE"
  | "FAMILY"
  | "CHILD"
  | "VIP"
  | "VENDOR"
  | "STAFF";
```

### Event Location

```typescript
interface EventLocation {
  venue: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}
```

---

## 💡 Frontend Integration Tips

### Error Handling Best Practices

1. **Always check the `success` field** in responses
2. **Display validation errors** from the `details` array for form fields
3. **Show generic error messages** from the `error` field for non-validation errors
4. **Handle rate limiting** by showing retry times from `retryAfter`

### Example Frontend Error Handler

```javascript
async function apiRequest(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 400 && data.details) {
        // Handle validation errors
        throw new ValidationError(data.details);
      } else if (response.status === 429) {
        // Handle rate limiting
        throw new RateLimitError(data.retryAfter);
      } else {
        // Handle other errors
        throw new ApiError(data.error || "Unknown error", response.status);
      }
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      // Network error
      throw new NetworkError("Failed to connect to server");
    }
    throw error;
  }
}
```

### Validation Error Display

```javascript
function displayValidationErrors(errors) {
  errors.forEach((error) => {
    const field = document.querySelector(`[name="${error.field}"]`);
    if (field) {
      showFieldError(field, error.message);
    }
  });
}
```

This API contract provides comprehensive documentation for integrating with the CodeGate Events & Ticketing API, including all validation rules, error messages, and best practices for frontend development.

# 🎫 CodeGate Events & Ticketing API

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)

**A complete events and ticketing system with QR code integration**

**✅ 61 Tests Passing** | **🚀 Production Ready** | **📱 QR Code Integration**

</div>

---

## 📖 What is CodeGate?

CodeGate is a **free-to-use events and ticketing API** designed for hosts to create events and guests to join seamlessly. Perfect for:

- **💒 Weddings & Receptions** - Manage guest lists, RSVPs, and check-ins
- **🎉 Private Parties** - Birthday parties, anniversaries, graduations
- **🏢 Corporate Events** - Meetings, conferences, team building
- **🎪 Social Gatherings** - Reunions, networking events, holiday parties

### 🎯 **How It Works:**

1. **🏠 Host Creates Event** - No registration needed, just provide basic info
2. **🎫 Generate QR Tickets** - Automatic QR code generation for each ticket
3. **👥 Guests Purchase Tickets** - Simple form with name, email, phone
4. **📱 QR Check-in** - Scan QR codes at the event for instant check-in
5. **📊 Track Attendance** - Real-time attendance tracking and analytics

### 💡 **Key Benefits:**

- ✅ **No Authentication Required** - Jump straight into creating events
- ✅ **Free to Use** - No subscription or payment processing needed
- ✅ **QR Code Integration** - Built-in QR generation and validation
- ✅ **Mobile Friendly** - Perfect for event check-in apps
- ✅ **Type Safe** - Full TypeScript support with comprehensive models

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
- **PostgreSQL** database
- **npm** or **yarn**

### Installation

```bash
# Clone and install dependencies
git clone https://github.com/blaze308/codegate-backend.git
cd codegate-backend
npm install

# Set up environment variables
cp env.example .env
# Edit .env with your database credentials

# Set up the database
npx prisma migrate deploy
npx prisma generate

# Start the development server
npm run dev
```

**🌐 Server runs at:** `http://localhost:3000`

---

## 🎯 Complete API Documentation

### **Base URL:** `http://localhost:3000`

---

## 🎉 Events Management

### **GET /api/events** - List All Events

**Query Parameters:**

- `category` - Filter by event category
- `status` - Filter by event status
- `city` - Filter by city
- `search` - Search in title/description
- `startDate` - Filter events from date (ISO format)
- `endDate` - Filter events to date (ISO format)
- `minPrice` - Minimum ticket price
- `maxPrice` - Maximum ticket price
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)

**Example Request:**

```http
GET /api/events?category=WEDDING&city=New York&page=1&limit=5
```

**Response:**

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
        "eventDate": "2024-08-15T14:00:00.000Z",
        "startTime": "2:00 PM",
        "endTime": "11:00 PM",
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
        "hostName": "Sarah & Mike",
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

---

### **POST /api/events** - Create New Event

**Request Body:**

```json
{
  "title": "Beautiful Wedding Celebration",
  "description": "Join us for our special day filled with love and joy",
  "category": "WEDDING",
  "eventDate": "2024-08-15T14:00:00.000Z",
  "startTime": "2:00 PM",
  "endTime": "11:00 PM",
  "capacity": 150,
  "ticketPrice": 75.0,
  "currency": "USD",
  "location": {
    "venue": "Grand Ballroom Hotel",
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
  "coupleName": "John & Jane Smith",
  "hostName": "Smith Family",
  "dressCode": "Black Tie Optional",
  "specialInstructions": "Please arrive 30 minutes early",
  "giftRegistry": "https://registry.example.com/john-jane",
  "rsvpDeadline": "2024-07-15T23:59:59.000Z",
  "isPlusOneAllowed": true,
  "mealPreferences": ["Vegetarian", "Gluten-Free", "Regular"],
  "tags": ["wedding", "celebration", "formal"],
  "images": ["https://example.com/venue1.jpg"]
}
```

**Required Fields:**

- `title` (string, 1-255 chars)
- `description` (string, 1-2000 chars)
- `category` (enum: see categories below)
- `eventDate` (ISO date, must be future)
- `startTime` (string)
- `capacity` (number, 1-10000)
- `ticketPrice` (number, >= 0)
- `location.venue` (string)
- `location.address` (string)
- `location.city` (string)
- `location.state` (string)
- `location.country` (string)
- `location.zipCode` (string)

**Event Categories:**
`WEDDING`, `RECEPTION`, `ENGAGEMENT_PARTY`, `BIRTHDAY_PARTY`, `ANNIVERSARY`, `BABY_SHOWER`, `BRIDAL_SHOWER`, `GRADUATION`, `HOLIDAY_PARTY`, `CORPORATE_EVENT`, `BUSINESS_MEETING`, `CONFERENCE`, `SEMINAR`, `WORKSHOP`, `NETWORKING`, `PRODUCT_LAUNCH`, `TEAM_BUILDING`, `COMPANY_RETREAT`, `BOARD_MEETING`, `TRAINING_SESSION`, `REUNION`, `OTHER`

**Response:**

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

---

### **GET /api/events/:id** - Get Event Details

**Example Request:**

```http
GET /api/events/123e4567-e89b-12d3-a456-426614174000
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "title": "Beautiful Wedding Celebration",
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

---

## 🎫 Ticket Management

### **POST /api/events/:id/tickets** - Purchase Tickets

**Request Body:**

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

**Ticket Types:**

- `GUEST` - Regular event attendee
- `PLUS_ONE` - Guest's plus-one
- `FAMILY` - Family member
- `CHILD` - Child attendee
- `VIP` - VIP guest
- `VENDOR` - Event vendor/supplier
- `STAFF` - Event staff member

**Validation Rules:**

- `ticketType` - Must be valid enum value
- `quantity` - Integer, 1-10
- `user.name` - Required string
- `user.email` - Required, valid email format
- `user.phone` - Optional string

**Response:**

```json
{
  "success": true,
  "data": {
    "tickets": [
      {
        "id": "ticket-123",
        "qrCode": "data:image/png;base64,iVBORw0KGgoAAAA...",
        "ticketType": "GUEST",
        "price": 75.0,
        "status": "ACTIVE",
        "purchasedAt": "2024-01-15T10:30:00.000Z",
        "validUntil": "2024-08-15T14:00:00.000Z",
        "eventId": "event-123",
        "userId": "user-123"
      }
    ],
    "event": {
      "id": "event-123",
      "title": "Beautiful Wedding Celebration"
    },
    "user": {
      "id": "user-123",
      "name": "Alice Johnson",
      "email": "alice.johnson@example.com"
    }
  }
}
```

**Error Responses:**

- `404` - Event not found
- `400` - Event sold out
- `400` - Validation errors

---

### **POST /api/events/checkin** - QR Code Check-in

**Request Body:**

```json
{
  "qrCode": "data:image/png;base64,iVBORw0KGgoAAAA...",
  "eventId": "123e4567-e89b-12d3-a456-426614174000",
  "staffId": "staff-user-id"
}
```

**Required Fields:**

- `qrCode` - QR code data from ticket
- `eventId` - Optional, for validation
- `staffId` - Optional, defaults to system staff

**Response (Success):**

```json
{
  "success": true,
  "data": {
    "checkIn": {
      "id": "checkin-123",
      "qrCode": "data:image/png;base64,iVBORw0KGgoAAAA...",
      "checkedInAt": "2024-08-15T13:45:00.000Z",
      "eventId": "event-123",
      "ticketId": "ticket-123",
      "checkedInBy": "staff-123"
    },
    "ticket": {
      "id": "ticket-123",
      "ticketType": "GUEST"
    },
    "event": {
      "id": "event-123",
      "title": "Beautiful Wedding Celebration"
    },
    "user": {
      "id": "user-123",
      "name": "Alice Johnson",
      "email": "alice.johnson@example.com"
    }
  }
}
```

**Error Responses:**

- `404` - Invalid QR code
- `400` - QR code doesn't match event
- `400` - Ticket expired
- `400` - Already checked in

---

## 📱 QR Code Generation

### **POST /api/qr/generate** - Generate Single QR Code

**Request Body:**

```json
{
  "text": "Hello World",
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

**Options:**

- `format` - "png", "svg", "pdf" (default: "png")
- `width` - 64-1024 pixels (default: 256)
- `quality` - 0.1-1.0 (default: 0.92)
- `margin` - 0-10 (default: 1)
- `darkColor` - Hex color (default: "#000000")
- `lightColor` - Hex color (default: "#FFFFFF")
- `errorCorrectionLevel` - "L", "M", "Q", "H" (default: "M")

**Response:**

```json
{
  "success": true,
  "data": {
    "qrCode": "data:image/png;base64,iVBORw0KGgoAAAA...",
    "text": "Hello World",
    "format": "png",
    "options": {
      "width": 256,
      "margin": 1,
      "darkColor": "#000000",
      "lightColor": "#FFFFFF",
      "errorCorrectionLevel": "M"
    },
    "generatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### **POST /api/qr/batch** - Generate Multiple QR Codes

**Request Body:**

```json
{
  "items": [
    { "id": "qr1", "text": "Guest 1" },
    { "id": "qr2", "text": "Guest 2" },
    { "id": "qr3", "text": "Guest 3" }
  ],
  "options": {
    "width": 256,
    "format": "png"
  }
}
```

**Limits:**

- Maximum 50 items per batch
- Maximum 2048 characters per text

**Response:**

```json
{
  "success": true,
  "data": {
    "results": [
      {
        "id": "qr1",
        "text": "Guest 1",
        "qrCode": "data:image/png;base64,iVBORw0KGgoAAAA...",
        "success": true
      },
      {
        "id": "qr2",
        "text": "Guest 2",
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
      "format": "png"
    },
    "generatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

---

### **GET /api/qr/formats** - Get Supported Formats

**Response:**

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

### **GET /api/qr/info** - Get QR Code Info

**Query Parameters:**

- `text` - Text to analyze

**Example:**

```http
GET /api/qr/info?text=Hello%20World
```

**Response:**

```json
{
  "success": true,
  "data": {
    "text": "Hello World",
    "length": 11,
    "estimatedQRSize": 14,
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

---

## 🔧 Error Responses

All endpoints return errors in this format:

```json
{
  "success": false,
  "error": "Error message",
  "message": "Detailed error description",
  "details": [
    {
      "field": "fieldName",
      "message": "Field-specific error message"
    }
  ]
}
```

**HTTP Status Codes:**

- `200` - Success
- `201` - Created (POST requests)
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

---

## 🧪 Testing

Run the comprehensive test suite:

```bash
# Run all tests
npm test

# Run specific test file
npm test -- events.test.ts

# Run with coverage
npm run test:coverage
```

**✅ Current Status: 61 tests passing**

---

## 🚀 Deployment

```bash
# Build for production
npm run build

# Set environment variables
export DATABASE_URL="your-production-db-url"
export PORT=3000

# Run database migrations
npx prisma migrate deploy

# Start production server
npm start
```

---

## 📞 Support & Contact

- 📧 **Email**: jaimepinkrah@gmail.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/blaze308/codegate-backend/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/blaze308/codegate-backend/discussions)

---

<div align="center">

**Built with ❤️ for the events community**

⭐ **Star this repo if you found it helpful!** ⭐

</div>

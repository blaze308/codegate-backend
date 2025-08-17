# 🎫 CodeGate Events & Ticketing API

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-323330?style=for-the-badge&logo=Jest&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Flutter](https://img.shields.io/badge/Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white)

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

## 📱 Recommended User Flows

### 🏠 **Host Flow** - Create and Manage Events

```
1. Initial Screen → Select "I'm a Host"
2. Create Event Form → Fill event details (POST /api/events)
3. Event Created → Display success + event QR code
4. Share QR Code → Print/send event QR to guests
5. Event Management → View tickets, check-ins, analytics
```

**Host Features:**

- ✅ Create events with all details
- ✅ Generate shareable event QR codes
- ✅ View guest list and check-in status
- ✅ Manage event segments and vendors
- ✅ Real-time attendance tracking

### 👥 **Guest Flow** - Discover and Join Events

```
1. Initial Screen → Select "I'm a Guest"
2. Scan QR Code → Camera scans event QR code
3. Event Brochure → Beautiful event details page
4. Register for Event → Fill guest info + purchase ticket
5. Get Ticket QR → Receive ticket with QR code for check-in
6. Event Day → Scan ticket QR at venue entrance
```

**Guest Features:**

- ✅ Scan event QR codes to discover events
- ✅ View beautiful event details (event brochure)
- ✅ Easy registration with just name/email/phone
- ✅ Receive ticket QR codes instantly
- ✅ Quick check-in at event entrance

### 📱 **Event Brochure** - Public Event Details

**Endpoint:** `GET /api/events/:id` _(serves as event brochure)_

When guests scan the event QR code, they see:

- 🎉 **Event Title & Description**
- 📅 **Date, Time & Location**
- 🏠 **Host Information**
- 🎫 **Ticket Price & Availability**
- 👔 **Dress Code & Special Instructions**
- 🍽️ **Meal Options & Dietary Preferences**
- 🎁 **Gift Registry Links** (for weddings)
- ✨ **Event Photos & Gallery**

### 🔄 **Complete Event Lifecycle**

```
HOST CREATES EVENT → GENERATES QR → SHARES WITH GUESTS
                                         ↓
GUESTS SCAN QR → VIEW EVENT BROCHURE → REGISTER & GET TICKETS
                                         ↓
EVENT DAY → GUESTS SCAN TICKET QR → AUTOMATIC CHECK-IN → PARTY! 🎉
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+
- **Database** - PostgreSQL database (can use Render PostgreSQL, Railway, or any PostgreSQL provider)
- **npm** or **yarn**

### Installation

```bash
# Clone and install dependencies
git clone https://github.com/blaze308/codegate-backend.git
cd codegate-backend
npm install

# Set up environment variables
# Create .env file with your PostgreSQL database URL
cp env.example .env
# Edit .env with your actual database credentials

# Example .env content:
# DATABASE_URL="postgresql://username:password@localhost:5432/codegate_db"
# NODE_ENV=development
# PORT=3000

# Set up the database
npx prisma migrate deploy
npx prisma generate

# Start the development server
npm run dev
```

**🌐 Server runs at:** `http://localhost:3000`

---

## 🛠️ Tech Stack & Tools

### Backend & API

- **⚡ Runtime**: Node.js 18+ with TypeScript
- **🚀 Framework**: Express.js for REST API
- **🗄️ Database**: PostgreSQL with Prisma ORM
- **🔄 ORM**: Prisma - Type-safe database client
- **🔐 Authentication**: JWT (JSON Web Tokens)
- **📱 QR Codes**: qrcode library for generation
- **🛡️ Security**: Helmet.js + CORS + Rate Limiting
- **✅ Testing**: Jest with Supertest
- **📝 Validation**: Joi schema validation

### Frontend (Planned)

- **⚛️ Web App**: React.js with TypeScript
- **📱 Mobile App**: Flutter for iOS & Android

### Development & Deployment

- **🧪 Testing**: Jest + TypeScript
- **📦 Package Manager**: npm
- **🔄 Development**: tsx for hot reloading
- **🚀 Deployment**: Render with PostgreSQL
- **📝 Code Quality**: ESLint + TypeScript strict mode

### Key Libraries Used

```json
{
  "production": {
    "express": "REST API framework",
    "prisma": "Database ORM with type safety",
    "qrcode": "QR code generation (no canvas/sharp needed)",
    "jsonwebtoken": "JWT authentication",
    "helmet": "Security headers",
    "cors": "Cross-origin resource sharing",
    "express-rate-limit": "API rate limiting",
    "joi": "Request validation",
    "bcryptjs": "Password hashing",
    "uuid": "Unique ID generation"
  },
  "development": {
    "typescript": "Type safety",
    "tsx": "TypeScript execution",
    "jest": "Testing framework",
    "@types/*": "TypeScript definitions"
  }
}
```

**Note**: This project does NOT use canvas, sharp, or heavy image processing libraries. QR codes are generated as lightweight data URLs or SVG.

---

## 🎫 Event QR Code Format

For the **event QR codes** that guests scan, we recommend encoding the event URL:

```
https://your-frontend-domain.com/events/{EVENT_ID}
```

Or for API-direct scanning:

```
event:{EVENT_ID}
```

**Example QR Content:**

```
event:123e4567-e89b-12d3-a456-426614174000
```

When scanned, this triggers a call to `GET /api/events/123e4567-e89b-12d3-a456-426614174000` to show the event brochure.

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

## 🚀 Deploy to Render

### Option 1: One-Click Deploy

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/blaze308/codegate-backend)

### Option 2: Manual Deployment

#### Prerequisites

1. **Render Account** - Sign up at [render.com](https://render.com)
2. **PostgreSQL Database** - Create a PostgreSQL instance on Render
3. **GitHub Repository** - Fork or clone this repository

#### Step-by-Step Deployment

1. **Create PostgreSQL Database**

   ```bash
   # In Render Dashboard:
   # 1. Click "New +" → "PostgreSQL"
   # 2. Set database name: codegate-db
   # 3. Choose region: Oregon (recommended)
   # 4. Select plan: Free (for development)
   # 5. Note down the Internal Database URL
   ```

2. **Deploy Web Service**

   ```bash
   # In Render Dashboard:
   # 1. Click "New +" → "Web Service"
   # 2. Connect your GitHub repository
   # 3. Configure settings:
   #    - Name: codegate-backend-api
   #    - Region: Oregon (same as database)
   #    - Build Command: npm ci && npm run build
   #    - Start Command: npm start
   ```

3. **Environment Variables**

   Set these in your Render service dashboard:

   ```bash
   NODE_ENV=production
   PORT=3000
   TRUST_PROXY=true
   ALLOWED_ORIGINS=https://your-frontend-domain.com
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   JWT_SECRET=your_super_secure_jwt_secret_here
   JWT_EXPIRES_IN=7d

   # DATABASE_URL - Use the Internal Database URL from your PostgreSQL instance
   DATABASE_URL=postgresql://username:password@host:port/database_name
   ```

4. **Connect Database**

   ```bash
   # Option 1: Manual Connection
   # Copy the Internal Database URL from your PostgreSQL service
   # Add it as DATABASE_URL environment variable in your web service

   # Option 2: Automatic Connection (Recommended)
   # In your web service settings:
   # 1. Go to "Environment" tab
   # 2. Click "Add Environment Variable"
   # 3. Select your PostgreSQL database from dropdown
   # 4. DATABASE_URL will be automatically added and managed
   ```

5. **Custom Domain (Optional)**
   ```bash
   # In service settings:
   # 1. Go to "Settings" tab
   # 2. Add custom domain: api.your-domain.com
   # 3. Configure DNS CNAME record
   ```

#### Infrastructure as Code

Use the included `render.yaml` for automated deployments:

```yaml
# render.yaml is already configured in this repository
# Simply connect your repo to Render and it will use this config
```

#### Production Checklist

- ✅ **Database Connected** - PostgreSQL instance linked
- ✅ **Environment Variables** - All required vars set
- ✅ **Migrations Applied** - Database schema updated
- ✅ **Custom Domain** - Optional but recommended
- ✅ **SSL Certificate** - Automatically provided by Render
- ✅ **Health Checks** - Available at `/health` endpoint
- ✅ **Auto-Deploy** - Connected to GitHub branch

#### Environment Variables Reference

| Variable                  | Required | Default     | Description                             |
| ------------------------- | -------- | ----------- | --------------------------------------- |
| `DATABASE_URL`            | ✅       | -           | PostgreSQL connection string            |
| `NODE_ENV`                | ✅       | development | Environment (production/development)    |
| `PORT`                    | ✅       | 3000        | Server port                             |
| `TRUST_PROXY`             | ⚠️       | false       | Set to `true` for production            |
| `ALLOWED_ORIGINS`         | ⚠️       | localhost   | Comma-separated list of allowed origins |
| `RATE_LIMIT_WINDOW_MS`    | ❌       | 900000      | Rate limit window (15 minutes)          |
| `RATE_LIMIT_MAX_REQUESTS` | ❌       | 100         | Max requests per window                 |
| `JWT_SECRET`              | ❌       | -           | JWT signing secret (for future auth)    |
| `JWT_EXPIRES_IN`          | ❌       | 7d          | JWT expiration time                     |

**Legend:** ✅ Required | ⚠️ Required in Production | ❌ Optional

#### Troubleshooting Common Issues

**🔧 Database Connection Error (P1001)**

If you see: `Error: P1001: Can't reach database server`

1. **Check Database URL Format:**

   ```bash
   # Correct format for Render PostgreSQL:
   DATABASE_URL=postgresql://username:password@host:port/database_name

   # Example:
   DATABASE_URL=postgresql://codegate_user:password@dpg-abc123-a.oregon-postgres.render.com:5432/codegate_db
   ```

2. **Use Internal Database URL:**

   - In Render Dashboard → PostgreSQL service → Info tab
   - Copy the **Internal Database URL** (not External)
   - Internal URLs work within Render's network

3. **Verify Environment Variables:**

   ```bash
   # In your web service:
   # Environment tab → Check DATABASE_URL is set correctly
   ```

4. **Check Database Status:**
   - Ensure PostgreSQL service is "Available"
   - Database and web service should be in same region

**🔧 Migration Errors**

If migrations fail during deployment:

1. **Manual Migration:**

   ```bash
   # Connect to your service shell
   render shell --service=codegate-backend-api
   npm run db:migrate
   ```

2. **Reset Database (Development only):**
   ```bash
   npm run db:reset
   ```

#### Monitoring & Maintenance

```bash
# View logs
render logs --service=codegate-backend-api

# Check service status
render status --service=codegate-backend-api

# Run database migrations manually (if needed)
render shell --service=codegate-backend-api
npm run db:migrate

# Check database connection
render shell --service=codegate-backend-api
npx prisma db pull
```

**🌐 Your API will be available at:** `https://your-service-name.onrender.com`

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

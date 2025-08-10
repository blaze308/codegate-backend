// ===================================================================
// CODEGATE FRONTEND MODELS - REACT/TYPESCRIPT
// ===================================================================
// Generated for CodeGate Events & Ticketing API
// Compatible with backend API endpoints
// ===================================================================

// ===================================================================
// ENUMS
// ===================================================================

export enum EventCategory {
  WEDDING = "WEDDING",
  RECEPTION = "RECEPTION",
  ENGAGEMENT_PARTY = "ENGAGEMENT_PARTY",
  BIRTHDAY_PARTY = "BIRTHDAY_PARTY",
  ANNIVERSARY = "ANNIVERSARY",
  BABY_SHOWER = "BABY_SHOWER",
  BRIDAL_SHOWER = "BRIDAL_SHOWER",
  GRADUATION = "GRADUATION",
  HOLIDAY_PARTY = "HOLIDAY_PARTY",
  CORPORATE_EVENT = "CORPORATE_EVENT",
  BUSINESS_MEETING = "BUSINESS_MEETING",
  CONFERENCE = "CONFERENCE",
  SEMINAR = "SEMINAR",
  WORKSHOP = "WORKSHOP",
  NETWORKING = "NETWORKING",
  PRODUCT_LAUNCH = "PRODUCT_LAUNCH",
  TEAM_BUILDING = "TEAM_BUILDING",
  COMPANY_RETREAT = "COMPANY_RETREAT",
  BOARD_MEETING = "BOARD_MEETING",
  TRAINING_SESSION = "TRAINING_SESSION",
  REUNION = "REUNION",
  OTHER = "OTHER",
}

export enum EventStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  ACTIVE = "ACTIVE",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
  POSTPONED = "POSTPONED",
}

export enum TicketType {
  GUEST = "GUEST",
  PLUS_ONE = "PLUS_ONE",
  FAMILY = "FAMILY",
  CHILD = "CHILD",
  VIP = "VIP",
  VENDOR = "VENDOR",
  STAFF = "STAFF",
}

export enum TicketStatus {
  ACTIVE = "ACTIVE",
  USED = "USED",
  EXPIRED = "EXPIRED",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED",
}

export enum VendorStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
}

export enum VendorPaymentStatus {
  PENDING = "PENDING",
  PARTIAL = "PARTIAL",
  PAID = "PAID",
  OVERDUE = "OVERDUE",
  REFUNDED = "REFUNDED",
}

export enum RSVPStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED",
  MAYBE = "MAYBE",
}

export enum UserRole {
  HOST = "HOST",
  GUEST = "GUEST",
}

export enum NotificationType {
  EVENT_CREATED = "EVENT_CREATED",
  EVENT_UPDATED = "EVENT_UPDATED",
  EVENT_CANCELLED = "EVENT_CANCELLED",
  TICKET_PURCHASED = "TICKET_PURCHASED",
  CHECK_IN_SUCCESS = "CHECK_IN_SUCCESS",
  RSVP_REMINDER = "RSVP_REMINDER",
  EVENT_REMINDER = "EVENT_REMINDER",
}

// ===================================================================
// CORE INTERFACES
// ===================================================================

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface UserWithRelations extends User {
  hostedEvents?: Event[];
  tickets?: Ticket[];
  guestAttendances?: Guest[];
  checkIns?: CheckIn[];
}

export interface Host extends User {
  hostedEvents: Event[];
  totalEventsHosted: number;
  activeEventsCount: number;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface EventLocation {
  venue: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  coordinates?: Coordinates;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  category: EventCategory;
  eventDate: string | Date;
  startTime: string;
  endTime?: string;
  capacity: number;
  currentAttendees: number;
  ticketPrice: number;
  currency: string;
  hostId: string; // organizerId for backwards compatibility
  status: EventStatus;
  qrCode?: string;
  images: string[];
  tags: string[];
  createdAt: string | Date;
  updatedAt: string | Date;

  // Wedding/Party specific fields
  coupleName?: string;
  hostName?: string;
  dressCode?: string;
  specialInstructions?: string;
  giftRegistry?: string;
  rsvpDeadline?: string | Date;
  isPlusOneAllowed: boolean;
  mealPreferences: string[];

  // Location fields (flattened for API compatibility)
  venue: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  latitude?: number;
  longitude?: number;

  // Relations (optional for API responses)
  organizer?: Pick<User, "id" | "name" | "email">;
  tickets?: Ticket[];
  _count?: {
    tickets: number;
    attendees: number;
    checkIns: number;
  };
}

export interface Ticket {
  id: string;
  qrCode: string;
  ticketType: TicketType;
  price: number;
  status: TicketStatus;
  purchasedAt: string | Date;
  validUntil: string | Date;
  eventId: string;
  userId: string;

  // Relations (optional for API responses)
  event?: Event;
  user?: User;
  attendee?: Guest;
  checkIns?: CheckIn[];
}

export interface Guest {
  id: string;
  checkedIn: boolean;
  checkedInAt?: string | Date;
  registeredAt: string | Date;
  mealPreference?: string;
  hasPlusOne: boolean;
  plusOneName?: string;
  specialNeeds?: string;
  tableNumber?: number;
  rsvpStatus: RSVPStatus;
  eventId: string;
  userId: string;
  ticketId: string;

  // Relations (optional for API responses)
  event?: Event;
  user?: User;
  ticket?: Ticket;
}

// Backwards compatibility
export interface Attendee extends Guest {}

export interface CheckIn {
  id: string;
  qrCode: string;
  checkedInAt: string | Date;
  location?: string;
  eventId: string;
  ticketId: string;
  checkedInBy: string;

  // Relations (optional for API responses)
  event?: Event;
  ticket?: Ticket;
  staff?: User;
}

export interface Vendor {
  id: string;
  name: string;
  serviceType: string;
  contactNumber?: string;
  email?: string;
  website?: string;
  socialMedia?: any;
  notes?: string;
  status: VendorStatus;
  paymentStatus: VendorPaymentStatus;
  contractSigned: boolean;
  totalAmount?: number;
  paidAmount: number;
  createdAt: string | Date;
  updatedAt: string | Date;
  eventId: string;

  // Relations (optional for API responses)
  event?: Event;
}

export interface EventSegment {
  id: string;
  eventDetail: string;
  performedBy: string;
  durationMinutes: number;
  startTime: string | Date;
  endTime: string | Date;
  order: number;
  notes?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  eventId: string;

  // Relations (optional for API responses)
  event?: Event;
}

// ===================================================================
// REQUEST MODELS
// ===================================================================

export interface CreateEventRequest {
  title: string;
  description: string;
  category: EventCategory;
  eventDate: string;
  startTime: string;
  endTime?: string;
  capacity: number;
  ticketPrice: number;
  currency?: string;
  location: EventLocation;
  coupleName?: string;
  hostName?: string;
  dressCode?: string;
  specialInstructions?: string;
  giftRegistry?: string;
  rsvpDeadline?: string;
  isPlusOneAllowed?: boolean;
  mealPreferences?: string[];
  tags?: string[];
  images?: string[];
}

export interface UpdateEventRequest extends Partial<CreateEventRequest> {
  status?: EventStatus;
}

export interface UserInfo {
  name: string;
  email: string;
  phone?: string;
}

export interface TicketPurchaseRequest {
  ticketType: TicketType;
  quantity: number;
  user: UserInfo;
}

export interface CheckInRequest {
  qrCode: string;
  eventId?: string;
  staffId?: string;
}

export interface QRCodeOptions {
  format?: "png" | "svg" | "pdf";
  width?: number;
  quality?: number;
  margin?: number;
  darkColor?: string;
  lightColor?: string;
  errorCorrectionLevel?: "L" | "M" | "Q" | "H";
}

export interface QRGenerateRequest {
  text: string;
  options?: QRCodeOptions;
}

export interface BatchQRItem {
  id?: string;
  text: string;
}

export interface BatchQRRequest {
  items: BatchQRItem[];
  options?: QRCodeOptions;
}

export interface CreateGuestRequest {
  eventId: string;
  userId: string;
  ticketId: string;
  mealPreference?: string;
  hasPlusOne?: boolean;
  plusOneName?: string;
  specialNeeds?: string;
  tableNumber?: number;
}

export interface UpdateGuestRequest {
  mealPreference?: string;
  hasPlusOne?: boolean;
  plusOneName?: string;
  specialNeeds?: string;
  tableNumber?: number;
  rsvpStatus?: RSVPStatus;
}

export interface RSVPRequest {
  guestId: string;
  rsvpStatus: RSVPStatus;
  mealPreference?: string;
  hasPlusOne?: boolean;
  plusOneName?: string;
  specialNeeds?: string;
}

// ===================================================================
// RESPONSE MODELS
// ===================================================================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp?: string | Date;
}

export interface PaginatedResponse<T = any> {
  success: boolean;
  data?: {
    events?: T[];
    tickets?: T[];
    items?: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  error?: string;
  message?: string;
}

export interface EventResponse extends ApiResponse<Event> {}

export interface EventListResponse extends PaginatedResponse<Event> {}

export interface TicketResponse
  extends ApiResponse<{
    tickets: Ticket[];
    event: Pick<Event, "id" | "title">;
    user: Pick<User, "id" | "name" | "email">;
  }> {}

export interface CheckInResponse
  extends ApiResponse<{
    checkIn: CheckIn;
    ticket: Pick<Ticket, "id" | "ticketType">;
    event: Pick<Event, "id" | "title">;
    user: Pick<User, "id" | "name" | "email">;
  }> {}

export interface QRResponse
  extends ApiResponse<{
    qrCode: string;
    text: string;
    format: string;
    options: QRCodeOptions;
    generatedAt: string;
  }> {}

export interface BatchQRResponse
  extends ApiResponse<{
    results: Array<{
      id: string;
      text: string;
      qrCode: string | null;
      success: boolean;
      error?: string;
    }>;
    summary: {
      total: number;
      successful: number;
      failed: number;
    };
    options: QRCodeOptions;
    generatedAt: string;
  }> {}

// ===================================================================
// FILTER & PAGINATION MODELS
// ===================================================================

export interface PaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface EventFilters extends PaginationOptions {
  category?: EventCategory;
  status?: EventStatus;
  city?: string;
  search?: string;
  startDate?: string | Date;
  endDate?: string | Date;
  minPrice?: number;
  maxPrice?: number;
}

export interface TicketFilters extends PaginationOptions {
  eventId?: string;
  userId?: string;
  ticketType?: TicketType;
  status?: TicketStatus;
  dateFrom?: string | Date;
  dateTo?: string | Date;
  priceMin?: number;
  priceMax?: number;
  search?: string;
}

export interface GuestFilters extends PaginationOptions {
  eventId?: string;
  userId?: string;
  checkedIn?: boolean;
  rsvpStatus?: RSVPStatus;
  hasPlusOne?: boolean;
  mealPreference?: string;
  tableNumber?: number;
  search?: string;
  dateFrom?: string | Date;
  dateTo?: string | Date;
}

// ===================================================================
// STATISTICS & ANALYTICS
// ===================================================================

export interface EventStats {
  totalEvents: number;
  activeEvents: number;
  completedEvents: number;
  totalAttendees: number;
  totalRevenue: number;
  averageAttendance: number;
  categoryBreakdown: Record<EventCategory, number>;
  monthlyTrends: Array<{
    month: string;
    events: number;
    attendance: number;
    revenue: number;
  }>;
}

export interface TicketStats {
  totalTickets: number;
  activeTickets: number;
  usedTickets: number;
  expiredTickets: number;
  cancelledTickets: number;
  refundedTickets: number;
  totalRevenue: number;
  averagePrice: number;
}

export interface GuestStats {
  totalGuests: number;
  checkedInCount: number;
  pendingRSVP: number;
  acceptedRSVP: number;
  declinedRSVP: number;
  maybeRSVP: number;
  withPlusOne: number;
  specialNeedsCount: number;
  mealPreferences: Record<string, number>;
  checkInRate: number;
}

export interface CheckInStats {
  totalCheckIns: number;
  uniqueAttendees: number;
  checkInRate: number;
  averageCheckInTime?: string;
  peakCheckInTime?: string;
  checkInsByHour: Record<string, number>;
  checkInsByLocation: Record<string, number>;
  recentCheckIns: CheckIn[];
}

// ===================================================================
// ERROR HANDLING
// ===================================================================

export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: ValidationError[];
  timestamp: string | Date;
}

// ===================================================================
// UTILITY TYPES
// ===================================================================

export interface FileUpload {
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  url: string;
  uploadedAt: string | Date;
}

export interface ImageUpload extends FileUpload {
  width?: number;
  height?: number;
  thumbnailUrl?: string;
}

export interface SimpleNotification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string | Date;
}

// ===================================================================
// FRONTEND-SPECIFIC TYPES
// ===================================================================

export interface FormState<T> {
  data: T;
  loading: boolean;
  error?: string;
  touched: Record<keyof T, boolean>;
  errors: Record<keyof T, string>;
}

export interface AsyncState<T> {
  data?: T;
  loading: boolean;
  error?: string;
  lastFetch?: Date;
}

export interface EventFormData
  extends Omit<CreateEventRequest, "eventDate" | "rsvpDeadline"> {
  eventDate: Date;
  rsvpDeadline?: Date;
}

export interface QRScanResult {
  type: "event" | "ticket";
  id: string;
  data: string;
  timestamp: Date;
}

// ===================================================================
// DISPLAY HELPERS
// ===================================================================

export const EventCategoryLabels: Record<EventCategory, string> = {
  [EventCategory.WEDDING]: "Wedding",
  [EventCategory.RECEPTION]: "Reception",
  [EventCategory.ENGAGEMENT_PARTY]: "Engagement Party",
  [EventCategory.BIRTHDAY_PARTY]: "Birthday Party",
  [EventCategory.ANNIVERSARY]: "Anniversary",
  [EventCategory.BABY_SHOWER]: "Baby Shower",
  [EventCategory.BRIDAL_SHOWER]: "Bridal Shower",
  [EventCategory.GRADUATION]: "Graduation",
  [EventCategory.HOLIDAY_PARTY]: "Holiday Party",
  [EventCategory.CORPORATE_EVENT]: "Corporate Event",
  [EventCategory.BUSINESS_MEETING]: "Business Meeting",
  [EventCategory.CONFERENCE]: "Conference",
  [EventCategory.SEMINAR]: "Seminar",
  [EventCategory.WORKSHOP]: "Workshop",
  [EventCategory.NETWORKING]: "Networking",
  [EventCategory.PRODUCT_LAUNCH]: "Product Launch",
  [EventCategory.TEAM_BUILDING]: "Team Building",
  [EventCategory.COMPANY_RETREAT]: "Company Retreat",
  [EventCategory.BOARD_MEETING]: "Board Meeting",
  [EventCategory.TRAINING_SESSION]: "Training Session",
  [EventCategory.REUNION]: "Reunion",
  [EventCategory.OTHER]: "Other",
};

export const TicketTypeLabels: Record<TicketType, string> = {
  [TicketType.GUEST]: "Guest",
  [TicketType.PLUS_ONE]: "Plus One",
  [TicketType.FAMILY]: "Family",
  [TicketType.CHILD]: "Child",
  [TicketType.VIP]: "VIP",
  [TicketType.VENDOR]: "Vendor",
  [TicketType.STAFF]: "Staff",
};

export const EventStatusLabels: Record<EventStatus, string> = {
  [EventStatus.DRAFT]: "Draft",
  [EventStatus.PUBLISHED]: "Published",
  [EventStatus.ACTIVE]: "Active",
  [EventStatus.CANCELLED]: "Cancelled",
  [EventStatus.COMPLETED]: "Completed",
  [EventStatus.POSTPONED]: "Postponed",
};

export const RSVPStatusLabels: Record<RSVPStatus, string> = {
  [RSVPStatus.PENDING]: "Pending",
  [RSVPStatus.ACCEPTED]: "Accepted",
  [RSVPStatus.DECLINED]: "Declined",
  [RSVPStatus.MAYBE]: "Maybe",
};

// ===================================================================
// TYPE GUARDS
// ===================================================================

export const isEvent = (obj: any): obj is Event => {
  return obj && typeof obj.id === "string" && typeof obj.title === "string";
};

export const isTicket = (obj: any): obj is Ticket => {
  return obj && typeof obj.id === "string" && typeof obj.qrCode === "string";
};

export const isGuest = (obj: any): obj is Guest => {
  return obj && typeof obj.id === "string" && typeof obj.eventId === "string";
};

export const isApiResponse = <T>(obj: any): obj is ApiResponse<T> => {
  return obj && typeof obj.success === "boolean";
};

// ===================================================================
// DATE UTILITIES
// ===================================================================

export const formatEventDate = (date: string | Date): string => {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatEventTime = (time: string): string => {
  // Assuming time is in "2:00 PM" format
  return time;
};

export const isEventUpcoming = (eventDate: string | Date): boolean => {
  const d = typeof eventDate === "string" ? new Date(eventDate) : eventDate;
  return d > new Date();
};

export const isEventToday = (eventDate: string | Date): boolean => {
  const d = typeof eventDate === "string" ? new Date(eventDate) : eventDate;
  const today = new Date();
  return d.toDateString() === today.toDateString();
};

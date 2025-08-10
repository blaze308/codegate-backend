import { Event, User, Ticket } from "@prisma/client";

// Base Guest interface (renamed from Attendee)
export interface Guest {
  id: string;
  checkedIn: boolean;
  checkedInAt?: Date;
  registeredAt: Date;
  mealPreference?: string;
  hasPlusOne: boolean;
  plusOneName?: string;
  specialNeeds?: string;
  tableNumber?: number;
  rsvpStatus: RSVPStatus;
  eventId: string;
  userId: string;
  ticketId: string;
}

// For backwards compatibility with Prisma model name
export interface Attendee extends Guest {}

// Guest with relations
export interface GuestWithRelations extends Guest {
  event?: Event;
  user?: User;
  ticket?: Ticket;
}

// For backwards compatibility
export interface AttendeeWithRelations extends GuestWithRelations {}

// RSVP Status
export type RSVPStatus = "PENDING" | "ACCEPTED" | "DECLINED" | "MAYBE";

// Request types
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

// Backwards compatibility
export interface CreateAttendeeRequest extends CreateGuestRequest {}
export interface UpdateAttendeeRequest extends UpdateGuestRequest {}

// Response types
export interface GuestResponse {
  success: boolean;
  data?: GuestWithRelations;
  error?: string;
  message?: string;
}

export interface GuestListResponse {
  success: boolean;
  data?: {
    guests: GuestWithRelations[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    stats?: GuestStats;
  };
  error?: string;
  message?: string;
}

// Backwards compatibility
export interface AttendeeResponse extends GuestResponse {}
export interface AttendeeListResponse extends GuestListResponse {}

// Guest statistics
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

// Guest filters
export interface GuestFilters {
  eventId?: string;
  userId?: string;
  checkedIn?: boolean;
  rsvpStatus?: RSVPStatus;
  hasPlusOne?: boolean;
  mealPreference?: string;
  tableNumber?: number;
  search?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

// Backwards compatibility
export interface AttendeeStats extends GuestStats {}
export interface AttendeeFilters extends GuestFilters {}

// Seating arrangement
export interface SeatingArrangement {
  tableNumber: number;
  capacity: number;
  guests: GuestWithRelations[];
  isFullyOccupied: boolean;
}

export interface SeatingPlan {
  eventId: string;
  tables: SeatingArrangement[];
  unassignedGuests: GuestWithRelations[];
  totalTables: number;
  totalCapacity: number;
  totalAssigned: number;
}

// Check-in summary
export interface CheckInSummary {
  eventId: string;
  totalExpected: number;
  checkedIn: number;
  notCheckedIn: number;
  checkInRate: number;
  recentCheckIns: GuestWithRelations[];
  checkInsByHour: Record<string, number>;
}

// Dietary restrictions and meal preferences
export interface MealPreferenceOption {
  value: string;
  label: string;
  description?: string;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  allergens?: string[];
}

export interface DietaryRestrictions {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  nutAllergy: boolean;
  dairyFree: boolean;
  other?: string;
}

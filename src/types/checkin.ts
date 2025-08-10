import { Event, Ticket, User } from "@prisma/client";

// Base CheckIn interface
export interface CheckIn {
  id: string;
  qrCode: string;
  checkedInAt: Date;
  location?: string;
  eventId: string;
  ticketId: string;
  checkedInBy: string; // Staff user ID
}

// CheckIn with relations
export interface CheckInWithRelations extends CheckIn {
  event?: Event;
  ticket?: Ticket;
  staff?: User;
}

// Request types
export interface CreateCheckInRequest {
  qrCode: string;
  eventId?: string;
  location?: string;
  staffId?: string;
}

export interface BulkCheckInRequest {
  checkIns: Array<{
    qrCode: string;
    location?: string;
  }>;
  eventId: string;
  staffId: string;
}

// Response types
export interface CheckInResponse {
  success: boolean;
  data?: {
    checkIn: CheckInWithRelations;
    ticket: {
      id: string;
      ticketType: string;
    };
    event: {
      id: string;
      title: string;
    };
    user: {
      id: string;
      name: string;
      email: string;
    };
  };
  error?: string;
  message?: string;
}

export interface CheckInListResponse {
  success: boolean;
  data?: {
    checkIns: CheckInWithRelations[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    stats?: CheckInStats;
  };
  error?: string;
  message?: string;
}

// CheckIn statistics
export interface CheckInStats {
  totalCheckIns: number;
  uniqueAttendees: number;
  checkInRate: number;
  averageCheckInTime?: string;
  peakCheckInTime?: string;
  checkInsByHour: Record<string, number>;
  checkInsByLocation: Record<string, number>;
  recentCheckIns: CheckInWithRelations[];
  staffPerformance: Array<{
    staffId: string;
    staffName: string;
    checkInsProcessed: number;
  }>;
}

// CheckIn filters
export interface CheckInFilters {
  eventId?: string;
  ticketId?: string;
  staffId?: string;
  location?: string;
  dateFrom?: Date;
  dateTo?: Date;
  search?: string;
}

// Real-time check-in updates
export interface CheckInUpdate {
  type: "NEW_CHECKIN" | "BULK_CHECKIN" | "CHECKIN_ERROR";
  eventId: string;
  data: CheckInWithRelations | CheckInWithRelations[] | { error: string };
  timestamp: Date;
}

// CheckIn validation
export interface CheckInValidation {
  isValid: boolean;
  canCheckIn: boolean;
  reason?: string;
  warnings?: string[];
  ticket?: {
    id: string;
    status: string;
    isExpired: boolean;
    alreadyUsed: boolean;
  };
}

// Event door management
export interface EventDoor {
  id: string;
  eventId: string;
  name: string;
  location: string;
  isActive: boolean;
  capacity?: number;
  currentCount: number;
  staffAssigned: string[]; // Staff user IDs
  lastActivity?: Date;
}

export interface DoorStats {
  doorId: string;
  name: string;
  totalCheckIns: number;
  currentCount: number;
  capacity?: number;
  utilizationRate: number;
  averageCheckInTime: number;
  staffOnDuty: number;
}

// Mobile check-in app data
export interface MobileCheckInSession {
  sessionId: string;
  eventId: string;
  staffId: string;
  deviceId: string;
  startTime: Date;
  lastActivity: Date;
  checkInsProcessed: number;
  isActive: boolean;
  location?: string;
}

// Offline check-in support
export interface OfflineCheckIn {
  tempId: string;
  qrCode: string;
  timestamp: Date;
  location?: string;
  staffId: string;
  eventId: string;
  synced: boolean;
}

export interface OfflineSync {
  sessionId: string;
  checkIns: OfflineCheckIn[];
  syncedAt: Date;
  conflicts: Array<{
    tempId: string;
    reason: string;
    originalCheckIn?: CheckInWithRelations;
  }>;
}

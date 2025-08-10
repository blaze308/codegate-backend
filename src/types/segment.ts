import { Event } from "@prisma/client";

// Base EventSegment interface
export interface EventSegment {
  id: string;
  eventDetail: string;
  performedBy: string;
  durationMinutes: number;
  startTime: Date;
  endTime: Date;
  order: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  eventId: string;
}

// EventSegment with relations
export interface EventSegmentWithRelations extends EventSegment {
  event?: Event;
}

// Segment types for weddings and events
export type SegmentType =
  | "CEREMONY"
  | "RECEPTION"
  | "COCKTAIL_HOUR"
  | "DINNER"
  | "SPEECHES"
  | "DANCING"
  | "CAKE_CUTTING"
  | "BOUQUET_TOSS"
  | "FIRST_DANCE"
  | "FATHER_DAUGHTER_DANCE"
  | "MOTHER_SON_DANCE"
  | "PROCESSIONAL"
  | "RECESSIONAL"
  | "RING_EXCHANGE"
  | "VOWS"
  | "UNITY_CEREMONY"
  | "BLESSING"
  | "PHOTOS"
  | "BREAK"
  | "SETUP"
  | "CLEANUP"
  | "OTHER";

// Enhanced segment with additional properties
export interface EnhancedEventSegment extends EventSegment {
  segmentType: SegmentType;
  location?: string; // Specific location within venue
  requirements?: string[]; // Equipment/setup requirements
  participants?: string[]; // People involved (besides performedBy)
  isPublic: boolean; // Whether guests should see this segment
  isCritical: boolean; // Whether this segment is critical to the event
  estimatedAttendees?: number;
  cost?: number;
  vendor?: {
    id: string;
    name: string;
    contactInfo: string;
  };
}

// Request types
export interface CreateEventSegmentRequest {
  eventDetail: string;
  performedBy: string;
  durationMinutes: number;
  startTime: string; // ISO string or time format
  order: number;
  notes?: string;
  segmentType?: SegmentType;
  location?: string;
  requirements?: string[];
  participants?: string[];
  isPublic?: boolean;
  isCritical?: boolean;
  estimatedAttendees?: number;
  cost?: number;
}

export interface UpdateEventSegmentRequest {
  eventDetail?: string;
  performedBy?: string;
  durationMinutes?: number;
  startTime?: string;
  order?: number;
  notes?: string;
  segmentType?: SegmentType;
  location?: string;
  requirements?: string[];
  participants?: string[];
  isPublic?: boolean;
  isCritical?: boolean;
  estimatedAttendees?: number;
  cost?: number;
}

export interface BulkSegmentRequest {
  eventId: string;
  segments: CreateEventSegmentRequest[];
}

// Response types
export interface EventSegmentResponse {
  success: boolean;
  data?: EventSegmentWithRelations;
  error?: string;
  message?: string;
}

export interface EventSegmentListResponse {
  success: boolean;
  data?: {
    segments: EventSegmentWithRelations[];
    total: number;
    totalDuration: number;
    eventStartTime: Date;
    eventEndTime: Date;
    timeline?: SegmentTimeline;
  };
  error?: string;
  message?: string;
}

// Timeline and scheduling
export interface SegmentTimeline {
  eventId: string;
  segments: EventSegmentWithRelations[];
  totalDuration: number;
  gaps: TimeGap[];
  conflicts: SegmentConflict[];
  recommendations: string[];
}

export interface TimeGap {
  startTime: Date;
  endTime: Date;
  durationMinutes: number;
  afterSegment?: string;
  beforeSegment?: string;
}

export interface SegmentConflict {
  type: "OVERLAP" | "PERFORMER_CONFLICT" | "VENUE_CONFLICT";
  segments: string[]; // segment IDs
  description: string;
  severity: "LOW" | "MEDIUM" | "HIGH";
}

// Segment filters
export interface SegmentFilters {
  eventId?: string;
  segmentType?: SegmentType;
  performedBy?: string;
  isPublic?: boolean;
  isCritical?: boolean;
  dateFrom?: Date;
  dateTo?: Date;
  minDuration?: number;
  maxDuration?: number;
  search?: string;
}

// Segment statistics
export interface SegmentStats {
  totalSegments: number;
  totalDuration: number;
  averageDuration: number;
  segmentsByType: Record<SegmentType, number>;
  criticalSegments: number;
  publicSegments: number;
  totalCost: number;
  timeDistribution: {
    setup: number;
    ceremony: number;
    reception: number;
    cleanup: number;
    other: number;
  };
}

// Segment templates for quick setup
export interface SegmentTemplate {
  id: string;
  name: string;
  description: string;
  eventType: "WEDDING" | "PARTY" | "CORPORATE" | "OTHER";
  segments: Omit<CreateEventSegmentRequest, "startTime">[];
  estimatedTotalDuration: number;
  recommendedStartTime?: string;
}

// Common wedding segment templates
export const WEDDING_CEREMONY_TEMPLATE: SegmentTemplate = {
  id: "wedding-ceremony",
  name: "Traditional Wedding Ceremony",
  description: "Standard wedding ceremony timeline",
  eventType: "WEDDING",
  estimatedTotalDuration: 60,
  segments: [
    {
      eventDetail: "Guest Seating",
      performedBy: "Ushers",
      durationMinutes: 30,
      order: 1,
      segmentType: "SETUP",
    },
    {
      eventDetail: "Processional",
      performedBy: "Wedding Party",
      durationMinutes: 5,
      order: 2,
      segmentType: "PROCESSIONAL",
    },
    {
      eventDetail: "Ceremony",
      performedBy: "Officiant",
      durationMinutes: 20,
      order: 3,
      segmentType: "CEREMONY",
    },
    {
      eventDetail: "Recessional",
      performedBy: "Wedding Party",
      durationMinutes: 5,
      order: 4,
      segmentType: "RECESSIONAL",
    },
  ],
};

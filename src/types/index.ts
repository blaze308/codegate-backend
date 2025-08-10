// Main exports for all types
export * from "./event";
export * from "./user";
export * from "./ticket";
export * from "./checkin";
export * from "./qr";

// Common response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp?: Date;
}

export interface PaginatedResponse<T = any> {
  success: boolean;
  data?: {
    items: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  error?: string;
  message?: string;
}

// Common filter types
export interface PaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface SearchOptions {
  search?: string;
  searchFields?: string[];
}

export interface DateRangeFilter {
  dateFrom?: Date | string;
  dateTo?: Date | string;
}

// Error types
export interface ValidationError {
  field: string;
  message: string;
  code?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
}

// File upload types
export interface FileUpload {
  filename: string;
  originalName: string;
  mimetype: string;
  size: number;
  url: string;
  uploadedAt: Date;
}

export interface ImageUpload extends FileUpload {
  width?: number;
  height?: number;
  thumbnailUrl?: string;
}

// Location types
export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  coordinates?: Coordinates;
}

// Simple notification types (no complex notification system needed)
export interface SimpleNotification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

export type NotificationType =
  | "EVENT_CREATED"
  | "EVENT_UPDATED"
  | "EVENT_CANCELLED"
  | "TICKET_PURCHASED"
  | "CHECK_IN_SUCCESS"
  | "RSVP_REMINDER"
  | "EVENT_REMINDER";

// Simple app configuration
export interface AppConfig {
  name: string;
  version: string;
  environment: "development" | "staging" | "production";
  database: {
    url: string;
  };
  features: {
    enableNotifications: boolean;
    maxEventsPerHost: number;
    maxGuestsPerEvent: number;
  };
}

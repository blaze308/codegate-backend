import { Event, Ticket, Attendee, CheckIn } from "@prisma/client";

// Base User interface
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

// User with relations
export interface UserWithRelations extends User {
  hostedEvents?: Event[];
  tickets?: Ticket[];
  guestAttendances?: Attendee[];
  checkIns?: CheckIn[];
}

// Host - a user who creates and manages events
export interface Host extends User {
  hostedEvents: Event[];
  totalEventsHosted: number;
  activeEventsCount: number;
}

// Guest - a user who attends events
export interface Guest extends User {
  tickets: Ticket[];
  guestAttendances: Attendee[];
  checkIns: CheckIn[];
  totalEventsAttended: number;
  upcomingEvents: Event[];
}

// Request types
export interface CreateUserRequest {
  email: string;
  name: string;
  phone?: string;
}

export interface UpdateUserRequest {
  name?: string;
  phone?: string;
}

// Response types
export interface UserResponse {
  success: boolean;
  data?: User;
  error?: string;
  message?: string;
}

export interface UserListResponse {
  success: boolean;
  data?: {
    users: User[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  error?: string;
  message?: string;
}

// Simple user role types (no auth needed)
export type UserRole = "HOST" | "GUEST";

export interface UserProfile extends User {
  role: UserRole;
  bio?: string;
  avatar?: string;
}

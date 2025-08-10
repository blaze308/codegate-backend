import { VendorStatus, VendorPaymentStatus, Event } from "@prisma/client";

// Base Vendor interface
export interface Vendor {
  id: string;
  name: string;
  serviceType: string;
  contactNumber?: string;
  email?: string;
  website?: string;
  socialMedia?: any; // JSON field
  notes?: string;
  status: VendorStatus;
  paymentStatus: VendorPaymentStatus;
  contractSigned: boolean;
  totalAmount?: number;
  paidAmount: number;
  createdAt: Date;
  updatedAt: Date;
  eventId: string;
}

// Vendor with relations
export interface VendorWithRelations extends Vendor {
  event?: Event;
}

// Service types
export type ServiceType =
  | "PHOTOGRAPHY"
  | "VIDEOGRAPHY"
  | "CATERING"
  | "MUSIC_DJ"
  | "LIVE_BAND"
  | "FLORIST"
  | "DECORATOR"
  | "LIGHTING"
  | "SOUND_SYSTEM"
  | "SECURITY"
  | "TRANSPORTATION"
  | "MAKEUP_ARTIST"
  | "HAIR_STYLIST"
  | "WEDDING_PLANNER"
  | "MC_HOST"
  | "BARTENDER"
  | "CLEANING"
  | "RENTALS"
  | "OTHER";

// Social media links
export interface SocialMediaLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
  tiktok?: string;
  website?: string;
}

// Request types
export interface CreateVendorRequest {
  name: string;
  serviceType: string;
  contactNumber?: string;
  email?: string;
  website?: string;
  socialMedia?: SocialMediaLinks;
  notes?: string;
  totalAmount?: number;
  contractSigned?: boolean;
}

export interface UpdateVendorRequest {
  name?: string;
  serviceType?: string;
  contactNumber?: string;
  email?: string;
  website?: string;
  socialMedia?: SocialMediaLinks;
  notes?: string;
  status?: VendorStatus;
  paymentStatus?: VendorPaymentStatus;
  contractSigned?: boolean;
  totalAmount?: number;
  paidAmount?: number;
}

// Simple payment tracking
export interface VendorPayment {
  id: string;
  vendorId: string;
  amount: number;
  paymentDate: Date;
  notes?: string;
  createdAt: Date;
}

// Response types
export interface VendorResponse {
  success: boolean;
  data?: VendorWithRelations;
  error?: string;
  message?: string;
}

export interface VendorListResponse {
  success: boolean;
  data?: {
    vendors: VendorWithRelations[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    stats?: VendorStats;
  };
  error?: string;
  message?: string;
}

// Vendor statistics
export interface VendorStats {
  totalVendors: number;
  confirmedVendors: number;
  pendingVendors: number;
  cancelledVendors: number;
  completedVendors: number;
  totalContractValue: number;
  totalPaidAmount: number;
  outstandingAmount: number;
  contractsSigned: number;
  paymentStatusBreakdown: Record<VendorPaymentStatus, number>;
  serviceTypeBreakdown: Record<string, number>;
}

// Vendor filters
export interface VendorFilters {
  eventId?: string;
  serviceType?: string;
  status?: VendorStatus;
  paymentStatus?: VendorPaymentStatus;
  contractSigned?: boolean;
  minAmount?: number;
  maxAmount?: number;
  search?: string;
}

// Simple vendor rating (optional feature)
export interface VendorRating {
  id: string;
  vendorId: string;
  eventId: string;
  rating: number; // 1-5 stars
  review?: string;
  ratedBy: string; // userId
  ratedAt: Date;
}

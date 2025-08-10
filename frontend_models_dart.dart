// ===================================================================
// CODEGATE FRONTEND MODELS - DART/FLUTTER
// ===================================================================
// Generated for CodeGate Events & Ticketing API
// Compatible with backend API endpoints
// ===================================================================

import 'dart:convert';

// ===================================================================
// ENUMS
// ===================================================================

enum EventCategory {
  wedding,
  reception,
  engagementParty,
  birthdayParty,
  anniversary,
  babyShower,
  bridalShower,
  graduation,
  holidayParty,
  corporateEvent,
  businessMeeting,
  conference,
  seminar,
  workshop,
  networking,
  productLaunch,
  teamBuilding,
  companyRetreat,
  boardMeeting,
  trainingSession,
  reunion,
  other,
}

enum EventStatus { draft, published, active, cancelled, completed, postponed }

enum TicketType { guest, plusOne, family, child, vip, vendor, staff }

enum TicketStatus { active, used, expired, cancelled, refunded }

enum VendorStatus { pending, confirmed, cancelled, completed }

enum VendorPaymentStatus { pending, partial, paid, overdue, refunded }

enum RSVPStatus { pending, accepted, declined, maybe }

enum UserRole { host, guest }

enum NotificationType {
  eventCreated,
  eventUpdated,
  eventCancelled,
  ticketPurchased,
  checkInSuccess,
  rsvpReminder,
  eventReminder,
}

// ===================================================================
// CORE MODELS
// ===================================================================

class User {
  final String id;
  final String email;
  final String name;
  final String? phone;
  final DateTime createdAt;
  final DateTime updatedAt;

  User({
    required this.id,
    required this.email,
    required this.name,
    this.phone,
    required this.createdAt,
    required this.updatedAt,
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'],
      email: json['email'],
      name: json['name'],
      phone: json['phone'],
      createdAt: DateTime.parse(json['createdAt']),
      updatedAt: DateTime.parse(json['updatedAt']),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'email': email,
      'name': name,
      'phone': phone,
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt.toIso8601String(),
    };
  }
}

class Coordinates {
  final double latitude;
  final double longitude;

  Coordinates({required this.latitude, required this.longitude});

  factory Coordinates.fromJson(Map<String, dynamic> json) {
    return Coordinates(
      latitude: json['latitude'].toDouble(),
      longitude: json['longitude'].toDouble(),
    );
  }

  Map<String, dynamic> toJson() {
    return {'latitude': latitude, 'longitude': longitude};
  }
}

class EventLocation {
  final String venue;
  final String address;
  final String city;
  final String state;
  final String country;
  final String zipCode;
  final Coordinates? coordinates;

  EventLocation({
    required this.venue,
    required this.address,
    required this.city,
    required this.state,
    required this.country,
    required this.zipCode,
    this.coordinates,
  });

  factory EventLocation.fromJson(Map<String, dynamic> json) {
    return EventLocation(
      venue: json['venue'],
      address: json['address'],
      city: json['city'],
      state: json['state'],
      country: json['country'],
      zipCode: json['zipCode'],
      coordinates:
          json['coordinates'] != null
              ? Coordinates.fromJson(json['coordinates'])
              : null,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'venue': venue,
      'address': address,
      'city': city,
      'state': state,
      'country': country,
      'zipCode': zipCode,
      'coordinates': coordinates?.toJson(),
    };
  }
}

class Event {
  final String id;
  final String title;
  final String description;
  final EventCategory category;
  final DateTime eventDate;
  final String startTime;
  final String? endTime;
  final int capacity;
  final int currentAttendees;
  final double ticketPrice;
  final String currency;
  final String hostId;
  final EventStatus status;
  final String? qrCode;
  final List<String> images;
  final List<String> tags;
  final DateTime createdAt;
  final DateTime updatedAt;

  // Wedding/Party specific fields
  final String? coupleName;
  final String? hostName;
  final String? dressCode;
  final String? specialInstructions;
  final String? giftRegistry;
  final DateTime? rsvpDeadline;
  final bool isPlusOneAllowed;
  final List<String> mealPreferences;

  // Location fields
  final String venue;
  final String address;
  final String city;
  final String state;
  final String country;
  final String zipCode;
  final double? latitude;
  final double? longitude;

  Event({
    required this.id,
    required this.title,
    required this.description,
    required this.category,
    required this.eventDate,
    required this.startTime,
    this.endTime,
    required this.capacity,
    required this.currentAttendees,
    required this.ticketPrice,
    required this.currency,
    required this.hostId,
    required this.status,
    this.qrCode,
    required this.images,
    required this.tags,
    required this.createdAt,
    required this.updatedAt,
    this.coupleName,
    this.hostName,
    this.dressCode,
    this.specialInstructions,
    this.giftRegistry,
    this.rsvpDeadline,
    required this.isPlusOneAllowed,
    required this.mealPreferences,
    required this.venue,
    required this.address,
    required this.city,
    required this.state,
    required this.country,
    required this.zipCode,
    this.latitude,
    this.longitude,
  });

  factory Event.fromJson(Map<String, dynamic> json) {
    return Event(
      id: json['id'],
      title: json['title'],
      description: json['description'],
      category: EventCategory.values.firstWhere(
        (e) =>
            e.toString().split('.').last.toLowerCase() ==
            json['category'].toString().toLowerCase().replaceAll('_', ''),
      ),
      eventDate: DateTime.parse(json['eventDate']),
      startTime: json['startTime'],
      endTime: json['endTime'],
      capacity: json['capacity'],
      currentAttendees: json['currentAttendees'],
      ticketPrice: json['ticketPrice'].toDouble(),
      currency: json['currency'],
      hostId: json['hostId'] ?? json['organizerId'], // backwards compatibility
      status: EventStatus.values.firstWhere(
        (e) =>
            e.toString().split('.').last.toLowerCase() ==
            json['status'].toString().toLowerCase(),
      ),
      qrCode: json['qrCode'],
      images: List<String>.from(json['images'] ?? []),
      tags: List<String>.from(json['tags'] ?? []),
      createdAt: DateTime.parse(json['createdAt']),
      updatedAt: DateTime.parse(json['updatedAt']),
      coupleName: json['coupleName'],
      hostName: json['hostName'],
      dressCode: json['dressCode'],
      specialInstructions: json['specialInstructions'],
      giftRegistry: json['giftRegistry'],
      rsvpDeadline:
          json['rsvpDeadline'] != null
              ? DateTime.parse(json['rsvpDeadline'])
              : null,
      isPlusOneAllowed: json['isPlusOneAllowed'] ?? false,
      mealPreferences: List<String>.from(json['mealPreferences'] ?? []),
      venue: json['venue'],
      address: json['address'],
      city: json['city'],
      state: json['state'],
      country: json['country'],
      zipCode: json['zipCode'],
      latitude: json['latitude']?.toDouble(),
      longitude: json['longitude']?.toDouble(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'category': category.toString().split('.').last.toUpperCase(),
      'eventDate': eventDate.toIso8601String(),
      'startTime': startTime,
      'endTime': endTime,
      'capacity': capacity,
      'currentAttendees': currentAttendees,
      'ticketPrice': ticketPrice,
      'currency': currency,
      'hostId': hostId,
      'status': status.toString().split('.').last.toUpperCase(),
      'qrCode': qrCode,
      'images': images,
      'tags': tags,
      'createdAt': createdAt.toIso8601String(),
      'updatedAt': updatedAt.toIso8601String(),
      'coupleName': coupleName,
      'hostName': hostName,
      'dressCode': dressCode,
      'specialInstructions': specialInstructions,
      'giftRegistry': giftRegistry,
      'rsvpDeadline': rsvpDeadline?.toIso8601String(),
      'isPlusOneAllowed': isPlusOneAllowed,
      'mealPreferences': mealPreferences,
      'venue': venue,
      'address': address,
      'city': city,
      'state': state,
      'country': country,
      'zipCode': zipCode,
      'latitude': latitude,
      'longitude': longitude,
    };
  }
}

class Ticket {
  final String id;
  final String qrCode;
  final TicketType ticketType;
  final double price;
  final TicketStatus status;
  final DateTime purchasedAt;
  final DateTime validUntil;
  final String eventId;
  final String userId;

  Ticket({
    required this.id,
    required this.qrCode,
    required this.ticketType,
    required this.price,
    required this.status,
    required this.purchasedAt,
    required this.validUntil,
    required this.eventId,
    required this.userId,
  });

  factory Ticket.fromJson(Map<String, dynamic> json) {
    return Ticket(
      id: json['id'],
      qrCode: json['qrCode'],
      ticketType: TicketType.values.firstWhere(
        (e) =>
            e.toString().split('.').last.toLowerCase() ==
            json['ticketType'].toString().toLowerCase().replaceAll('_', ''),
      ),
      price: json['price'].toDouble(),
      status: TicketStatus.values.firstWhere(
        (e) =>
            e.toString().split('.').last.toLowerCase() ==
            json['status'].toString().toLowerCase(),
      ),
      purchasedAt: DateTime.parse(json['purchasedAt']),
      validUntil: DateTime.parse(json['validUntil']),
      eventId: json['eventId'],
      userId: json['userId'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'qrCode': qrCode,
      'ticketType': ticketType.toString().split('.').last.toUpperCase(),
      'price': price,
      'status': status.toString().split('.').last.toUpperCase(),
      'purchasedAt': purchasedAt.toIso8601String(),
      'validUntil': validUntil.toIso8601String(),
      'eventId': eventId,
      'userId': userId,
    };
  }
}

class Guest {
  final String id;
  final bool checkedIn;
  final DateTime? checkedInAt;
  final DateTime registeredAt;
  final String? mealPreference;
  final bool hasPlusOne;
  final String? plusOneName;
  final String? specialNeeds;
  final int? tableNumber;
  final RSVPStatus rsvpStatus;
  final String eventId;
  final String userId;
  final String ticketId;

  Guest({
    required this.id,
    required this.checkedIn,
    this.checkedInAt,
    required this.registeredAt,
    this.mealPreference,
    required this.hasPlusOne,
    this.plusOneName,
    this.specialNeeds,
    this.tableNumber,
    required this.rsvpStatus,
    required this.eventId,
    required this.userId,
    required this.ticketId,
  });

  factory Guest.fromJson(Map<String, dynamic> json) {
    return Guest(
      id: json['id'],
      checkedIn: json['checkedIn'] ?? false,
      checkedInAt:
          json['checkedInAt'] != null
              ? DateTime.parse(json['checkedInAt'])
              : null,
      registeredAt: DateTime.parse(json['registeredAt']),
      mealPreference: json['mealPreference'],
      hasPlusOne: json['hasPlusOne'] ?? false,
      plusOneName: json['plusOneName'],
      specialNeeds: json['specialNeeds'],
      tableNumber: json['tableNumber'],
      rsvpStatus: RSVPStatus.values.firstWhere(
        (e) =>
            e.toString().split('.').last.toLowerCase() ==
            json['rsvpStatus'].toString().toLowerCase(),
        orElse: () => RSVPStatus.pending,
      ),
      eventId: json['eventId'],
      userId: json['userId'],
      ticketId: json['ticketId'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'checkedIn': checkedIn,
      'checkedInAt': checkedInAt?.toIso8601String(),
      'registeredAt': registeredAt.toIso8601String(),
      'mealPreference': mealPreference,
      'hasPlusOne': hasPlusOne,
      'plusOneName': plusOneName,
      'specialNeeds': specialNeeds,
      'tableNumber': tableNumber,
      'rsvpStatus': rsvpStatus.toString().split('.').last.toUpperCase(),
      'eventId': eventId,
      'userId': userId,
      'ticketId': ticketId,
    };
  }
}

class CheckIn {
  final String id;
  final String qrCode;
  final DateTime checkedInAt;
  final String? location;
  final String eventId;
  final String ticketId;
  final String checkedInBy;

  CheckIn({
    required this.id,
    required this.qrCode,
    required this.checkedInAt,
    this.location,
    required this.eventId,
    required this.ticketId,
    required this.checkedInBy,
  });

  factory CheckIn.fromJson(Map<String, dynamic> json) {
    return CheckIn(
      id: json['id'],
      qrCode: json['qrCode'],
      checkedInAt: DateTime.parse(json['checkedInAt']),
      location: json['location'],
      eventId: json['eventId'],
      ticketId: json['ticketId'],
      checkedInBy: json['checkedInBy'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'qrCode': qrCode,
      'checkedInAt': checkedInAt.toIso8601String(),
      'location': location,
      'eventId': eventId,
      'ticketId': ticketId,
      'checkedInBy': checkedInBy,
    };
  }
}

// ===================================================================
// REQUEST/RESPONSE MODELS
// ===================================================================

class CreateEventRequest {
  final String title;
  final String description;
  final EventCategory category;
  final String eventDate;
  final String startTime;
  final String? endTime;
  final int capacity;
  final double ticketPrice;
  final String currency;
  final EventLocation location;
  final String? coupleName;
  final String? hostName;
  final String? dressCode;
  final String? specialInstructions;
  final String? giftRegistry;
  final String? rsvpDeadline;
  final bool isPlusOneAllowed;
  final List<String> mealPreferences;
  final List<String> tags;
  final List<String> images;

  CreateEventRequest({
    required this.title,
    required this.description,
    required this.category,
    required this.eventDate,
    required this.startTime,
    this.endTime,
    required this.capacity,
    required this.ticketPrice,
    this.currency = 'USD',
    required this.location,
    this.coupleName,
    this.hostName,
    this.dressCode,
    this.specialInstructions,
    this.giftRegistry,
    this.rsvpDeadline,
    this.isPlusOneAllowed = false,
    this.mealPreferences = const [],
    this.tags = const [],
    this.images = const [],
  });

  Map<String, dynamic> toJson() {
    return {
      'title': title,
      'description': description,
      'category': category.toString().split('.').last.toUpperCase(),
      'eventDate': eventDate,
      'startTime': startTime,
      'endTime': endTime,
      'capacity': capacity,
      'ticketPrice': ticketPrice,
      'currency': currency,
      'location': location.toJson(),
      'coupleName': coupleName,
      'hostName': hostName,
      'dressCode': dressCode,
      'specialInstructions': specialInstructions,
      'giftRegistry': giftRegistry,
      'rsvpDeadline': rsvpDeadline,
      'isPlusOneAllowed': isPlusOneAllowed,
      'mealPreferences': mealPreferences,
      'tags': tags,
      'images': images,
    };
  }
}

class TicketPurchaseRequest {
  final TicketType ticketType;
  final int quantity;
  final UserInfo user;

  TicketPurchaseRequest({
    required this.ticketType,
    required this.quantity,
    required this.user,
  });

  Map<String, dynamic> toJson() {
    return {
      'ticketType': ticketType.toString().split('.').last.toUpperCase(),
      'quantity': quantity,
      'user': user.toJson(),
    };
  }
}

class UserInfo {
  final String name;
  final String email;
  final String? phone;

  UserInfo({required this.name, required this.email, this.phone});

  Map<String, dynamic> toJson() {
    return {'name': name, 'email': email, 'phone': phone};
  }
}

class CheckInRequest {
  final String qrCode;
  final String? eventId;
  final String? staffId;

  CheckInRequest({required this.qrCode, this.eventId, this.staffId});

  Map<String, dynamic> toJson() {
    return {'qrCode': qrCode, 'eventId': eventId, 'staffId': staffId};
  }
}

class QRCodeOptions {
  final String format;
  final int width;
  final double quality;
  final int margin;
  final String darkColor;
  final String lightColor;
  final String errorCorrectionLevel;

  QRCodeOptions({
    this.format = 'png',
    this.width = 256,
    this.quality = 0.92,
    this.margin = 1,
    this.darkColor = '#000000',
    this.lightColor = '#FFFFFF',
    this.errorCorrectionLevel = 'M',
  });

  Map<String, dynamic> toJson() {
    return {
      'format': format,
      'width': width,
      'quality': quality,
      'margin': margin,
      'darkColor': darkColor,
      'lightColor': lightColor,
      'errorCorrectionLevel': errorCorrectionLevel,
    };
  }
}

class QRGenerateRequest {
  final String text;
  final QRCodeOptions? options;

  QRGenerateRequest({required this.text, this.options});

  Map<String, dynamic> toJson() {
    return {'text': text, 'options': options?.toJson()};
  }
}

// ===================================================================
// API RESPONSE MODELS
// ===================================================================

class ApiResponse<T> {
  final bool success;
  final T? data;
  final String? error;
  final String? message;

  ApiResponse({required this.success, this.data, this.error, this.message});

  factory ApiResponse.fromJson(
    Map<String, dynamic> json,
    T Function(dynamic)? fromJsonT,
  ) {
    return ApiResponse<T>(
      success: json['success'],
      data:
          json['data'] != null && fromJsonT != null
              ? fromJsonT(json['data'])
              : json['data'],
      error: json['error'],
      message: json['message'],
    );
  }
}

class PaginatedResponse<T> {
  final bool success;
  final List<T> items;
  final int total;
  final int page;
  final int limit;
  final int totalPages;
  final String? error;
  final String? message;

  PaginatedResponse({
    required this.success,
    required this.items,
    required this.total,
    required this.page,
    required this.limit,
    required this.totalPages,
    this.error,
    this.message,
  });

  factory PaginatedResponse.fromJson(
    Map<String, dynamic> json,
    T Function(Map<String, dynamic>) fromJsonT,
  ) {
    final data = json['data'];
    return PaginatedResponse<T>(
      success: json['success'],
      items:
          data != null
              ? (data['events'] as List? ??
                      data['tickets'] as List? ??
                      data['items'] as List? ??
                      [])
                  .map((item) => fromJsonT(item))
                  .toList()
              : [],
      total: data?['total'] ?? 0,
      page: data?['page'] ?? 1,
      limit: data?['limit'] ?? 10,
      totalPages: data?['totalPages'] ?? 0,
      error: json['error'],
      message: json['message'],
    );
  }
}

// ===================================================================
// UTILITY EXTENSIONS
// ===================================================================

extension EventCategoryExtension on EventCategory {
  String get displayName {
    switch (this) {
      case EventCategory.wedding:
        return 'Wedding';
      case EventCategory.reception:
        return 'Reception';
      case EventCategory.engagementParty:
        return 'Engagement Party';
      case EventCategory.birthdayParty:
        return 'Birthday Party';
      case EventCategory.anniversary:
        return 'Anniversary';
      case EventCategory.babyShower:
        return 'Baby Shower';
      case EventCategory.bridalShower:
        return 'Bridal Shower';
      case EventCategory.graduation:
        return 'Graduation';
      case EventCategory.holidayParty:
        return 'Holiday Party';
      case EventCategory.corporateEvent:
        return 'Corporate Event';
      case EventCategory.businessMeeting:
        return 'Business Meeting';
      case EventCategory.conference:
        return 'Conference';
      case EventCategory.seminar:
        return 'Seminar';
      case EventCategory.workshop:
        return 'Workshop';
      case EventCategory.networking:
        return 'Networking';
      case EventCategory.productLaunch:
        return 'Product Launch';
      case EventCategory.teamBuilding:
        return 'Team Building';
      case EventCategory.companyRetreat:
        return 'Company Retreat';
      case EventCategory.boardMeeting:
        return 'Board Meeting';
      case EventCategory.trainingSession:
        return 'Training Session';
      case EventCategory.reunion:
        return 'Reunion';
      case EventCategory.other:
        return 'Other';
    }
  }
}

extension TicketTypeExtension on TicketType {
  String get displayName {
    switch (this) {
      case TicketType.guest:
        return 'Guest';
      case TicketType.plusOne:
        return 'Plus One';
      case TicketType.family:
        return 'Family';
      case TicketType.child:
        return 'Child';
      case TicketType.vip:
        return 'VIP';
      case TicketType.vendor:
        return 'Vendor';
      case TicketType.staff:
        return 'Staff';
    }
  }
}

extension EventStatusExtension on EventStatus {
  String get displayName {
    switch (this) {
      case EventStatus.draft:
        return 'Draft';
      case EventStatus.published:
        return 'Published';
      case EventStatus.active:
        return 'Active';
      case EventStatus.cancelled:
        return 'Cancelled';
      case EventStatus.completed:
        return 'Completed';
      case EventStatus.postponed:
        return 'Postponed';
    }
  }
}

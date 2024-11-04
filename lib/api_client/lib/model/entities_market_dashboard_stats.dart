//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class EntitiesMarketDashboardStats {
  /// Returns a new [EntitiesMarketDashboardStats] instance.
  EntitiesMarketDashboardStats({
    this.bookingGrowth,
    this.createdAt,
    this.date,
    this.marketId,
    this.occupancyRate,
    this.revenueGrowth,
    this.topZone,
    this.topZoneOccupancy,
    this.totalBookings,
    this.totalCancelBookings,
    this.totalConfirmBookings,
    this.totalPendingBookings,
    this.totalRevenue,
  });

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  num? bookingGrowth;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? createdAt;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? date;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? marketId;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  num? occupancyRate;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  num? revenueGrowth;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? topZone;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  num? topZoneOccupancy;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  int? totalBookings;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  int? totalCancelBookings;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  int? totalConfirmBookings;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  int? totalPendingBookings;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  num? totalRevenue;

  @override
  bool operator ==(Object other) => identical(this, other) || other is EntitiesMarketDashboardStats &&
    other.bookingGrowth == bookingGrowth &&
    other.createdAt == createdAt &&
    other.date == date &&
    other.marketId == marketId &&
    other.occupancyRate == occupancyRate &&
    other.revenueGrowth == revenueGrowth &&
    other.topZone == topZone &&
    other.topZoneOccupancy == topZoneOccupancy &&
    other.totalBookings == totalBookings &&
    other.totalCancelBookings == totalCancelBookings &&
    other.totalConfirmBookings == totalConfirmBookings &&
    other.totalPendingBookings == totalPendingBookings &&
    other.totalRevenue == totalRevenue;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (bookingGrowth == null ? 0 : bookingGrowth!.hashCode) +
    (createdAt == null ? 0 : createdAt!.hashCode) +
    (date == null ? 0 : date!.hashCode) +
    (marketId == null ? 0 : marketId!.hashCode) +
    (occupancyRate == null ? 0 : occupancyRate!.hashCode) +
    (revenueGrowth == null ? 0 : revenueGrowth!.hashCode) +
    (topZone == null ? 0 : topZone!.hashCode) +
    (topZoneOccupancy == null ? 0 : topZoneOccupancy!.hashCode) +
    (totalBookings == null ? 0 : totalBookings!.hashCode) +
    (totalCancelBookings == null ? 0 : totalCancelBookings!.hashCode) +
    (totalConfirmBookings == null ? 0 : totalConfirmBookings!.hashCode) +
    (totalPendingBookings == null ? 0 : totalPendingBookings!.hashCode) +
    (totalRevenue == null ? 0 : totalRevenue!.hashCode);

  @override
  String toString() => 'EntitiesMarketDashboardStats[bookingGrowth=$bookingGrowth, createdAt=$createdAt, date=$date, marketId=$marketId, occupancyRate=$occupancyRate, revenueGrowth=$revenueGrowth, topZone=$topZone, topZoneOccupancy=$topZoneOccupancy, totalBookings=$totalBookings, totalCancelBookings=$totalCancelBookings, totalConfirmBookings=$totalConfirmBookings, totalPendingBookings=$totalPendingBookings, totalRevenue=$totalRevenue]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
    if (this.bookingGrowth != null) {
      json[r'booking_growth'] = this.bookingGrowth;
    } else {
      json[r'booking_growth'] = null;
    }
    if (this.createdAt != null) {
      json[r'created_at'] = this.createdAt;
    } else {
      json[r'created_at'] = null;
    }
    if (this.date != null) {
      json[r'date'] = this.date;
    } else {
      json[r'date'] = null;
    }
    if (this.marketId != null) {
      json[r'market_id'] = this.marketId;
    } else {
      json[r'market_id'] = null;
    }
    if (this.occupancyRate != null) {
      json[r'occupancy_rate'] = this.occupancyRate;
    } else {
      json[r'occupancy_rate'] = null;
    }
    if (this.revenueGrowth != null) {
      json[r'revenue_growth'] = this.revenueGrowth;
    } else {
      json[r'revenue_growth'] = null;
    }
    if (this.topZone != null) {
      json[r'top_zone'] = this.topZone;
    } else {
      json[r'top_zone'] = null;
    }
    if (this.topZoneOccupancy != null) {
      json[r'top_zone_occupancy'] = this.topZoneOccupancy;
    } else {
      json[r'top_zone_occupancy'] = null;
    }
    if (this.totalBookings != null) {
      json[r'total_bookings'] = this.totalBookings;
    } else {
      json[r'total_bookings'] = null;
    }
    if (this.totalCancelBookings != null) {
      json[r'total_cancel_bookings'] = this.totalCancelBookings;
    } else {
      json[r'total_cancel_bookings'] = null;
    }
    if (this.totalConfirmBookings != null) {
      json[r'total_confirm_bookings'] = this.totalConfirmBookings;
    } else {
      json[r'total_confirm_bookings'] = null;
    }
    if (this.totalPendingBookings != null) {
      json[r'total_pending_bookings'] = this.totalPendingBookings;
    } else {
      json[r'total_pending_bookings'] = null;
    }
    if (this.totalRevenue != null) {
      json[r'total_revenue'] = this.totalRevenue;
    } else {
      json[r'total_revenue'] = null;
    }
    return json;
  }

  /// Returns a new [EntitiesMarketDashboardStats] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static EntitiesMarketDashboardStats? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "EntitiesMarketDashboardStats[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "EntitiesMarketDashboardStats[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return EntitiesMarketDashboardStats(
        bookingGrowth: num.parse('${json[r'booking_growth']}'),
        createdAt: mapValueOfType<String>(json, r'created_at'),
        date: mapValueOfType<String>(json, r'date'),
        marketId: mapValueOfType<String>(json, r'market_id'),
        occupancyRate: num.parse('${json[r'occupancy_rate']}'),
        revenueGrowth: num.parse('${json[r'revenue_growth']}'),
        topZone: mapValueOfType<String>(json, r'top_zone'),
        topZoneOccupancy: num.parse('${json[r'top_zone_occupancy']}'),
        totalBookings: mapValueOfType<int>(json, r'total_bookings'),
        totalCancelBookings: mapValueOfType<int>(json, r'total_cancel_bookings'),
        totalConfirmBookings: mapValueOfType<int>(json, r'total_confirm_bookings'),
        totalPendingBookings: mapValueOfType<int>(json, r'total_pending_bookings'),
        totalRevenue: num.parse('${json[r'total_revenue']}'),
      );
    }
    return null;
  }

  static List<EntitiesMarketDashboardStats> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <EntitiesMarketDashboardStats>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = EntitiesMarketDashboardStats.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, EntitiesMarketDashboardStats> mapFromJson(dynamic json) {
    final map = <String, EntitiesMarketDashboardStats>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = EntitiesMarketDashboardStats.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of EntitiesMarketDashboardStats-objects as value to a dart map
  static Map<String, List<EntitiesMarketDashboardStats>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<EntitiesMarketDashboardStats>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = EntitiesMarketDashboardStats.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}


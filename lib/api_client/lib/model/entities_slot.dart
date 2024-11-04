//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class EntitiesSlot {
  /// Returns a new [EntitiesSlot] instance.
  EntitiesSlot({
    this.booking = const [],
    this.category,
    this.createdAt,
    required this.date,
    this.deletedAt,
    this.height,
    this.id,
    this.marketId,
    this.name,
    this.price,
    this.status,
    this.updatedAt,
    this.width,
    this.zone,
  });

  List<EntitiesBooking> booking;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  EntitiesCategory? category;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? createdAt;

  String date;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? deletedAt;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  int? height;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? id;

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
  String? name;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  num? price;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  EntitiesSlotStatus? status;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? updatedAt;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  int? width;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? zone;

  @override
  bool operator ==(Object other) => identical(this, other) || other is EntitiesSlot &&
    _deepEquality.equals(other.booking, booking) &&
    other.category == category &&
    other.createdAt == createdAt &&
    other.date == date &&
    other.deletedAt == deletedAt &&
    other.height == height &&
    other.id == id &&
    other.marketId == marketId &&
    other.name == name &&
    other.price == price &&
    other.status == status &&
    other.updatedAt == updatedAt &&
    other.width == width &&
    other.zone == zone;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (booking.hashCode) +
    (category == null ? 0 : category!.hashCode) +
    (createdAt == null ? 0 : createdAt!.hashCode) +
    (date.hashCode) +
    (deletedAt == null ? 0 : deletedAt!.hashCode) +
    (height == null ? 0 : height!.hashCode) +
    (id == null ? 0 : id!.hashCode) +
    (marketId == null ? 0 : marketId!.hashCode) +
    (name == null ? 0 : name!.hashCode) +
    (price == null ? 0 : price!.hashCode) +
    (status == null ? 0 : status!.hashCode) +
    (updatedAt == null ? 0 : updatedAt!.hashCode) +
    (width == null ? 0 : width!.hashCode) +
    (zone == null ? 0 : zone!.hashCode);

  @override
  String toString() => 'EntitiesSlot[booking=$booking, category=$category, createdAt=$createdAt, date=$date, deletedAt=$deletedAt, height=$height, id=$id, marketId=$marketId, name=$name, price=$price, status=$status, updatedAt=$updatedAt, width=$width, zone=$zone]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
      json[r'booking'] = this.booking;
    if (this.category != null) {
      json[r'category'] = this.category;
    } else {
      json[r'category'] = null;
    }
    if (this.createdAt != null) {
      json[r'created_at'] = this.createdAt;
    } else {
      json[r'created_at'] = null;
    }
      json[r'date'] = this.date;
    if (this.deletedAt != null) {
      json[r'deleted_at'] = this.deletedAt;
    } else {
      json[r'deleted_at'] = null;
    }
    if (this.height != null) {
      json[r'height'] = this.height;
    } else {
      json[r'height'] = null;
    }
    if (this.id != null) {
      json[r'id'] = this.id;
    } else {
      json[r'id'] = null;
    }
    if (this.marketId != null) {
      json[r'market_id'] = this.marketId;
    } else {
      json[r'market_id'] = null;
    }
    if (this.name != null) {
      json[r'name'] = this.name;
    } else {
      json[r'name'] = null;
    }
    if (this.price != null) {
      json[r'price'] = this.price;
    } else {
      json[r'price'] = null;
    }
    if (this.status != null) {
      json[r'status'] = this.status;
    } else {
      json[r'status'] = null;
    }
    if (this.updatedAt != null) {
      json[r'updated_at'] = this.updatedAt;
    } else {
      json[r'updated_at'] = null;
    }
    if (this.width != null) {
      json[r'width'] = this.width;
    } else {
      json[r'width'] = null;
    }
    if (this.zone != null) {
      json[r'zone'] = this.zone;
    } else {
      json[r'zone'] = null;
    }
    return json;
  }

  /// Returns a new [EntitiesSlot] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static EntitiesSlot? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "EntitiesSlot[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "EntitiesSlot[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return EntitiesSlot(
        booking: EntitiesBooking.listFromJson(json[r'booking']),
        category: EntitiesCategory.fromJson(json[r'category']),
        createdAt: mapValueOfType<String>(json, r'created_at'),
        date: mapValueOfType<String>(json, r'date')!,
        deletedAt: mapValueOfType<String>(json, r'deleted_at'),
        height: mapValueOfType<int>(json, r'height'),
        id: mapValueOfType<String>(json, r'id'),
        marketId: mapValueOfType<String>(json, r'market_id'),
        name: mapValueOfType<String>(json, r'name'),
        price: num.parse('${json[r'price']}'),
        status: EntitiesSlotStatus.fromJson(json[r'status']),
        updatedAt: mapValueOfType<String>(json, r'updated_at'),
        width: mapValueOfType<int>(json, r'width'),
        zone: mapValueOfType<String>(json, r'zone'),
      );
    }
    return null;
  }

  static List<EntitiesSlot> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <EntitiesSlot>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = EntitiesSlot.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, EntitiesSlot> mapFromJson(dynamic json) {
    final map = <String, EntitiesSlot>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = EntitiesSlot.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of EntitiesSlot-objects as value to a dart map
  static Map<String, List<EntitiesSlot>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<EntitiesSlot>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = EntitiesSlot.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
    'date',
  };
}


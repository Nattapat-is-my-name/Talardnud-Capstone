//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class DtosBookingResponse {
  /// Returns a new [DtosBookingResponse] instance.
  DtosBookingResponse({
    this.bookingDate,
    this.expiresAt,
    this.id,
    this.image,
    this.method,
    this.price,
    this.slotId,
    this.status,
    this.transactionId,
    this.vendorId,
  });

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? bookingDate;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? expiresAt;

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
  String? image;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  EntitiesMethod? method;

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
  String? slotId;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  EntitiesBookingStatus? status;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? transactionId;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? vendorId;

  @override
  bool operator ==(Object other) => identical(this, other) || other is DtosBookingResponse &&
    other.bookingDate == bookingDate &&
    other.expiresAt == expiresAt &&
    other.id == id &&
    other.image == image &&
    other.method == method &&
    other.price == price &&
    other.slotId == slotId &&
    other.status == status &&
    other.transactionId == transactionId &&
    other.vendorId == vendorId;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (bookingDate == null ? 0 : bookingDate!.hashCode) +
    (expiresAt == null ? 0 : expiresAt!.hashCode) +
    (id == null ? 0 : id!.hashCode) +
    (image == null ? 0 : image!.hashCode) +
    (method == null ? 0 : method!.hashCode) +
    (price == null ? 0 : price!.hashCode) +
    (slotId == null ? 0 : slotId!.hashCode) +
    (status == null ? 0 : status!.hashCode) +
    (transactionId == null ? 0 : transactionId!.hashCode) +
    (vendorId == null ? 0 : vendorId!.hashCode);

  @override
  String toString() => 'DtosBookingResponse[bookingDate=$bookingDate, expiresAt=$expiresAt, id=$id, image=$image, method=$method, price=$price, slotId=$slotId, status=$status, transactionId=$transactionId, vendorId=$vendorId]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
    if (this.bookingDate != null) {
      json[r'bookingDate'] = this.bookingDate;
    } else {
      json[r'bookingDate'] = null;
    }
    if (this.expiresAt != null) {
      json[r'expiresAt'] = this.expiresAt;
    } else {
      json[r'expiresAt'] = null;
    }
    if (this.id != null) {
      json[r'id'] = this.id;
    } else {
      json[r'id'] = null;
    }
    if (this.image != null) {
      json[r'image'] = this.image;
    } else {
      json[r'image'] = null;
    }
    if (this.method != null) {
      json[r'method'] = this.method;
    } else {
      json[r'method'] = null;
    }
    if (this.price != null) {
      json[r'price'] = this.price;
    } else {
      json[r'price'] = null;
    }
    if (this.slotId != null) {
      json[r'slotId'] = this.slotId;
    } else {
      json[r'slotId'] = null;
    }
    if (this.status != null) {
      json[r'status'] = this.status;
    } else {
      json[r'status'] = null;
    }
    if (this.transactionId != null) {
      json[r'transactionId'] = this.transactionId;
    } else {
      json[r'transactionId'] = null;
    }
    if (this.vendorId != null) {
      json[r'vendorId'] = this.vendorId;
    } else {
      json[r'vendorId'] = null;
    }
    return json;
  }

  /// Returns a new [DtosBookingResponse] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static DtosBookingResponse? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "DtosBookingResponse[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "DtosBookingResponse[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return DtosBookingResponse(
        bookingDate: mapValueOfType<String>(json, r'bookingDate'),
        expiresAt: mapValueOfType<String>(json, r'expiresAt'),
        id: mapValueOfType<String>(json, r'id'),
        image: mapValueOfType<String>(json, r'image'),
        method: EntitiesMethod.fromJson(json[r'method']),
        price: num.parse('${json[r'price']}'),
        slotId: mapValueOfType<String>(json, r'slotId'),
        status: EntitiesBookingStatus.fromJson(json[r'status']),
        transactionId: mapValueOfType<String>(json, r'transactionId'),
        vendorId: mapValueOfType<String>(json, r'vendorId'),
      );
    }
    return null;
  }

  static List<DtosBookingResponse> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <DtosBookingResponse>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = DtosBookingResponse.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, DtosBookingResponse> mapFromJson(dynamic json) {
    final map = <String, DtosBookingResponse>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = DtosBookingResponse.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of DtosBookingResponse-objects as value to a dart map
  static Map<String, List<DtosBookingResponse>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<DtosBookingResponse>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = DtosBookingResponse.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}


//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class DtosMarketRequest {
  /// Returns a new [DtosMarketRequest] instance.
  DtosMarketRequest({
    required this.address,
    required this.closeTime,
    this.description,
    this.image,
    this.latitude,
    this.longitude,
    required this.name,
    required this.openTime,
    required this.providerId,
  });

  /// Required, address of the market
  String address;

  /// Required, closing time in HH:mm format
  String closeTime;

  /// Optional, description of the market
  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? description;

  /// Optional, URL or path to the market image
  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? image;

  /// Optional, latitude coordinate
  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? latitude;

  /// Optional, longitude coordinate
  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? longitude;

  /// Required, name of the market
  String name;

  /// Required, opening time in HH:mm format
  String openTime;

  /// Required, UUID of the provider
  String providerId;

  @override
  bool operator ==(Object other) => identical(this, other) || other is DtosMarketRequest &&
    other.address == address &&
    other.closeTime == closeTime &&
    other.description == description &&
    other.image == image &&
    other.latitude == latitude &&
    other.longitude == longitude &&
    other.name == name &&
    other.openTime == openTime &&
    other.providerId == providerId;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (address.hashCode) +
    (closeTime.hashCode) +
    (description == null ? 0 : description!.hashCode) +
    (image == null ? 0 : image!.hashCode) +
    (latitude == null ? 0 : latitude!.hashCode) +
    (longitude == null ? 0 : longitude!.hashCode) +
    (name.hashCode) +
    (openTime.hashCode) +
    (providerId.hashCode);

  @override
  String toString() => 'DtosMarketRequest[address=$address, closeTime=$closeTime, description=$description, image=$image, latitude=$latitude, longitude=$longitude, name=$name, openTime=$openTime, providerId=$providerId]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
      json[r'address'] = this.address;
      json[r'close_time'] = this.closeTime;
    if (this.description != null) {
      json[r'description'] = this.description;
    } else {
      json[r'description'] = null;
    }
    if (this.image != null) {
      json[r'image'] = this.image;
    } else {
      json[r'image'] = null;
    }
    if (this.latitude != null) {
      json[r'latitude'] = this.latitude;
    } else {
      json[r'latitude'] = null;
    }
    if (this.longitude != null) {
      json[r'longitude'] = this.longitude;
    } else {
      json[r'longitude'] = null;
    }
      json[r'name'] = this.name;
      json[r'open_time'] = this.openTime;
      json[r'provider_id'] = this.providerId;
    return json;
  }

  /// Returns a new [DtosMarketRequest] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static DtosMarketRequest? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "DtosMarketRequest[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "DtosMarketRequest[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return DtosMarketRequest(
        address: mapValueOfType<String>(json, r'address')!,
        closeTime: mapValueOfType<String>(json, r'close_time')!,
        description: mapValueOfType<String>(json, r'description'),
        image: mapValueOfType<String>(json, r'image'),
        latitude: mapValueOfType<String>(json, r'latitude'),
        longitude: mapValueOfType<String>(json, r'longitude'),
        name: mapValueOfType<String>(json, r'name')!,
        openTime: mapValueOfType<String>(json, r'open_time')!,
        providerId: mapValueOfType<String>(json, r'provider_id')!,
      );
    }
    return null;
  }

  static List<DtosMarketRequest> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <DtosMarketRequest>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = DtosMarketRequest.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, DtosMarketRequest> mapFromJson(dynamic json) {
    final map = <String, DtosMarketRequest>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = DtosMarketRequest.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of DtosMarketRequest-objects as value to a dart map
  static Map<String, List<DtosMarketRequest>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<DtosMarketRequest>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = DtosMarketRequest.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
    'address',
    'close_time',
    'name',
    'open_time',
    'provider_id',
  };
}


//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class DtosMarketEditRequest {
  /// Returns a new [DtosMarketEditRequest] instance.
  DtosMarketEditRequest({
    required this.address,
    required this.closeTime,
    this.description,
    this.image,
    this.latitude,
    this.layoutImage,
    this.longitude,
    required this.name,
    required this.openTime,
    this.phone,
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

  /// Optional, URL or path to the market layout image
  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? layoutImage;

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

  /// Optional, phone number of the market
  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? phone;

  /// Required, UUID of the provider
  String providerId;

  @override
  bool operator ==(Object other) => identical(this, other) || other is DtosMarketEditRequest &&
    other.address == address &&
    other.closeTime == closeTime &&
    other.description == description &&
    other.image == image &&
    other.latitude == latitude &&
    other.layoutImage == layoutImage &&
    other.longitude == longitude &&
    other.name == name &&
    other.openTime == openTime &&
    other.phone == phone &&
    other.providerId == providerId;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (address.hashCode) +
    (closeTime.hashCode) +
    (description == null ? 0 : description!.hashCode) +
    (image == null ? 0 : image!.hashCode) +
    (latitude == null ? 0 : latitude!.hashCode) +
    (layoutImage == null ? 0 : layoutImage!.hashCode) +
    (longitude == null ? 0 : longitude!.hashCode) +
    (name.hashCode) +
    (openTime.hashCode) +
    (phone == null ? 0 : phone!.hashCode) +
    (providerId.hashCode);

  @override
  String toString() => 'DtosMarketEditRequest[address=$address, closeTime=$closeTime, description=$description, image=$image, latitude=$latitude, layoutImage=$layoutImage, longitude=$longitude, name=$name, openTime=$openTime, phone=$phone, providerId=$providerId]';

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
    if (this.layoutImage != null) {
      json[r'layout_image'] = this.layoutImage;
    } else {
      json[r'layout_image'] = null;
    }
    if (this.longitude != null) {
      json[r'longitude'] = this.longitude;
    } else {
      json[r'longitude'] = null;
    }
      json[r'name'] = this.name;
      json[r'open_time'] = this.openTime;
    if (this.phone != null) {
      json[r'phone'] = this.phone;
    } else {
      json[r'phone'] = null;
    }
      json[r'provider_id'] = this.providerId;
    return json;
  }

  /// Returns a new [DtosMarketEditRequest] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static DtosMarketEditRequest? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "DtosMarketEditRequest[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "DtosMarketEditRequest[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return DtosMarketEditRequest(
        address: mapValueOfType<String>(json, r'address')!,
        closeTime: mapValueOfType<String>(json, r'close_time')!,
        description: mapValueOfType<String>(json, r'description'),
        image: mapValueOfType<String>(json, r'image'),
        latitude: mapValueOfType<String>(json, r'latitude'),
        layoutImage: mapValueOfType<String>(json, r'layout_image'),
        longitude: mapValueOfType<String>(json, r'longitude'),
        name: mapValueOfType<String>(json, r'name')!,
        openTime: mapValueOfType<String>(json, r'open_time')!,
        phone: mapValueOfType<String>(json, r'phone'),
        providerId: mapValueOfType<String>(json, r'provider_id')!,
      );
    }
    return null;
  }

  static List<DtosMarketEditRequest> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <DtosMarketEditRequest>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = DtosMarketEditRequest.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, DtosMarketEditRequest> mapFromJson(dynamic json) {
    final map = <String, DtosMarketEditRequest>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = DtosMarketEditRequest.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of DtosMarketEditRequest-objects as value to a dart map
  static Map<String, List<DtosMarketEditRequest>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<DtosMarketEditRequest>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = DtosMarketEditRequest.listFromJson(entry.value, growable: growable,);
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


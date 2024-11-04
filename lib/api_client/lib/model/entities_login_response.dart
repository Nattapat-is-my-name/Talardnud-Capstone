//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class EntitiesLoginResponse {
  /// Returns a new [EntitiesLoginResponse] instance.
  EntitiesLoginResponse({
    this.accessToken,
    this.vendorId,
  });

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? accessToken;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? vendorId;

  @override
  bool operator ==(Object other) => identical(this, other) || other is EntitiesLoginResponse &&
    other.accessToken == accessToken &&
    other.vendorId == vendorId;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (accessToken == null ? 0 : accessToken!.hashCode) +
    (vendorId == null ? 0 : vendorId!.hashCode);

  @override
  String toString() => 'EntitiesLoginResponse[accessToken=$accessToken, vendorId=$vendorId]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
    if (this.accessToken != null) {
      json[r'access_token'] = this.accessToken;
    } else {
      json[r'access_token'] = null;
    }
    if (this.vendorId != null) {
      json[r'vendor_id'] = this.vendorId;
    } else {
      json[r'vendor_id'] = null;
    }
    return json;
  }

  /// Returns a new [EntitiesLoginResponse] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static EntitiesLoginResponse? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "EntitiesLoginResponse[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "EntitiesLoginResponse[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return EntitiesLoginResponse(
        accessToken: mapValueOfType<String>(json, r'access_token'),
        vendorId: mapValueOfType<String>(json, r'vendor_id'),
      );
    }
    return null;
  }

  static List<EntitiesLoginResponse> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <EntitiesLoginResponse>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = EntitiesLoginResponse.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, EntitiesLoginResponse> mapFromJson(dynamic json) {
    final map = <String, EntitiesLoginResponse>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = EntitiesLoginResponse.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of EntitiesLoginResponse-objects as value to a dart map
  static Map<String, List<EntitiesLoginResponse>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<EntitiesLoginResponse>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = EntitiesLoginResponse.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}


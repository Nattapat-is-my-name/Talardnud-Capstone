//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class EntitiesLoginRequest {
  /// Returns a new [EntitiesLoginRequest] instance.
  EntitiesLoginRequest({
    required this.password,
    required this.usernameOrEmail,
  });

  /// Password must be provided and at least 8 characters long
  String password;

  /// Accepts either username or email
  String usernameOrEmail;

  @override
  bool operator ==(Object other) => identical(this, other) || other is EntitiesLoginRequest &&
    other.password == password &&
    other.usernameOrEmail == usernameOrEmail;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (password.hashCode) +
    (usernameOrEmail.hashCode);

  @override
  String toString() => 'EntitiesLoginRequest[password=$password, usernameOrEmail=$usernameOrEmail]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
      json[r'password'] = this.password;
      json[r'username_or_email'] = this.usernameOrEmail;
    return json;
  }

  /// Returns a new [EntitiesLoginRequest] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static EntitiesLoginRequest? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "EntitiesLoginRequest[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "EntitiesLoginRequest[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return EntitiesLoginRequest(
        password: mapValueOfType<String>(json, r'password')!,
        usernameOrEmail: mapValueOfType<String>(json, r'username_or_email')!,
      );
    }
    return null;
  }

  static List<EntitiesLoginRequest> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <EntitiesLoginRequest>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = EntitiesLoginRequest.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, EntitiesLoginRequest> mapFromJson(dynamic json) {
    final map = <String, EntitiesLoginRequest>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = EntitiesLoginRequest.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of EntitiesLoginRequest-objects as value to a dart map
  static Map<String, List<EntitiesLoginRequest>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<EntitiesLoginRequest>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = EntitiesLoginRequest.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
    'password',
    'username_or_email',
  };
}


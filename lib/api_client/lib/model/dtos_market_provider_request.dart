//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class DtosMarketProviderRequest {
  /// Returns a new [DtosMarketProviderRequest] instance.
  DtosMarketProviderRequest({
    required this.email,
    required this.password,
    required this.phone,
    required this.username,
  });

  /// Required, email address of the provider
  String email;

  /// Required, password of the provider
  String password;

  /// Required, phone number of the provider
  String phone;

  /// Required, username of the provider
  String username;

  @override
  bool operator ==(Object other) => identical(this, other) || other is DtosMarketProviderRequest &&
    other.email == email &&
    other.password == password &&
    other.phone == phone &&
    other.username == username;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (email.hashCode) +
    (password.hashCode) +
    (phone.hashCode) +
    (username.hashCode);

  @override
  String toString() => 'DtosMarketProviderRequest[email=$email, password=$password, phone=$phone, username=$username]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
      json[r'email'] = this.email;
      json[r'password'] = this.password;
      json[r'phone'] = this.phone;
      json[r'username'] = this.username;
    return json;
  }

  /// Returns a new [DtosMarketProviderRequest] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static DtosMarketProviderRequest? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "DtosMarketProviderRequest[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "DtosMarketProviderRequest[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return DtosMarketProviderRequest(
        email: mapValueOfType<String>(json, r'email')!,
        password: mapValueOfType<String>(json, r'password')!,
        phone: mapValueOfType<String>(json, r'phone')!,
        username: mapValueOfType<String>(json, r'username')!,
      );
    }
    return null;
  }

  static List<DtosMarketProviderRequest> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <DtosMarketProviderRequest>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = DtosMarketProviderRequest.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, DtosMarketProviderRequest> mapFromJson(dynamic json) {
    final map = <String, DtosMarketProviderRequest>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = DtosMarketProviderRequest.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of DtosMarketProviderRequest-objects as value to a dart map
  static Map<String, List<DtosMarketProviderRequest>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<DtosMarketProviderRequest>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = DtosMarketProviderRequest.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
    'email',
    'password',
    'phone',
    'username',
  };
}


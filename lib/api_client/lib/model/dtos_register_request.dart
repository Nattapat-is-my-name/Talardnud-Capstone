//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class DtosRegisterRequest {
  /// Returns a new [DtosRegisterRequest] instance.
  DtosRegisterRequest({
    required this.email,
    required this.firstname,
    required this.lastname,
    required this.password,
    required this.phoneNumber,
    required this.username,
  });

  /// Required, must be a valid email format
  String email;

  /// Required, min 3, max 50 characters
  String firstname;

  /// Required, min 3, max 50 characters
  String lastname;

  /// Required, min 8 characters for password
  String password;

  /// Required, adjust based on the expected format=
  String phoneNumber;

  /// Required, min 3, max 50 characters
  String username;

  @override
  bool operator ==(Object other) => identical(this, other) || other is DtosRegisterRequest &&
    other.email == email &&
    other.firstname == firstname &&
    other.lastname == lastname &&
    other.password == password &&
    other.phoneNumber == phoneNumber &&
    other.username == username;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (email.hashCode) +
    (firstname.hashCode) +
    (lastname.hashCode) +
    (password.hashCode) +
    (phoneNumber.hashCode) +
    (username.hashCode);

  @override
  String toString() => 'DtosRegisterRequest[email=$email, firstname=$firstname, lastname=$lastname, password=$password, phoneNumber=$phoneNumber, username=$username]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
      json[r'email'] = this.email;
      json[r'firstname'] = this.firstname;
      json[r'lastname'] = this.lastname;
      json[r'password'] = this.password;
      json[r'phone_number'] = this.phoneNumber;
      json[r'username'] = this.username;
    return json;
  }

  /// Returns a new [DtosRegisterRequest] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static DtosRegisterRequest? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "DtosRegisterRequest[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "DtosRegisterRequest[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return DtosRegisterRequest(
        email: mapValueOfType<String>(json, r'email')!,
        firstname: mapValueOfType<String>(json, r'firstname')!,
        lastname: mapValueOfType<String>(json, r'lastname')!,
        password: mapValueOfType<String>(json, r'password')!,
        phoneNumber: mapValueOfType<String>(json, r'phone_number')!,
        username: mapValueOfType<String>(json, r'username')!,
      );
    }
    return null;
  }

  static List<DtosRegisterRequest> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <DtosRegisterRequest>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = DtosRegisterRequest.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, DtosRegisterRequest> mapFromJson(dynamic json) {
    final map = <String, DtosRegisterRequest>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = DtosRegisterRequest.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of DtosRegisterRequest-objects as value to a dart map
  static Map<String, List<DtosRegisterRequest>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<DtosRegisterRequest>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = DtosRegisterRequest.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
    'email',
    'firstname',
    'lastname',
    'password',
    'phone_number',
    'username',
  };
}


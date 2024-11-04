//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class DtosRegisterResponse {
  /// Returns a new [DtosRegisterResponse] instance.
  DtosRegisterResponse({
    this.email,
    this.firstname,
    this.id,
    this.lastname,
    this.phone,
    this.username,
  });

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? email;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? firstname;

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
  String? lastname;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? phone;

  ///
  /// Please note: This property should have been non-nullable! Since the specification file
  /// does not include a default value (using the "default:" property), however, the generated
  /// source code must fall back to having a nullable type.
  /// Consider adding a "default:" property in the specification file to hide this note.
  ///
  String? username;

  @override
  bool operator ==(Object other) => identical(this, other) || other is DtosRegisterResponse &&
    other.email == email &&
    other.firstname == firstname &&
    other.id == id &&
    other.lastname == lastname &&
    other.phone == phone &&
    other.username == username;

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (email == null ? 0 : email!.hashCode) +
    (firstname == null ? 0 : firstname!.hashCode) +
    (id == null ? 0 : id!.hashCode) +
    (lastname == null ? 0 : lastname!.hashCode) +
    (phone == null ? 0 : phone!.hashCode) +
    (username == null ? 0 : username!.hashCode);

  @override
  String toString() => 'DtosRegisterResponse[email=$email, firstname=$firstname, id=$id, lastname=$lastname, phone=$phone, username=$username]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
    if (this.email != null) {
      json[r'email'] = this.email;
    } else {
      json[r'email'] = null;
    }
    if (this.firstname != null) {
      json[r'firstname'] = this.firstname;
    } else {
      json[r'firstname'] = null;
    }
    if (this.id != null) {
      json[r'id'] = this.id;
    } else {
      json[r'id'] = null;
    }
    if (this.lastname != null) {
      json[r'lastname'] = this.lastname;
    } else {
      json[r'lastname'] = null;
    }
    if (this.phone != null) {
      json[r'phone'] = this.phone;
    } else {
      json[r'phone'] = null;
    }
    if (this.username != null) {
      json[r'username'] = this.username;
    } else {
      json[r'username'] = null;
    }
    return json;
  }

  /// Returns a new [DtosRegisterResponse] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static DtosRegisterResponse? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "DtosRegisterResponse[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "DtosRegisterResponse[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return DtosRegisterResponse(
        email: mapValueOfType<String>(json, r'email'),
        firstname: mapValueOfType<String>(json, r'firstname'),
        id: mapValueOfType<String>(json, r'id'),
        lastname: mapValueOfType<String>(json, r'lastname'),
        phone: mapValueOfType<String>(json, r'phone'),
        username: mapValueOfType<String>(json, r'username'),
      );
    }
    return null;
  }

  static List<DtosRegisterResponse> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <DtosRegisterResponse>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = DtosRegisterResponse.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, DtosRegisterResponse> mapFromJson(dynamic json) {
    final map = <String, DtosRegisterResponse>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = DtosRegisterResponse.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of DtosRegisterResponse-objects as value to a dart map
  static Map<String, List<DtosRegisterResponse>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<DtosRegisterResponse>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = DtosRegisterResponse.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}


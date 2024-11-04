//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class DtosLayoutRequest {
  /// Returns a new [DtosLayoutRequest] instance.
  DtosLayoutRequest({
    this.layout = const [],
  });

  List<DtosZoneLayout> layout;

  @override
  bool operator ==(Object other) => identical(this, other) || other is DtosLayoutRequest &&
    _deepEquality.equals(other.layout, layout);

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (layout.hashCode);

  @override
  String toString() => 'DtosLayoutRequest[layout=$layout]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
      json[r'layout'] = this.layout;
    return json;
  }

  /// Returns a new [DtosLayoutRequest] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static DtosLayoutRequest? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "DtosLayoutRequest[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "DtosLayoutRequest[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return DtosLayoutRequest(
        layout: DtosZoneLayout.listFromJson(json[r'layout']),
      );
    }
    return null;
  }

  static List<DtosLayoutRequest> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <DtosLayoutRequest>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = DtosLayoutRequest.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, DtosLayoutRequest> mapFromJson(dynamic json) {
    final map = <String, DtosLayoutRequest>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = DtosLayoutRequest.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of DtosLayoutRequest-objects as value to a dart map
  static Map<String, List<DtosLayoutRequest>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<DtosLayoutRequest>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = DtosLayoutRequest.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}


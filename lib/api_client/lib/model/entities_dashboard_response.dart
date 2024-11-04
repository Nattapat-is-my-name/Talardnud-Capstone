//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;

class EntitiesDashboardResponse {
  /// Returns a new [EntitiesDashboardResponse] instance.
  EntitiesDashboardResponse({
    this.stats = const [],
  });

  /// Changed to slice
  List<EntitiesMarketDashboardStats> stats;

  @override
  bool operator ==(Object other) => identical(this, other) || other is EntitiesDashboardResponse &&
    _deepEquality.equals(other.stats, stats);

  @override
  int get hashCode =>
    // ignore: unnecessary_parenthesis
    (stats.hashCode);

  @override
  String toString() => 'EntitiesDashboardResponse[stats=$stats]';

  Map<String, dynamic> toJson() {
    final json = <String, dynamic>{};
      json[r'stats'] = this.stats;
    return json;
  }

  /// Returns a new [EntitiesDashboardResponse] instance and imports its values from
  /// [value] if it's a [Map], null otherwise.
  // ignore: prefer_constructors_over_static_methods
  static EntitiesDashboardResponse? fromJson(dynamic value) {
    if (value is Map) {
      final json = value.cast<String, dynamic>();

      // Ensure that the map contains the required keys.
      // Note 1: the values aren't checked for validity beyond being non-null.
      // Note 2: this code is stripped in release mode!
      assert(() {
        requiredKeys.forEach((key) {
          assert(json.containsKey(key), 'Required key "EntitiesDashboardResponse[$key]" is missing from JSON.');
          assert(json[key] != null, 'Required key "EntitiesDashboardResponse[$key]" has a null value in JSON.');
        });
        return true;
      }());

      return EntitiesDashboardResponse(
        stats: EntitiesMarketDashboardStats.listFromJson(json[r'stats']),
      );
    }
    return null;
  }

  static List<EntitiesDashboardResponse> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <EntitiesDashboardResponse>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = EntitiesDashboardResponse.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }

  static Map<String, EntitiesDashboardResponse> mapFromJson(dynamic json) {
    final map = <String, EntitiesDashboardResponse>{};
    if (json is Map && json.isNotEmpty) {
      json = json.cast<String, dynamic>(); // ignore: parameter_assignments
      for (final entry in json.entries) {
        final value = EntitiesDashboardResponse.fromJson(entry.value);
        if (value != null) {
          map[entry.key] = value;
        }
      }
    }
    return map;
  }

  // maps a json object with a list of EntitiesDashboardResponse-objects as value to a dart map
  static Map<String, List<EntitiesDashboardResponse>> mapListFromJson(dynamic json, {bool growable = false,}) {
    final map = <String, List<EntitiesDashboardResponse>>{};
    if (json is Map && json.isNotEmpty) {
      // ignore: parameter_assignments
      json = json.cast<String, dynamic>();
      for (final entry in json.entries) {
        map[entry.key] = EntitiesDashboardResponse.listFromJson(entry.value, growable: growable,);
      }
    }
    return map;
  }

  /// The list of required keys that must be present in a JSON.
  static const requiredKeys = <String>{
  };
}


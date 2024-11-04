//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;


class EntitiesSlotStatus {
  /// Instantiate a new enum with the provided [value].
  const EntitiesSlotStatus._(this.value);

  /// The underlying value of this enum member.
  final String value;

  @override
  String toString() => value;

  String toJson() => value;

  static const StatusAvailable = EntitiesSlotStatus._(r'available');
  static const StatusBooked = EntitiesSlotStatus._(r'booked');
  static const StatusMaintenance = EntitiesSlotStatus._(r'maintenance');

  /// List of all possible values in this [enum][EntitiesSlotStatus].
  static const values = <EntitiesSlotStatus>[
    StatusAvailable,
    StatusBooked,
    StatusMaintenance,
  ];

  static EntitiesSlotStatus? fromJson(dynamic value) => EntitiesSlotStatusTypeTransformer().decode(value);

  static List<EntitiesSlotStatus> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <EntitiesSlotStatus>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = EntitiesSlotStatus.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }
}

/// Transformation class that can [encode] an instance of [EntitiesSlotStatus] to String,
/// and [decode] dynamic data back to [EntitiesSlotStatus].
class EntitiesSlotStatusTypeTransformer {
  factory EntitiesSlotStatusTypeTransformer() => _instance ??= const EntitiesSlotStatusTypeTransformer._();

  const EntitiesSlotStatusTypeTransformer._();

  String encode(EntitiesSlotStatus data) => data.value;

  /// Decodes a [dynamic value][data] to a EntitiesSlotStatus.
  ///
  /// If [allowNull] is true and the [dynamic value][data] cannot be decoded successfully,
  /// then null is returned. However, if [allowNull] is false and the [dynamic value][data]
  /// cannot be decoded successfully, then an [UnimplementedError] is thrown.
  ///
  /// The [allowNull] is very handy when an API changes and a new enum value is added or removed,
  /// and users are still using an old app with the old code.
  EntitiesSlotStatus? decode(dynamic data, {bool allowNull = true}) {
    if (data != null) {
      switch (data) {
        case r'available': return EntitiesSlotStatus.StatusAvailable;
        case r'booked': return EntitiesSlotStatus.StatusBooked;
        case r'maintenance': return EntitiesSlotStatus.StatusMaintenance;
        default:
          if (!allowNull) {
            throw ArgumentError('Unknown enum value to decode: $data');
          }
      }
    }
    return null;
  }

  /// Singleton [EntitiesSlotStatusTypeTransformer] instance.
  static EntitiesSlotStatusTypeTransformer? _instance;
}


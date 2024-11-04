//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;


class EntitiesBookingStatus {
  /// Instantiate a new enum with the provided [value].
  const EntitiesBookingStatus._(this.value);

  /// The underlying value of this enum member.
  final String value;

  @override
  String toString() => value;

  String toJson() => value;

  static const StatusPending = EntitiesBookingStatus._(r'pending');
  static const StatusCancelled = EntitiesBookingStatus._(r'cancelled');
  static const StatusCompleted = EntitiesBookingStatus._(r'completed');
  static const StatusRefunded = EntitiesBookingStatus._(r'refund');

  /// List of all possible values in this [enum][EntitiesBookingStatus].
  static const values = <EntitiesBookingStatus>[
    StatusPending,
    StatusCancelled,
    StatusCompleted,
    StatusRefunded,
  ];

  static EntitiesBookingStatus? fromJson(dynamic value) => EntitiesBookingStatusTypeTransformer().decode(value);

  static List<EntitiesBookingStatus> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <EntitiesBookingStatus>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = EntitiesBookingStatus.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }
}

/// Transformation class that can [encode] an instance of [EntitiesBookingStatus] to String,
/// and [decode] dynamic data back to [EntitiesBookingStatus].
class EntitiesBookingStatusTypeTransformer {
  factory EntitiesBookingStatusTypeTransformer() => _instance ??= const EntitiesBookingStatusTypeTransformer._();

  const EntitiesBookingStatusTypeTransformer._();

  String encode(EntitiesBookingStatus data) => data.value;

  /// Decodes a [dynamic value][data] to a EntitiesBookingStatus.
  ///
  /// If [allowNull] is true and the [dynamic value][data] cannot be decoded successfully,
  /// then null is returned. However, if [allowNull] is false and the [dynamic value][data]
  /// cannot be decoded successfully, then an [UnimplementedError] is thrown.
  ///
  /// The [allowNull] is very handy when an API changes and a new enum value is added or removed,
  /// and users are still using an old app with the old code.
  EntitiesBookingStatus? decode(dynamic data, {bool allowNull = true}) {
    if (data != null) {
      switch (data) {
        case r'pending': return EntitiesBookingStatus.StatusPending;
        case r'cancelled': return EntitiesBookingStatus.StatusCancelled;
        case r'completed': return EntitiesBookingStatus.StatusCompleted;
        case r'refund': return EntitiesBookingStatus.StatusRefunded;
        default:
          if (!allowNull) {
            throw ArgumentError('Unknown enum value to decode: $data');
          }
      }
    }
    return null;
  }

  /// Singleton [EntitiesBookingStatusTypeTransformer] instance.
  static EntitiesBookingStatusTypeTransformer? _instance;
}


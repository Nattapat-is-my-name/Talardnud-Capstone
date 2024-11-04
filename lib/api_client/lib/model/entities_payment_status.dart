//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;


class EntitiesPaymentStatus {
  /// Instantiate a new enum with the provided [value].
  const EntitiesPaymentStatus._(this.value);

  /// The underlying value of this enum member.
  final String value;

  @override
  String toString() => value;

  String toJson() => value;

  static const PaymentPending = EntitiesPaymentStatus._(r'pending');
  static const PaymentCompleted = EntitiesPaymentStatus._(r'completed');
  static const PaymentFailed = EntitiesPaymentStatus._(r'failed');
  static const PaymentRefunded = EntitiesPaymentStatus._(r'refund');

  /// List of all possible values in this [enum][EntitiesPaymentStatus].
  static const values = <EntitiesPaymentStatus>[
    PaymentPending,
    PaymentCompleted,
    PaymentFailed,
    PaymentRefunded,
  ];

  static EntitiesPaymentStatus? fromJson(dynamic value) => EntitiesPaymentStatusTypeTransformer().decode(value);

  static List<EntitiesPaymentStatus> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <EntitiesPaymentStatus>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = EntitiesPaymentStatus.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }
}

/// Transformation class that can [encode] an instance of [EntitiesPaymentStatus] to String,
/// and [decode] dynamic data back to [EntitiesPaymentStatus].
class EntitiesPaymentStatusTypeTransformer {
  factory EntitiesPaymentStatusTypeTransformer() => _instance ??= const EntitiesPaymentStatusTypeTransformer._();

  const EntitiesPaymentStatusTypeTransformer._();

  String encode(EntitiesPaymentStatus data) => data.value;

  /// Decodes a [dynamic value][data] to a EntitiesPaymentStatus.
  ///
  /// If [allowNull] is true and the [dynamic value][data] cannot be decoded successfully,
  /// then null is returned. However, if [allowNull] is false and the [dynamic value][data]
  /// cannot be decoded successfully, then an [UnimplementedError] is thrown.
  ///
  /// The [allowNull] is very handy when an API changes and a new enum value is added or removed,
  /// and users are still using an old app with the old code.
  EntitiesPaymentStatus? decode(dynamic data, {bool allowNull = true}) {
    if (data != null) {
      switch (data) {
        case r'pending': return EntitiesPaymentStatus.PaymentPending;
        case r'completed': return EntitiesPaymentStatus.PaymentCompleted;
        case r'failed': return EntitiesPaymentStatus.PaymentFailed;
        case r'refund': return EntitiesPaymentStatus.PaymentRefunded;
        default:
          if (!allowNull) {
            throw ArgumentError('Unknown enum value to decode: $data');
          }
      }
    }
    return null;
  }

  /// Singleton [EntitiesPaymentStatusTypeTransformer] instance.
  static EntitiesPaymentStatusTypeTransformer? _instance;
}


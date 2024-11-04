//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;


class EntitiesTransactionStatus {
  /// Instantiate a new enum with the provided [value].
  const EntitiesTransactionStatus._(this.value);

  /// The underlying value of this enum member.
  final String value;

  @override
  String toString() => value;

  String toJson() => value;

  static const TransactionPending = EntitiesTransactionStatus._(r'pending');
  static const TransactionCompleted = EntitiesTransactionStatus._(r'completed');
  static const TransactionFailed = EntitiesTransactionStatus._(r'failed');
  static const TransactionRefunded = EntitiesTransactionStatus._(r'refund');

  /// List of all possible values in this [enum][EntitiesTransactionStatus].
  static const values = <EntitiesTransactionStatus>[
    TransactionPending,
    TransactionCompleted,
    TransactionFailed,
    TransactionRefunded,
  ];

  static EntitiesTransactionStatus? fromJson(dynamic value) => EntitiesTransactionStatusTypeTransformer().decode(value);

  static List<EntitiesTransactionStatus> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <EntitiesTransactionStatus>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = EntitiesTransactionStatus.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }
}

/// Transformation class that can [encode] an instance of [EntitiesTransactionStatus] to String,
/// and [decode] dynamic data back to [EntitiesTransactionStatus].
class EntitiesTransactionStatusTypeTransformer {
  factory EntitiesTransactionStatusTypeTransformer() => _instance ??= const EntitiesTransactionStatusTypeTransformer._();

  const EntitiesTransactionStatusTypeTransformer._();

  String encode(EntitiesTransactionStatus data) => data.value;

  /// Decodes a [dynamic value][data] to a EntitiesTransactionStatus.
  ///
  /// If [allowNull] is true and the [dynamic value][data] cannot be decoded successfully,
  /// then null is returned. However, if [allowNull] is false and the [dynamic value][data]
  /// cannot be decoded successfully, then an [UnimplementedError] is thrown.
  ///
  /// The [allowNull] is very handy when an API changes and a new enum value is added or removed,
  /// and users are still using an old app with the old code.
  EntitiesTransactionStatus? decode(dynamic data, {bool allowNull = true}) {
    if (data != null) {
      switch (data) {
        case r'pending': return EntitiesTransactionStatus.TransactionPending;
        case r'completed': return EntitiesTransactionStatus.TransactionCompleted;
        case r'failed': return EntitiesTransactionStatus.TransactionFailed;
        case r'refund': return EntitiesTransactionStatus.TransactionRefunded;
        default:
          if (!allowNull) {
            throw ArgumentError('Unknown enum value to decode: $data');
          }
      }
    }
    return null;
  }

  /// Singleton [EntitiesTransactionStatusTypeTransformer] instance.
  static EntitiesTransactionStatusTypeTransformer? _instance;
}


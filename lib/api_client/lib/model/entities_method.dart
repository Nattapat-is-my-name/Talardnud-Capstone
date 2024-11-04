//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;


class EntitiesMethod {
  /// Instantiate a new enum with the provided [value].
  const EntitiesMethod._(this.value);

  /// The underlying value of this enum member.
  final String value;

  @override
  String toString() => value;

  String toJson() => value;

  static const MethodPromptPay = EntitiesMethod._(r'PromptPay');

  /// List of all possible values in this [enum][EntitiesMethod].
  static const values = <EntitiesMethod>[
    MethodPromptPay,
  ];

  static EntitiesMethod? fromJson(dynamic value) => EntitiesMethodTypeTransformer().decode(value);

  static List<EntitiesMethod> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <EntitiesMethod>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = EntitiesMethod.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }
}

/// Transformation class that can [encode] an instance of [EntitiesMethod] to String,
/// and [decode] dynamic data back to [EntitiesMethod].
class EntitiesMethodTypeTransformer {
  factory EntitiesMethodTypeTransformer() => _instance ??= const EntitiesMethodTypeTransformer._();

  const EntitiesMethodTypeTransformer._();

  String encode(EntitiesMethod data) => data.value;

  /// Decodes a [dynamic value][data] to a EntitiesMethod.
  ///
  /// If [allowNull] is true and the [dynamic value][data] cannot be decoded successfully,
  /// then null is returned. However, if [allowNull] is false and the [dynamic value][data]
  /// cannot be decoded successfully, then an [UnimplementedError] is thrown.
  ///
  /// The [allowNull] is very handy when an API changes and a new enum value is added or removed,
  /// and users are still using an old app with the old code.
  EntitiesMethod? decode(dynamic data, {bool allowNull = true}) {
    if (data != null) {
      switch (data) {
        case r'PromptPay': return EntitiesMethod.MethodPromptPay;
        default:
          if (!allowNull) {
            throw ArgumentError('Unknown enum value to decode: $data');
          }
      }
    }
    return null;
  }

  /// Singleton [EntitiesMethodTypeTransformer] instance.
  static EntitiesMethodTypeTransformer? _instance;
}


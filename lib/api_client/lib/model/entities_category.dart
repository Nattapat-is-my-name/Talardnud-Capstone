//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;


class EntitiesCategory {
  /// Instantiate a new enum with the provided [value].
  const EntitiesCategory._(this.value);

  /// The underlying value of this enum member.
  final String value;

  @override
  String toString() => value;

  String toJson() => value;

  static const CategoryClothes = EntitiesCategory._(r'clothes');
  static const CategoryFood = EntitiesCategory._(r'food');
  static const CategoryCrafts = EntitiesCategory._(r'crafts');
  static const CategoryProduce = EntitiesCategory._(r'produce');
  static const CategoryElectronics = EntitiesCategory._(r'electronics');
  static const CategoryServices = EntitiesCategory._(r'services');
  static const CategoryOther = EntitiesCategory._(r'other');

  /// List of all possible values in this [enum][EntitiesCategory].
  static const values = <EntitiesCategory>[
    CategoryClothes,
    CategoryFood,
    CategoryCrafts,
    CategoryProduce,
    CategoryElectronics,
    CategoryServices,
    CategoryOther,
  ];

  static EntitiesCategory? fromJson(dynamic value) => EntitiesCategoryTypeTransformer().decode(value);

  static List<EntitiesCategory> listFromJson(dynamic json, {bool growable = false,}) {
    final result = <EntitiesCategory>[];
    if (json is List && json.isNotEmpty) {
      for (final row in json) {
        final value = EntitiesCategory.fromJson(row);
        if (value != null) {
          result.add(value);
        }
      }
    }
    return result.toList(growable: growable);
  }
}

/// Transformation class that can [encode] an instance of [EntitiesCategory] to String,
/// and [decode] dynamic data back to [EntitiesCategory].
class EntitiesCategoryTypeTransformer {
  factory EntitiesCategoryTypeTransformer() => _instance ??= const EntitiesCategoryTypeTransformer._();

  const EntitiesCategoryTypeTransformer._();

  String encode(EntitiesCategory data) => data.value;

  /// Decodes a [dynamic value][data] to a EntitiesCategory.
  ///
  /// If [allowNull] is true and the [dynamic value][data] cannot be decoded successfully,
  /// then null is returned. However, if [allowNull] is false and the [dynamic value][data]
  /// cannot be decoded successfully, then an [UnimplementedError] is thrown.
  ///
  /// The [allowNull] is very handy when an API changes and a new enum value is added or removed,
  /// and users are still using an old app with the old code.
  EntitiesCategory? decode(dynamic data, {bool allowNull = true}) {
    if (data != null) {
      switch (data) {
        case r'clothes': return EntitiesCategory.CategoryClothes;
        case r'food': return EntitiesCategory.CategoryFood;
        case r'crafts': return EntitiesCategory.CategoryCrafts;
        case r'produce': return EntitiesCategory.CategoryProduce;
        case r'electronics': return EntitiesCategory.CategoryElectronics;
        case r'services': return EntitiesCategory.CategoryServices;
        case r'other': return EntitiesCategory.CategoryOther;
        default:
          if (!allowNull) {
            throw ArgumentError('Unknown enum value to decode: $data');
          }
      }
    }
    return null;
  }

  /// Singleton [EntitiesCategoryTypeTransformer] instance.
  static EntitiesCategoryTypeTransformer? _instance;
}


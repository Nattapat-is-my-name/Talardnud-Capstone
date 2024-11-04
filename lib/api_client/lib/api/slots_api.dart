//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;


class SlotsApi {
  SlotsApi([ApiClient? apiClient]) : apiClient = apiClient ?? defaultApiClient;

  final ApiClient apiClient;

  /// Delete slot
  ///
  /// Delete slot
  ///
  /// Note: This method returns the HTTP [Response].
  ///
  /// Parameters:
  ///
  /// * [String] id (required):
  ///   Slot ID
  Future<Response> slotsDeleteIdDeleteWithHttpInfo(String id,) async {
    // ignore: prefer_const_declarations
    final path = r'/slots/delete/{id}'
      .replaceAll('{id}', id);

    // ignore: prefer_final_locals
    Object? postBody;

    final queryParams = <QueryParam>[];
    final headerParams = <String, String>{};
    final formParams = <String, String>{};

    const contentTypes = <String>[];


    return apiClient.invokeAPI(
      path,
      'DELETE',
      queryParams,
      postBody,
      headerParams,
      formParams,
      contentTypes.isEmpty ? null : contentTypes.first,
    );
  }

  /// Delete slot
  ///
  /// Delete slot
  ///
  /// Parameters:
  ///
  /// * [String] id (required):
  ///   Slot ID
  Future<String?> slotsDeleteIdDelete(String id,) async {
    final response = await slotsDeleteIdDeleteWithHttpInfo(id,);
    if (response.statusCode >= HttpStatus.badRequest) {
      throw ApiException(response.statusCode, await _decodeBodyBytes(response));
    }
    // When a remote server returns no body with a status of 204, we shall not decode it.
    // At the time of writing this, `dart:convert` will throw an "Unexpected end of input"
    // FormatException when trying to decode an empty string.
    if (response.body.isNotEmpty && response.statusCode != HttpStatus.noContent) {
      return await apiClient.deserializeAsync(await _decodeBodyBytes(response), 'String',) as String;
    
    }
    return null;
  }

  /// Delete slot by date and zone
  ///
  /// Delete slot by date and zone
  ///
  /// Note: This method returns the HTTP [Response].
  ///
  /// Parameters:
  ///
  /// * [String] id (required):
  ///   Slot ID
  ///
  /// * [String] zoneID (required):
  ///   Zone ID
  ///
  /// * [String] date (required):
  ///   Date
  Future<Response> slotsDeleteIdZoneZoneIDDateDateDeleteWithHttpInfo(String id, String zoneID, String date,) async {
    // ignore: prefer_const_declarations
    final path = r'/slots/delete/{id}/zone/{zoneID}/date/{date}'
      .replaceAll('{id}', id)
      .replaceAll('{zoneID}', zoneID)
      .replaceAll('{date}', date);

    // ignore: prefer_final_locals
    Object? postBody;

    final queryParams = <QueryParam>[];
    final headerParams = <String, String>{};
    final formParams = <String, String>{};

    const contentTypes = <String>[];


    return apiClient.invokeAPI(
      path,
      'DELETE',
      queryParams,
      postBody,
      headerParams,
      formParams,
      contentTypes.isEmpty ? null : contentTypes.first,
    );
  }

  /// Delete slot by date and zone
  ///
  /// Delete slot by date and zone
  ///
  /// Parameters:
  ///
  /// * [String] id (required):
  ///   Slot ID
  ///
  /// * [String] zoneID (required):
  ///   Zone ID
  ///
  /// * [String] date (required):
  ///   Date
  Future<String?> slotsDeleteIdZoneZoneIDDateDateDelete(String id, String zoneID, String date,) async {
    final response = await slotsDeleteIdZoneZoneIDDateDateDeleteWithHttpInfo(id, zoneID, date,);
    if (response.statusCode >= HttpStatus.badRequest) {
      throw ApiException(response.statusCode, await _decodeBodyBytes(response));
    }
    // When a remote server returns no body with a status of 204, we shall not decode it.
    // At the time of writing this, `dart:convert` will throw an "Unexpected end of input"
    // FormatException when trying to decode an empty string.
    if (response.body.isNotEmpty && response.statusCode != HttpStatus.noContent) {
      return await apiClient.deserializeAsync(await _decodeBodyBytes(response), 'String',) as String;
    
    }
    return null;
  }

  /// Edit slot
  ///
  /// Edit slot
  ///
  /// Note: This method returns the HTTP [Response].
  ///
  /// Parameters:
  ///
  /// * [String] id (required):
  ///   Slot ID
  ///
  /// * [DtosSlotUpdateDTO] updateDTO (required):
  ///   Slot update data
  Future<Response> slotsEditIdPatchWithHttpInfo(String id, DtosSlotUpdateDTO updateDTO,) async {
    // ignore: prefer_const_declarations
    final path = r'/slots/edit/{id}'
      .replaceAll('{id}', id);

    // ignore: prefer_final_locals
    Object? postBody = updateDTO;

    final queryParams = <QueryParam>[];
    final headerParams = <String, String>{};
    final formParams = <String, String>{};

    const contentTypes = <String>['application/json'];


    return apiClient.invokeAPI(
      path,
      'PATCH',
      queryParams,
      postBody,
      headerParams,
      formParams,
      contentTypes.isEmpty ? null : contentTypes.first,
    );
  }

  /// Edit slot
  ///
  /// Edit slot
  ///
  /// Parameters:
  ///
  /// * [String] id (required):
  ///   Slot ID
  ///
  /// * [DtosSlotUpdateDTO] updateDTO (required):
  ///   Slot update data
  Future<EntitiesSlot?> slotsEditIdPatch(String id, DtosSlotUpdateDTO updateDTO,) async {
    final response = await slotsEditIdPatchWithHttpInfo(id, updateDTO,);
    if (response.statusCode >= HttpStatus.badRequest) {
      throw ApiException(response.statusCode, await _decodeBodyBytes(response));
    }
    // When a remote server returns no body with a status of 204, we shall not decode it.
    // At the time of writing this, `dart:convert` will throw an "Unexpected end of input"
    // FormatException when trying to decode an empty string.
    if (response.body.isNotEmpty && response.statusCode != HttpStatus.noContent) {
      return await apiClient.deserializeAsync(await _decodeBodyBytes(response), 'EntitiesSlot',) as EntitiesSlot;
    
    }
    return null;
  }

  /// Get all slots
  ///
  /// Get all slots
  ///
  /// Note: This method returns the HTTP [Response].
  ///
  /// Parameters:
  ///
  /// * [String] id (required):
  ///   Market ID
  Future<Response> slotsGetIdGetWithHttpInfo(String id,) async {
    // ignore: prefer_const_declarations
    final path = r'/slots/get/{id}'
      .replaceAll('{id}', id);

    // ignore: prefer_final_locals
    Object? postBody;

    final queryParams = <QueryParam>[];
    final headerParams = <String, String>{};
    final formParams = <String, String>{};

    const contentTypes = <String>[];


    return apiClient.invokeAPI(
      path,
      'GET',
      queryParams,
      postBody,
      headerParams,
      formParams,
      contentTypes.isEmpty ? null : contentTypes.first,
    );
  }

  /// Get all slots
  ///
  /// Get all slots
  ///
  /// Parameters:
  ///
  /// * [String] id (required):
  ///   Market ID
  Future<EntitiesSlot?> slotsGetIdGet(String id,) async {
    final response = await slotsGetIdGetWithHttpInfo(id,);
    if (response.statusCode >= HttpStatus.badRequest) {
      throw ApiException(response.statusCode, await _decodeBodyBytes(response));
    }
    // When a remote server returns no body with a status of 204, we shall not decode it.
    // At the time of writing this, `dart:convert` will throw an "Unexpected end of input"
    // FormatException when trying to decode an empty string.
    if (response.body.isNotEmpty && response.statusCode != HttpStatus.noContent) {
      return await apiClient.deserializeAsync(await _decodeBodyBytes(response), 'EntitiesSlot',) as EntitiesSlot;
    
    }
    return null;
  }

  /// Create or update layout
  ///
  /// Create or update layout
  ///
  /// Note: This method returns the HTTP [Response].
  ///
  /// Parameters:
  ///
  /// * [String] marketId (required):
  ///   Market ID
  ///
  /// * [DtosLayoutRequest] layout (required):
  ///   Layout data
  Future<Response> slotsMarketIdCreatePostWithHttpInfo(String marketId, DtosLayoutRequest layout,) async {
    // ignore: prefer_const_declarations
    final path = r'/slots/{marketId}/create'
      .replaceAll('{marketId}', marketId);

    // ignore: prefer_final_locals
    Object? postBody = layout;

    final queryParams = <QueryParam>[];
    final headerParams = <String, String>{};
    final formParams = <String, String>{};

    const contentTypes = <String>['application/json'];


    return apiClient.invokeAPI(
      path,
      'POST',
      queryParams,
      postBody,
      headerParams,
      formParams,
      contentTypes.isEmpty ? null : contentTypes.first,
    );
  }

  /// Create or update layout
  ///
  /// Create or update layout
  ///
  /// Parameters:
  ///
  /// * [String] marketId (required):
  ///   Market ID
  ///
  /// * [DtosLayoutRequest] layout (required):
  ///   Layout data
  Future<String?> slotsMarketIdCreatePost(String marketId, DtosLayoutRequest layout,) async {
    final response = await slotsMarketIdCreatePostWithHttpInfo(marketId, layout,);
    if (response.statusCode >= HttpStatus.badRequest) {
      throw ApiException(response.statusCode, await _decodeBodyBytes(response));
    }
    // When a remote server returns no body with a status of 204, we shall not decode it.
    // At the time of writing this, `dart:convert` will throw an "Unexpected end of input"
    // FormatException when trying to decode an empty string.
    if (response.body.isNotEmpty && response.statusCode != HttpStatus.noContent) {
      return await apiClient.deserializeAsync(await _decodeBodyBytes(response), 'String',) as String;
    
    }
    return null;
  }

  /// Get slots by date
  ///
  /// Get slots by date
  ///
  /// Note: This method returns the HTTP [Response].
  ///
  /// Parameters:
  ///
  /// * [String] marketID (required):
  ///   MarketID
  ///
  /// * [String] date (required):
  ///   Date
  Future<Response> slotsMarketsMarketIDDateDateGetWithHttpInfo(String marketID, String date,) async {
    // ignore: prefer_const_declarations
    final path = r'/slots/markets/{marketID}/date/{date}'
      .replaceAll('{marketID}', marketID)
      .replaceAll('{date}', date);

    // ignore: prefer_final_locals
    Object? postBody;

    final queryParams = <QueryParam>[];
    final headerParams = <String, String>{};
    final formParams = <String, String>{};

    const contentTypes = <String>[];


    return apiClient.invokeAPI(
      path,
      'GET',
      queryParams,
      postBody,
      headerParams,
      formParams,
      contentTypes.isEmpty ? null : contentTypes.first,
    );
  }

  /// Get slots by date
  ///
  /// Get slots by date
  ///
  /// Parameters:
  ///
  /// * [String] marketID (required):
  ///   MarketID
  ///
  /// * [String] date (required):
  ///   Date
  Future<List<EntitiesSlot>?> slotsMarketsMarketIDDateDateGet(String marketID, String date,) async {
    final response = await slotsMarketsMarketIDDateDateGetWithHttpInfo(marketID, date,);
    if (response.statusCode >= HttpStatus.badRequest) {
      throw ApiException(response.statusCode, await _decodeBodyBytes(response));
    }
    // When a remote server returns no body with a status of 204, we shall not decode it.
    // At the time of writing this, `dart:convert` will throw an "Unexpected end of input"
    // FormatException when trying to decode an empty string.
    if (response.body.isNotEmpty && response.statusCode != HttpStatus.noContent) {
      final responseBody = await _decodeBodyBytes(response);
      return (await apiClient.deserializeAsync(responseBody, 'List<EntitiesSlot>') as List)
        .cast<EntitiesSlot>()
        .toList(growable: false);

    }
    return null;
  }

  /// Get provider slots
  ///
  /// Get provider slots
  ///
  /// Note: This method returns the HTTP [Response].
  ///
  /// Parameters:
  ///
  /// * [String] id (required):
  ///   Provider ID
  Future<Response> slotsProviderGetIdGetWithHttpInfo(String id,) async {
    // ignore: prefer_const_declarations
    final path = r'/slots/provider/get/{id}'
      .replaceAll('{id}', id);

    // ignore: prefer_final_locals
    Object? postBody;

    final queryParams = <QueryParam>[];
    final headerParams = <String, String>{};
    final formParams = <String, String>{};

    const contentTypes = <String>[];


    return apiClient.invokeAPI(
      path,
      'GET',
      queryParams,
      postBody,
      headerParams,
      formParams,
      contentTypes.isEmpty ? null : contentTypes.first,
    );
  }

  /// Get provider slots
  ///
  /// Get provider slots
  ///
  /// Parameters:
  ///
  /// * [String] id (required):
  ///   Provider ID
  Future<List<EntitiesSlot>?> slotsProviderGetIdGet(String id,) async {
    final response = await slotsProviderGetIdGetWithHttpInfo(id,);
    if (response.statusCode >= HttpStatus.badRequest) {
      throw ApiException(response.statusCode, await _decodeBodyBytes(response));
    }
    // When a remote server returns no body with a status of 204, we shall not decode it.
    // At the time of writing this, `dart:convert` will throw an "Unexpected end of input"
    // FormatException when trying to decode an empty string.
    if (response.body.isNotEmpty && response.statusCode != HttpStatus.noContent) {
      final responseBody = await _decodeBodyBytes(response);
      return (await apiClient.deserializeAsync(responseBody, 'List<EntitiesSlot>') as List)
        .cast<EntitiesSlot>()
        .toList(growable: false);

    }
    return null;
  }
}

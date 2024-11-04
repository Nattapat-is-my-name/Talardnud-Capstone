//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;


class MarketApi {
  MarketApi([ApiClient? apiClient]) : apiClient = apiClient ?? defaultApiClient;

  final ApiClient apiClient;

  /// Create a new market
  ///
  /// Create a new market
  ///
  /// Note: This method returns the HTTP [Response].
  ///
  /// Parameters:
  ///
  /// * [DtosMarketRequest] market (required):
  ///   Market object that needs to be created
  Future<Response> marketsCreatePostWithHttpInfo(DtosMarketRequest market,) async {
    // ignore: prefer_const_declarations
    final path = r'/markets/create';

    // ignore: prefer_final_locals
    Object? postBody = market;

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

  /// Create a new market
  ///
  /// Create a new market
  ///
  /// Parameters:
  ///
  /// * [DtosMarketRequest] market (required):
  ///   Market object that needs to be created
  Future<DtosMarketResponse?> marketsCreatePost(DtosMarketRequest market,) async {
    final response = await marketsCreatePostWithHttpInfo(market,);
    if (response.statusCode >= HttpStatus.badRequest) {
      throw ApiException(response.statusCode, await _decodeBodyBytes(response));
    }
    // When a remote server returns no body with a status of 204, we shall not decode it.
    // At the time of writing this, `dart:convert` will throw an "Unexpected end of input"
    // FormatException when trying to decode an empty string.
    if (response.body.isNotEmpty && response.statusCode != HttpStatus.noContent) {
      return await apiClient.deserializeAsync(await _decodeBodyBytes(response), 'DtosMarketResponse',) as DtosMarketResponse;
    
    }
    return null;
  }

  /// Edit a market
  ///
  /// Edit a market
  ///
  /// Note: This method returns the HTTP [Response].
  ///
  /// Parameters:
  ///
  /// * [String] id (required):
  ///   Market ID
  ///
  /// * [DtosMarketEditRequest] market (required):
  ///   Market object that needs to be updated
  Future<Response> marketsEditIdPatchWithHttpInfo(String id, DtosMarketEditRequest market,) async {
    // ignore: prefer_const_declarations
    final path = r'/markets/edit/{id}'
      .replaceAll('{id}', id);

    // ignore: prefer_final_locals
    Object? postBody = market;

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

  /// Edit a market
  ///
  /// Edit a market
  ///
  /// Parameters:
  ///
  /// * [String] id (required):
  ///   Market ID
  ///
  /// * [DtosMarketEditRequest] market (required):
  ///   Market object that needs to be updated
  Future<EntitiesMarket?> marketsEditIdPatch(String id, DtosMarketEditRequest market,) async {
    final response = await marketsEditIdPatchWithHttpInfo(id, market,);
    if (response.statusCode >= HttpStatus.badRequest) {
      throw ApiException(response.statusCode, await _decodeBodyBytes(response));
    }
    // When a remote server returns no body with a status of 204, we shall not decode it.
    // At the time of writing this, `dart:convert` will throw an "Unexpected end of input"
    // FormatException when trying to decode an empty string.
    if (response.body.isNotEmpty && response.statusCode != HttpStatus.noContent) {
      return await apiClient.deserializeAsync(await _decodeBodyBytes(response), 'EntitiesMarket',) as EntitiesMarket;
    
    }
    return null;
  }

  /// Get all markets
  ///
  /// Note: This method returns the HTTP [Response].
  Future<Response> marketsGetGetWithHttpInfo() async {
    // ignore: prefer_const_declarations
    final path = r'/markets/get';

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

  /// Get all markets
  Future<DtosGetListMarketResponse?> marketsGetGet() async {
    final response = await marketsGetGetWithHttpInfo();
    if (response.statusCode >= HttpStatus.badRequest) {
      throw ApiException(response.statusCode, await _decodeBodyBytes(response));
    }
    // When a remote server returns no body with a status of 204, we shall not decode it.
    // At the time of writing this, `dart:convert` will throw an "Unexpected end of input"
    // FormatException when trying to decode an empty string.
    if (response.body.isNotEmpty && response.statusCode != HttpStatus.noContent) {
      return await apiClient.deserializeAsync(await _decodeBodyBytes(response), 'DtosGetListMarketResponse',) as DtosGetListMarketResponse;
    
    }
    return null;
  }

  /// Get a market by ID
  ///
  /// Get a market by ID
  ///
  /// Note: This method returns the HTTP [Response].
  ///
  /// Parameters:
  ///
  /// * [String] id (required):
  ///   Market ID
  Future<Response> marketsGetIdGetWithHttpInfo(String id,) async {
    // ignore: prefer_const_declarations
    final path = r'/markets/get/{id}'
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

  /// Get a market by ID
  ///
  /// Get a market by ID
  ///
  /// Parameters:
  ///
  /// * [String] id (required):
  ///   Market ID
  Future<EntitiesMarket?> marketsGetIdGet(String id,) async {
    final response = await marketsGetIdGetWithHttpInfo(id,);
    if (response.statusCode >= HttpStatus.badRequest) {
      throw ApiException(response.statusCode, await _decodeBodyBytes(response));
    }
    // When a remote server returns no body with a status of 204, we shall not decode it.
    // At the time of writing this, `dart:convert` will throw an "Unexpected end of input"
    // FormatException when trying to decode an empty string.
    if (response.body.isNotEmpty && response.statusCode != HttpStatus.noContent) {
      return await apiClient.deserializeAsync(await _decodeBodyBytes(response), 'EntitiesMarket',) as EntitiesMarket;
    
    }
    return null;
  }

  /// Get a market by Provider ID
  ///
  /// Get a market by Provider ID
  ///
  /// Note: This method returns the HTTP [Response].
  ///
  /// Parameters:
  ///
  /// * [String] id (required):
  ///   Provider ID
  Future<Response> marketsProviderGetIdGetWithHttpInfo(String id,) async {
    // ignore: prefer_const_declarations
    final path = r'/markets/provider/get/{id}'
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

  /// Get a market by Provider ID
  ///
  /// Get a market by Provider ID
  ///
  /// Parameters:
  ///
  /// * [String] id (required):
  ///   Provider ID
  Future<DtosMarketResponse?> marketsProviderGetIdGet(String id,) async {
    final response = await marketsProviderGetIdGetWithHttpInfo(id,);
    if (response.statusCode >= HttpStatus.badRequest) {
      throw ApiException(response.statusCode, await _decodeBodyBytes(response));
    }
    // When a remote server returns no body with a status of 204, we shall not decode it.
    // At the time of writing this, `dart:convert` will throw an "Unexpected end of input"
    // FormatException when trying to decode an empty string.
    if (response.body.isNotEmpty && response.statusCode != HttpStatus.noContent) {
      return await apiClient.deserializeAsync(await _decodeBodyBytes(response), 'DtosMarketResponse',) as DtosMarketResponse;
    
    }
    return null;
  }
}

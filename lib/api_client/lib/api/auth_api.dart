//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;


class AuthApi {
  AuthApi([ApiClient? apiClient]) : apiClient = apiClient ?? defaultApiClient;

  final ApiClient apiClient;

  /// Login
  ///
  /// Login with the provided credentials
  ///
  /// Note: This method returns the HTTP [Response].
  ///
  /// Parameters:
  ///
  /// * [EntitiesLoginRequest] login (required):
  ///   Login data
  Future<Response> authLoginPostWithHttpInfo(EntitiesLoginRequest login,) async {
    // ignore: prefer_const_declarations
    final path = r'/auth/login';

    // ignore: prefer_final_locals
    Object? postBody = login;

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

  /// Login
  ///
  /// Login with the provided credentials
  ///
  /// Parameters:
  ///
  /// * [EntitiesLoginRequest] login (required):
  ///   Login data
  Future<EntitiesLoginResponse?> authLoginPost(EntitiesLoginRequest login,) async {
    final response = await authLoginPostWithHttpInfo(login,);
    if (response.statusCode >= HttpStatus.badRequest) {
      throw ApiException(response.statusCode, await _decodeBodyBytes(response));
    }
    // When a remote server returns no body with a status of 204, we shall not decode it.
    // At the time of writing this, `dart:convert` will throw an "Unexpected end of input"
    // FormatException when trying to decode an empty string.
    if (response.body.isNotEmpty && response.statusCode != HttpStatus.noContent) {
      return await apiClient.deserializeAsync(await _decodeBodyBytes(response), 'EntitiesLoginResponse',) as EntitiesLoginResponse;
    
    }
    return null;
  }

  /// Provider Login
  ///
  /// Login for market providers with the provided credentials
  ///
  /// Note: This method returns the HTTP [Response].
  ///
  /// Parameters:
  ///
  /// * [DtosProviderLoginRequest] login (required):
  ///   Provider Login data
  Future<Response> authProviderLoginPostWithHttpInfo(DtosProviderLoginRequest login,) async {
    // ignore: prefer_const_declarations
    final path = r'/auth/provider/login';

    // ignore: prefer_final_locals
    Object? postBody = login;

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

  /// Provider Login
  ///
  /// Login for market providers with the provided credentials
  ///
  /// Parameters:
  ///
  /// * [DtosProviderLoginRequest] login (required):
  ///   Provider Login data
  Future<DtosProviderLoginResponse?> authProviderLoginPost(DtosProviderLoginRequest login,) async {
    final response = await authProviderLoginPostWithHttpInfo(login,);
    if (response.statusCode >= HttpStatus.badRequest) {
      throw ApiException(response.statusCode, await _decodeBodyBytes(response));
    }
    // When a remote server returns no body with a status of 204, we shall not decode it.
    // At the time of writing this, `dart:convert` will throw an "Unexpected end of input"
    // FormatException when trying to decode an empty string.
    if (response.body.isNotEmpty && response.statusCode != HttpStatus.noContent) {
      return await apiClient.deserializeAsync(await _decodeBodyBytes(response), 'DtosProviderLoginResponse',) as DtosProviderLoginResponse;
    
    }
    return null;
  }

  /// Register Provider
  ///
  /// Register a new market provider with the provided data
  ///
  /// Note: This method returns the HTTP [Response].
  ///
  /// Parameters:
  ///
  /// * [DtosMarketProviderRequest] register (required):
  ///   Register provider request
  Future<Response> authProviderRegisterPostWithHttpInfo(DtosMarketProviderRequest register,) async {
    // ignore: prefer_const_declarations
    final path = r'/auth/provider/register';

    // ignore: prefer_final_locals
    Object? postBody = register;

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

  /// Register Provider
  ///
  /// Register a new market provider with the provided data
  ///
  /// Parameters:
  ///
  /// * [DtosMarketProviderRequest] register (required):
  ///   Register provider request
  Future<EntitiesMarketProvider?> authProviderRegisterPost(DtosMarketProviderRequest register,) async {
    final response = await authProviderRegisterPostWithHttpInfo(register,);
    if (response.statusCode >= HttpStatus.badRequest) {
      throw ApiException(response.statusCode, await _decodeBodyBytes(response));
    }
    // When a remote server returns no body with a status of 204, we shall not decode it.
    // At the time of writing this, `dart:convert` will throw an "Unexpected end of input"
    // FormatException when trying to decode an empty string.
    if (response.body.isNotEmpty && response.statusCode != HttpStatus.noContent) {
      return await apiClient.deserializeAsync(await _decodeBodyBytes(response), 'EntitiesMarketProvider',) as EntitiesMarketProvider;
    
    }
    return null;
  }

  /// Register
  ///
  /// Register a new user with the provided data
  ///
  /// Note: This method returns the HTTP [Response].
  ///
  /// Parameters:
  ///
  /// * [DtosRegisterRequest] register (required):
  ///   Register request
  Future<Response> authRegisterPostWithHttpInfo(DtosRegisterRequest register,) async {
    // ignore: prefer_const_declarations
    final path = r'/auth/register';

    // ignore: prefer_final_locals
    Object? postBody = register;

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

  /// Register
  ///
  /// Register a new user with the provided data
  ///
  /// Parameters:
  ///
  /// * [DtosRegisterRequest] register (required):
  ///   Register request
  Future<DtosRegisterResponse?> authRegisterPost(DtosRegisterRequest register,) async {
    final response = await authRegisterPostWithHttpInfo(register,);
    if (response.statusCode >= HttpStatus.badRequest) {
      throw ApiException(response.statusCode, await _decodeBodyBytes(response));
    }
    // When a remote server returns no body with a status of 204, we shall not decode it.
    // At the time of writing this, `dart:convert` will throw an "Unexpected end of input"
    // FormatException when trying to decode an empty string.
    if (response.body.isNotEmpty && response.statusCode != HttpStatus.noContent) {
      return await apiClient.deserializeAsync(await _decodeBodyBytes(response), 'DtosRegisterResponse',) as DtosRegisterResponse;
    
    }
    return null;
  }
}

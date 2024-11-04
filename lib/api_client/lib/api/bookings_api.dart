//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

part of openapi.api;


class BookingsApi {
  BookingsApi([ApiClient? apiClient]) : apiClient = apiClient ?? defaultApiClient;

  final ApiClient apiClient;

  /// Create a booking
  ///
  /// Create a new booking with the provided data
  ///
  /// Note: This method returns the HTTP [Response].
  ///
  /// Parameters:
  ///
  /// * [DtosBookingRequest] booking (required):
  ///   Booking data
  Future<Response> bookingsCreatePostWithHttpInfo(DtosBookingRequest booking,) async {
    // ignore: prefer_const_declarations
    final path = r'/bookings/create';

    // ignore: prefer_final_locals
    Object? postBody = booking;

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

  /// Create a booking
  ///
  /// Create a new booking with the provided data
  ///
  /// Parameters:
  ///
  /// * [DtosBookingRequest] booking (required):
  ///   Booking data
  Future<DtosBookingResponse?> bookingsCreatePost(DtosBookingRequest booking,) async {
    final response = await bookingsCreatePostWithHttpInfo(booking,);
    if (response.statusCode >= HttpStatus.badRequest) {
      throw ApiException(response.statusCode, await _decodeBodyBytes(response));
    }
    // When a remote server returns no body with a status of 204, we shall not decode it.
    // At the time of writing this, `dart:convert` will throw an "Unexpected end of input"
    // FormatException when trying to decode an empty string.
    if (response.body.isNotEmpty && response.statusCode != HttpStatus.noContent) {
      return await apiClient.deserializeAsync(await _decodeBodyBytes(response), 'DtosBookingResponse',) as DtosBookingResponse;
    
    }
    return null;
  }

  /// Get a booking
  ///
  /// Get a booking with the provided ID
  ///
  /// Note: This method returns the HTTP [Response].
  ///
  /// Parameters:
  ///
  /// * [String] id (required):
  ///   Booking ID
  Future<Response> bookingsGetIdGetWithHttpInfo(String id,) async {
    // ignore: prefer_const_declarations
    final path = r'/bookings/get/{id}'
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

  /// Get a booking
  ///
  /// Get a booking with the provided ID
  ///
  /// Parameters:
  ///
  /// * [String] id (required):
  ///   Booking ID
  Future<DtosBookingResponse?> bookingsGetIdGet(String id,) async {
    final response = await bookingsGetIdGetWithHttpInfo(id,);
    if (response.statusCode >= HttpStatus.badRequest) {
      throw ApiException(response.statusCode, await _decodeBodyBytes(response));
    }
    // When a remote server returns no body with a status of 204, we shall not decode it.
    // At the time of writing this, `dart:convert` will throw an "Unexpected end of input"
    // FormatException when trying to decode an empty string.
    if (response.body.isNotEmpty && response.statusCode != HttpStatus.noContent) {
      return await apiClient.deserializeAsync(await _decodeBodyBytes(response), 'DtosBookingResponse',) as DtosBookingResponse;
    
    }
    return null;
  }

  /// Get bookings by market
  ///
  /// Get bookings by market with the provided ID
  ///
  /// Note: This method returns the HTTP [Response].
  ///
  /// Parameters:
  ///
  /// * [String] id (required):
  ///   Market ID
  Future<Response> bookingsMarketIdGetWithHttpInfo(String id,) async {
    // ignore: prefer_const_declarations
    final path = r'/bookings/market/{id}'
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

  /// Get bookings by market
  ///
  /// Get bookings by market with the provided ID
  ///
  /// Parameters:
  ///
  /// * [String] id (required):
  ///   Market ID
  Future<List<EntitiesBooking>?> bookingsMarketIdGet(String id,) async {
    final response = await bookingsMarketIdGetWithHttpInfo(id,);
    if (response.statusCode >= HttpStatus.badRequest) {
      throw ApiException(response.statusCode, await _decodeBodyBytes(response));
    }
    // When a remote server returns no body with a status of 204, we shall not decode it.
    // At the time of writing this, `dart:convert` will throw an "Unexpected end of input"
    // FormatException when trying to decode an empty string.
    if (response.body.isNotEmpty && response.statusCode != HttpStatus.noContent) {
      final responseBody = await _decodeBodyBytes(response);
      return (await apiClient.deserializeAsync(responseBody, 'List<EntitiesBooking>') as List)
        .cast<EntitiesBooking>()
        .toList(growable: false);

    }
    return null;
  }

  /// Get bookings by user
  ///
  /// Get bookings by user with the provided ID
  ///
  /// Note: This method returns the HTTP [Response].
  ///
  /// Parameters:
  ///
  /// * [String] id (required):
  ///   User ID
  Future<Response> bookingsUserIdGetWithHttpInfo(String id,) async {
    // ignore: prefer_const_declarations
    final path = r'/bookings/user/{id}'
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

  /// Get bookings by user
  ///
  /// Get bookings by user with the provided ID
  ///
  /// Parameters:
  ///
  /// * [String] id (required):
  ///   User ID
  Future<List<EntitiesBooking>?> bookingsUserIdGet(String id,) async {
    final response = await bookingsUserIdGetWithHttpInfo(id,);
    if (response.statusCode >= HttpStatus.badRequest) {
      throw ApiException(response.statusCode, await _decodeBodyBytes(response));
    }
    // When a remote server returns no body with a status of 204, we shall not decode it.
    // At the time of writing this, `dart:convert` will throw an "Unexpected end of input"
    // FormatException when trying to decode an empty string.
    if (response.body.isNotEmpty && response.statusCode != HttpStatus.noContent) {
      final responseBody = await _decodeBodyBytes(response);
      return (await apiClient.deserializeAsync(responseBody, 'List<EntitiesBooking>') as List)
        .cast<EntitiesBooking>()
        .toList(growable: false);

    }
    return null;
  }
}

//
// AUTO-GENERATED FILE, DO NOT MODIFY!
//
// @dart=2.18

// ignore_for_file: unused_element, unused_import
// ignore_for_file: always_put_required_named_parameters_first
// ignore_for_file: constant_identifier_names
// ignore_for_file: lines_longer_than_80_chars

library openapi.api;

import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:collection/collection.dart';
import 'package:http/http.dart';
import 'package:intl/intl.dart';
import 'package:meta/meta.dart';

part 'api_client.dart';
part 'api_helper.dart';
part 'api_exception.dart';
part 'auth/authentication.dart';
part 'auth/api_key_auth.dart';
part 'auth/oauth.dart';
part 'auth/http_basic_auth.dart';
part 'auth/http_bearer_auth.dart';

part 'api/auth_api.dart';
part 'api/bookings_api.dart';
part 'api/dashboard_api.dart';
part 'api/market_api.dart';
part 'api/payments_api.dart';
part 'api/slots_api.dart';
part 'api/users_api.dart';

part 'model/dtos_booking_dtos.dart';
part 'model/dtos_booking_request.dart';
part 'model/dtos_booking_response.dart';
part 'model/dtos_get_list_market_response.dart';
part 'model/dtos_get_user_response.dart';
part 'model/dtos_layout_request.dart';
part 'model/dtos_market_edit_request.dart';
part 'model/dtos_market_provider_request.dart';
part 'model/dtos_market_request.dart';
part 'model/dtos_market_response.dart';
part 'model/dtos_provider_login_request.dart';
part 'model/dtos_provider_login_response.dart';
part 'model/dtos_register_request.dart';
part 'model/dtos_register_response.dart';
part 'model/dtos_slot_update_dto.dart';
part 'model/dtos_stall.dart';
part 'model/dtos_zone_layout.dart';
part 'model/entities_booking.dart';
part 'model/entities_booking_status.dart';
part 'model/entities_category.dart';
part 'model/entities_dashboard_response.dart';
part 'model/entities_login_request.dart';
part 'model/entities_login_response.dart';
part 'model/entities_market.dart';
part 'model/entities_market_dashboard_stats.dart';
part 'model/entities_market_provider.dart';
part 'model/entities_method.dart';
part 'model/entities_payment.dart';
part 'model/entities_payment_status.dart';
part 'model/entities_slot.dart';
part 'model/entities_slot_status.dart';
part 'model/entities_transaction.dart';
part 'model/entities_transaction_status.dart';
part 'model/entities_vendor.dart';


/// An [ApiClient] instance that uses the default values obtained from
/// the OpenAPI specification file.
var defaultApiClient = ApiClient();

const _delimiters = {'csv': ',', 'ssv': ' ', 'tsv': '\t', 'pipes': '|'};
const _dateEpochMarker = 'epoch';
const _deepEquality = DeepCollectionEquality();
final _dateFormatter = DateFormat('yyyy-MM-dd');
final _regList = RegExp(r'^List<(.*)>$');
final _regSet = RegExp(r'^Set<(.*)>$');
final _regMap = RegExp(r'^Map<String,(.*)>$');

bool _isEpochMarker(String? pattern) => pattern == _dateEpochMarker || pattern == '/$_dateEpochMarker/';

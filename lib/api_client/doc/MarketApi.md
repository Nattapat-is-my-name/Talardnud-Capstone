# openapi.api.MarketApi

## Load the API package
```dart
import 'package:openapi/api.dart';
```

All URIs are relative to *http://localhost:3000/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**marketsCreatePost**](MarketApi.md#marketscreatepost) | **POST** /markets/create | Create a new market
[**marketsEditIdPatch**](MarketApi.md#marketseditidpatch) | **PATCH** /markets/edit/{id} | Edit a market
[**marketsGetGet**](MarketApi.md#marketsgetget) | **GET** /markets/get | Get all markets
[**marketsGetIdGet**](MarketApi.md#marketsgetidget) | **GET** /markets/get/{id} | Get a market by ID
[**marketsProviderGetIdGet**](MarketApi.md#marketsprovidergetidget) | **GET** /markets/provider/get/{id} | Get a market by Provider ID


# **marketsCreatePost**
> DtosMarketResponse marketsCreatePost(market)

Create a new market

Create a new market

### Example
```dart
import 'package:openapi/api.dart';

final api_instance = MarketApi();
final market = DtosMarketRequest(); // DtosMarketRequest | Market object that needs to be created

try {
    final result = api_instance.marketsCreatePost(market);
    print(result);
} catch (e) {
    print('Exception when calling MarketApi->marketsCreatePost: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **market** | [**DtosMarketRequest**](DtosMarketRequest.md)| Market object that needs to be created | 

### Return type

[**DtosMarketResponse**](DtosMarketResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **marketsEditIdPatch**
> EntitiesMarket marketsEditIdPatch(id, market)

Edit a market

Edit a market

### Example
```dart
import 'package:openapi/api.dart';

final api_instance = MarketApi();
final id = id_example; // String | Market ID
final market = DtosMarketEditRequest(); // DtosMarketEditRequest | Market object that needs to be updated

try {
    final result = api_instance.marketsEditIdPatch(id, market);
    print(result);
} catch (e) {
    print('Exception when calling MarketApi->marketsEditIdPatch: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**| Market ID | 
 **market** | [**DtosMarketEditRequest**](DtosMarketEditRequest.md)| Market object that needs to be updated | 

### Return type

[**EntitiesMarket**](EntitiesMarket.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **marketsGetGet**
> DtosGetListMarketResponse marketsGetGet()

Get all markets

### Example
```dart
import 'package:openapi/api.dart';

final api_instance = MarketApi();

try {
    final result = api_instance.marketsGetGet();
    print(result);
} catch (e) {
    print('Exception when calling MarketApi->marketsGetGet: $e\n');
}
```

### Parameters
This endpoint does not need any parameter.

### Return type

[**DtosGetListMarketResponse**](DtosGetListMarketResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **marketsGetIdGet**
> EntitiesMarket marketsGetIdGet(id)

Get a market by ID

Get a market by ID

### Example
```dart
import 'package:openapi/api.dart';

final api_instance = MarketApi();
final id = id_example; // String | Market ID

try {
    final result = api_instance.marketsGetIdGet(id);
    print(result);
} catch (e) {
    print('Exception when calling MarketApi->marketsGetIdGet: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**| Market ID | 

### Return type

[**EntitiesMarket**](EntitiesMarket.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **marketsProviderGetIdGet**
> DtosMarketResponse marketsProviderGetIdGet(id)

Get a market by Provider ID

Get a market by Provider ID

### Example
```dart
import 'package:openapi/api.dart';

final api_instance = MarketApi();
final id = id_example; // String | Provider ID

try {
    final result = api_instance.marketsProviderGetIdGet(id);
    print(result);
} catch (e) {
    print('Exception when calling MarketApi->marketsProviderGetIdGet: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**| Provider ID | 

### Return type

[**DtosMarketResponse**](DtosMarketResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


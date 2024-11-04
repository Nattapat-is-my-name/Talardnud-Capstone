# openapi.api.SlotsApi

## Load the API package
```dart
import 'package:openapi/api.dart';
```

All URIs are relative to *http://localhost:3000/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**slotsDeleteIdDelete**](SlotsApi.md#slotsdeleteiddelete) | **DELETE** /slots/delete/{id} | Delete slot
[**slotsDeleteIdZoneZoneIDDateDateDelete**](SlotsApi.md#slotsdeleteidzonezoneiddatedatedelete) | **DELETE** /slots/delete/{id}/zone/{zoneID}/date/{date} | Delete slot by date and zone
[**slotsEditIdPatch**](SlotsApi.md#slotseditidpatch) | **PATCH** /slots/edit/{id} | Edit slot
[**slotsGetIdGet**](SlotsApi.md#slotsgetidget) | **GET** /slots/get/{id} | Get all slots
[**slotsMarketIdCreatePost**](SlotsApi.md#slotsmarketidcreatepost) | **POST** /slots/{marketId}/create | Create or update layout
[**slotsMarketsMarketIDDateDateGet**](SlotsApi.md#slotsmarketsmarketiddatedateget) | **GET** /slots/markets/{marketID}/date/{date} | Get slots by date
[**slotsProviderGetIdGet**](SlotsApi.md#slotsprovidergetidget) | **GET** /slots/provider/get/{id} | Get provider slots


# **slotsDeleteIdDelete**
> String slotsDeleteIdDelete(id)

Delete slot

Delete slot

### Example
```dart
import 'package:openapi/api.dart';

final api_instance = SlotsApi();
final id = id_example; // String | Slot ID

try {
    final result = api_instance.slotsDeleteIdDelete(id);
    print(result);
} catch (e) {
    print('Exception when calling SlotsApi->slotsDeleteIdDelete: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**| Slot ID | 

### Return type

**String**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **slotsDeleteIdZoneZoneIDDateDateDelete**
> String slotsDeleteIdZoneZoneIDDateDateDelete(id, zoneID, date)

Delete slot by date and zone

Delete slot by date and zone

### Example
```dart
import 'package:openapi/api.dart';

final api_instance = SlotsApi();
final id = id_example; // String | Slot ID
final zoneID = zoneID_example; // String | Zone ID
final date = date_example; // String | Date

try {
    final result = api_instance.slotsDeleteIdZoneZoneIDDateDateDelete(id, zoneID, date);
    print(result);
} catch (e) {
    print('Exception when calling SlotsApi->slotsDeleteIdZoneZoneIDDateDateDelete: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**| Slot ID | 
 **zoneID** | **String**| Zone ID | 
 **date** | **String**| Date | 

### Return type

**String**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **slotsEditIdPatch**
> EntitiesSlot slotsEditIdPatch(id, updateDTO)

Edit slot

Edit slot

### Example
```dart
import 'package:openapi/api.dart';

final api_instance = SlotsApi();
final id = id_example; // String | Slot ID
final updateDTO = DtosSlotUpdateDTO(); // DtosSlotUpdateDTO | Slot update data

try {
    final result = api_instance.slotsEditIdPatch(id, updateDTO);
    print(result);
} catch (e) {
    print('Exception when calling SlotsApi->slotsEditIdPatch: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**| Slot ID | 
 **updateDTO** | [**DtosSlotUpdateDTO**](DtosSlotUpdateDTO.md)| Slot update data | 

### Return type

[**EntitiesSlot**](EntitiesSlot.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **slotsGetIdGet**
> EntitiesSlot slotsGetIdGet(id)

Get all slots

Get all slots

### Example
```dart
import 'package:openapi/api.dart';

final api_instance = SlotsApi();
final id = id_example; // String | Market ID

try {
    final result = api_instance.slotsGetIdGet(id);
    print(result);
} catch (e) {
    print('Exception when calling SlotsApi->slotsGetIdGet: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**| Market ID | 

### Return type

[**EntitiesSlot**](EntitiesSlot.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **slotsMarketIdCreatePost**
> String slotsMarketIdCreatePost(marketId, layout)

Create or update layout

Create or update layout

### Example
```dart
import 'package:openapi/api.dart';

final api_instance = SlotsApi();
final marketId = marketId_example; // String | Market ID
final layout = DtosLayoutRequest(); // DtosLayoutRequest | Layout data

try {
    final result = api_instance.slotsMarketIdCreatePost(marketId, layout);
    print(result);
} catch (e) {
    print('Exception when calling SlotsApi->slotsMarketIdCreatePost: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **marketId** | **String**| Market ID | 
 **layout** | [**DtosLayoutRequest**](DtosLayoutRequest.md)| Layout data | 

### Return type

**String**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **slotsMarketsMarketIDDateDateGet**
> List<EntitiesSlot> slotsMarketsMarketIDDateDateGet(marketID, date)

Get slots by date

Get slots by date

### Example
```dart
import 'package:openapi/api.dart';

final api_instance = SlotsApi();
final marketID = marketID_example; // String | MarketID
final date = date_example; // String | Date

try {
    final result = api_instance.slotsMarketsMarketIDDateDateGet(marketID, date);
    print(result);
} catch (e) {
    print('Exception when calling SlotsApi->slotsMarketsMarketIDDateDateGet: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **marketID** | **String**| MarketID | 
 **date** | **String**| Date | 

### Return type

[**List<EntitiesSlot>**](EntitiesSlot.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **slotsProviderGetIdGet**
> List<EntitiesSlot> slotsProviderGetIdGet(id)

Get provider slots

Get provider slots

### Example
```dart
import 'package:openapi/api.dart';

final api_instance = SlotsApi();
final id = id_example; // String | Provider ID

try {
    final result = api_instance.slotsProviderGetIdGet(id);
    print(result);
} catch (e) {
    print('Exception when calling SlotsApi->slotsProviderGetIdGet: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**| Provider ID | 

### Return type

[**List<EntitiesSlot>**](EntitiesSlot.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


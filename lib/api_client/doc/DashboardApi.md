# openapi.api.DashboardApi

## Load the API package
```dart
import 'package:openapi/api.dart';
```

All URIs are relative to *http://localhost:3000/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**dashboardWeeklyIdGet**](DashboardApi.md#dashboardweeklyidget) | **GET** /dashboard/weekly/{id} | Get weekly stats for a market


# **dashboardWeeklyIdGet**
> EntitiesDashboardResponse dashboardWeeklyIdGet(id)

Get weekly stats for a market

Get weekly stats for a market with the market ID

### Example
```dart
import 'package:openapi/api.dart';

final api_instance = DashboardApi();
final id = id_example; // String | Market ID

try {
    final result = api_instance.dashboardWeeklyIdGet(id);
    print(result);
} catch (e) {
    print('Exception when calling DashboardApi->dashboardWeeklyIdGet: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**| Market ID | 

### Return type

[**EntitiesDashboardResponse**](EntitiesDashboardResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


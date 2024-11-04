# openapi.api.PaymentsApi

## Load the API package
```dart
import 'package:openapi/api.dart';
```

All URIs are relative to *http://localhost:3000/api/v1*

Method | HTTP request | Description
------------- | ------------- | -------------
[**paymentsGetIdGet**](PaymentsApi.md#paymentsgetidget) | **GET** /payments/get/{id} | Get payment by ID


# **paymentsGetIdGet**
> DtosBookingResponse paymentsGetIdGet(id)

Get payment by ID

Get payment by the provided ID

### Example
```dart
import 'package:openapi/api.dart';

final api_instance = PaymentsApi();
final id = id_example; // String | Payment ID

try {
    final result = api_instance.paymentsGetIdGet(id);
    print(result);
} catch (e) {
    print('Exception when calling PaymentsApi->paymentsGetIdGet: $e\n');
}
```

### Parameters

Name | Type | Description  | Notes
------------- | ------------- | ------------- | -------------
 **id** | **String**| Payment ID | 

### Return type

[**DtosBookingResponse**](DtosBookingResponse.md)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


# bosco
Template for basic bosco site


## API

***

### Health Check

| Summary | |
| - | - |
| Description | Retrieves health status |
| Endpoint | `/health` |
| Verb | GET |

#### Request Headers

| Key | Value |
| - | - |
| Content-Type | application/json |

#### Responses

| Status Code | Description |
| - | - |
| 200 | Success |

#### Response Headers

| Key | Value |
| - | - |
| Content-Type | application/json |

#### Response Body
```json
{
    "status": "ok"
}
```

***

### Execute Function

| Summary | |
| - | - |
| Description | Executes a specified function using a specified payload |
| Endpoint | `/bosco/executeFunction` |
| Verb | POST |

#### Request Headers

| Key | Value |
| - | - |
| Content-Type | application/json |
| Authorization | BOSCO_API_KEY |

#### Request Body
##### execute lambda
```json
{
	"provider": "aws",
	"functionName": "MY_FUNCTION_NAME",
	"payload" : {
		"TransactionID": "12345",
		"Timestamp": 111111
	}
}
```
##### execute azure-function
```json
{
	"provider": "azure",
	"functionName": "MY_FUNCTION_NAME",
	"payload" : {
		"TransactionID": "12345",
		"Timestamp": 111111
	}
}
```

#### Responses

| Status Code | Description |
| - | - |
| 200 | Success - Function Executed |
| 401 | Unauthorized request - Invalid API key sent in auth header. |
| 500 | Internal Server Error |

#### Response Headers

| Key | Value |
| - | - |
| Version | BOSCO_VERSION |
| Content-Type | application/json |

#### Response Body
```json
{
    "status": 200,
    "data": {
        "implemented": true, 
        "startTime": START_TIME_EPOCH,
        "endTime": END_TIME_EPOCH,
        "duration": DIFFERENCE_BETWEEN_START_AND_END_TIME,
        "provider": "aws|azure",
        "service": "lambda|function",
        "action": "execute"
    }
}
```

***

### Write to DB

| Summary | |
| - | - |
| Description | Writes a specified payload to a db |
| Endpoint | `/bosco/writeToDatabase` |
| Verb | POST |

#### Request Headers

| Key | Value |
| - | - |
| Content-Type | application/json |
| Authorization | BOSCO_API_KEY |

#### Request Body
##### write to dynamo
```json
{
	"provider": "aws",
	"tableName": "MY_TABLE_NAME",
	"payload" : {
		"TransactionID": "12345",
		"Timestamp": 111111
	}
}
```
##### write to cosmos
```json
{
	"provider": "azure",
	"tableName": "MY_TABLE_NAME",
	"payload" : {
		"TransactionID": "12345",
		"Timestamp": 111111
	}
}
```

#### Responses

| Status Code | Description |
| - | - |
| 200 | Success - Payload written to database |
| 401 | Unauthorized request - Invalid API key sent in auth header. |
| 500 | Internal Server Error |

#### Response Headers

| Key | Value |
| - | - |
| Version | BOSCO_VERSION |
| Content-Type | application/json |

#### Response Body
```json
{
    "status": 200,
    "data": {
        "implemented": true, 
        "startTime": START_TIME_EPOCH,
        "endTime": END_TIME_EPOCH,
        "duration": DIFFERENCE_BETWEEN_START_AND_END_TIME,
        "provider": "aws|azure",
        "service": "dynamodb|cosmosdb",
        "action": "write"
    }
}
```


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
		"action": "execute",
		"payload": JSON_STRINGIFIED_LAMBDA_RESULT
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
- TransactionID does not need to be globally unique but should be unique within a particular strategy
##### write to dynamo
```json
{
	"provider": "aws",
	"tableName": "MY_TABLE_NAME",
	"payload" : {
		"strategy": "STRATEGY_TYPE",
		"transactionID": "SOME_UNIQUE_IDENTIFIER",
		"timestamp": OPTIONAL_EPOCH_TIMESTAMP,
		"message": "SOME_OPTIONAL_MESSAGE"
	}
}
```
##### write to cosmos
```json
{
	"provider": "azure",
	"tableName": "MY_TABLE_NAME",
	"payload" : {
		"strategy": "STRATEGY_TYPE",
		"transactionID": "SOME_UNIQUE_IDENTIFIER",
		"timestamp": OPTIONAL_EPOCH_TIMESTAMP,
		"message": "SOME_OPTIONAL_MESSAGE"
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

***

### Read from DB

| Summary | |
| - | - |
| Description | Reads a specified row from a db |
| Endpoint | `/bosco/readFromDatabase` |
| Verb | POST |

#### Request Headers

| Key | Value |
| - | - |
| Content-Type | application/json |
| Authorization | BOSCO_API_KEY |

#### Request Body
##### read from dynamo
```json
{
	"provider": "aws",
	"tableName": "MY_TABLE_NAME",
	"strategy": "HASH_KEY_VALUE",
	"transactionID": "SORT_KEY_VALUE"
}
```
##### read from cosmos
```json
{
	"provider": "azure",
	"tableName": "MY_TABLE_NAME",
	"strategy": "HASH_KEY_VALUE",
	"transactionID": "SORT_KEY_VALUE"
}
```

#### Responses

| Status Code | Description |
| - | - |
| 200 | Success - Payload retrieved from database |
| 401 | Unauthorized request - Invalid API key sent in auth header. |
| 500 | Internal Server Error |

#### Response Headers

| Key | Value |
| - | - |
| Version | BOSCO_VERSION |
| Content-Type | application/json |

#### Response Body
- TransactionID is not globally unique but should be unique within a particular strategy
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
		"action": "read",
		"payload": {
            "strategy": "STRATEGY_TYPE",
            "transactionID": "SOME_UNIQUE_IDENTIFIER",
            "timestamp": TIMESTAMP_EPOCH,
            "message": "SOME_OPTIONAL_MESSAGE"
        }
    }
}
```



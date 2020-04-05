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
	"strategy": "STRATEGY_TYPE",
	"transactionID": "SOME_UNIQUE_IDENTIFIER",
	"payload" : {
		"timestamp": OPTIONAL_EPOCH_TIMESTAMP,
		"message": "SOME_OPTIONAL_MESSAGE"
	}
}
```
##### execute function-app
```json
{
	"provider": "azure",
	"functionName": "AZURE_FUNCTION_URL",
	"strategy": "STRATEGY_TYPE",
	"transactionID": "SOME_UNIQUE_IDENTIFIER",
	"payload" : {
		"timestamp": OPTIONAL_EPOCH_TIMESTAMP,
		"message": "SOME_OPTIONAL_MESSAGE"
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
		"payload": LAMBDA_RESULT_OBJECT
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
	"strategy": "STRATEGY_TYPE",
	"transactionID": "SOME_UNIQUE_IDENTIFIER",
	"timestamp": OPTIONAL_EPOCH_TIMESTAMP,
	"message": "SOME_OPTIONAL_MESSAGE"
}
```
##### write to cosmos
```json
{
	"provider": "azure",
	"tableName": "MY_TABLE_NAME",
	"strategy": "STRATEGY_TYPE",
	"transactionID": "SOME_UNIQUE_IDENTIFIER",
	"timestamp": OPTIONAL_EPOCH_TIMESTAMP,
	"message": "SOME_OPTIONAL_MESSAGE"
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

***

### Write to File

| Summary | |
| - | - |
| Description | Writes specified data to file |
| Endpoint | `/bosco/writeToFile` |
| Verb | POST |

#### Request Headers

| Key | Value |
| - | - |
| Content-Type | application/json |
| Authorization | BOSCO_API_KEY |

#### Request Body
##### write to s3
```json
{
	"provider": "aws",
	"bucketName": "BUCKET_NAME",
	"strategy": "STRATEGY_TYPE",
	"transactionID": "SOME_UNIQUE_IDENTIFIER",
	"encryptionMethod": "OPTIONAL_SEE_S3_DOCS",
	"storageClass": "OPTIONAL_SEE_S3_DOCS",
	"timestamp": OPTIONAL_EPOCH_TIMESTAMP,
	"message": "SOME_OPTIONAL_MESSAGE"
}
```
##### write to azure storage
```json
{
	"provider": "azure",
	"bucketName": "BUCKET_NAME",
	"strategy": "STRATEGY_TYPE",
	"transactionID": "SOME_UNIQUE_IDENTIFIER",
	"timestamp": OPTIONAL_EPOCH_TIMESTAMP,
	"message": "SOME_OPTIONAL_MESSAGE"
}
```

#### Responses

| Status Code | Description |
| - | - |
| 200 | Success - Payload written to file |
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
		"action": "read",
		"payload": {
            "eTag": "SOME_ETAG",
            "serverSideEncryption": "ENCRYPTION_TYPE",
        }
    }
}
```

***

### Read from File

| Summary | |
| - | - |
| Description | Extracts contents from a specified file |
| Endpoint | `/bosco/readFromFile` |
| Verb | POST |

#### Request Headers

| Key | Value |
| - | - |
| Content-Type | application/json |
| Authorization | BOSCO_API_KEY |

#### Request Body
##### read from s3
```json
{
	"provider": "aws",
	"bucketName": "BUCKET_NAME",
	"strategy": "STRATEGY_TYPE",
	"transactionID": "SOME_UNIQUE_IDENTIFIER"
}
```
##### read from azure storage
```json
{
	"provider": "azure",
	"bucketName": "BUCKET_NAME",
	"strategy": "STRATEGY_TYPE",
	"transactionID": "SOME_UNIQUE_IDENTIFIER",
}
```

#### Responses

| Status Code | Description |
| - | - |
| 200 | Success - Payload extracted from file |
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
		"action": "read",
		"payload": {
            "acceptRanges": "bytes",
            "eTag": "SOME_ETAG",
            "serverSideEncryption": "ENCRYPTION_TYPE",
            "lastModified": "DATE_TIME_AS_STRING",
            "contentLength": 123,
            "storageClass": "STORAGE_TYPE",
            "metadata": {}, // FILE METADATA
            "content": {} // FILE CONTENT
        }
    }
}
```


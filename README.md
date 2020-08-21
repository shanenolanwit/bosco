# bosco

> Tá scamaill uafásach. Déanaimis éasca é

![bosco](./bosco.jpg?raw=true "bosco")

  * [About](#about)
  * [Prerequisites](#Prerequisites)
  * [API](#api)
    + [Health Check](#health-check)
      - [Request Headers](#request-headers)
      - [Responses](#responses)
      - [Response Headers](#response-headers)
      - [Response Body](#response-body)
    + [Execute Function](#execute-function)
      - [Request Headers](#request-headers-1)
      - [Request Body](#request-body)
        * [execute lambda](#execute-lambda)
        * [execute function-app](#execute-function-app)
      - [Responses](#responses-1)
      - [Response Headers](#response-headers-1)
      - [Response Body](#response-body-1)
    + [Write to DB](#write-to-db)
      - [Request Headers](#request-headers-2)
      - [Request Body](#request-body-1)
        * [write to dynamo](#write-to-dynamo)
        * [write to cosmos](#write-to-cosmos)
      - [Responses](#responses-2)
      - [Response Headers](#response-headers-2)
      - [Response Body](#response-body-2)
    + [Read from DB](#read-from-db)
      - [Request Headers](#request-headers-3)
      - [Request Body](#request-body-2)
        * [read from dynamo](#read-from-dynamo)
        * [read from cosmos](#read-from-cosmos)
      - [Responses](#responses-3)
      - [Response Headers](#response-headers-3)
      - [Response Body](#response-body-3)
    + [Write to File](#write-to-file)
      - [Request Headers](#request-headers-4)
      - [Request Body](#request-body-3)
        * [write to s3](#write-to-s3)
        * [write to azure storage](#write-to-azure-storage)
      - [Responses](#responses-4)
      - [Response Headers](#response-headers-4)
      - [Response Body](#response-body-4)
    + [Read from File](#read-from-file)
      - [Request Headers](#request-headers-5)
      - [Request Body](#request-body-4)
        * [read from s3](#read-from-s3)
        * [read from azure storage](#read-from-azure-storage)
      - [Responses](#responses-5)
      - [Response Headers](#response-headers-5)
      - [Response Body](#response-body-5)
* [Dependencies](#dependencies)

## About

bosco is an express application which abstracts both the aws sdk and the  azure sdk and enables extremely loose coupling of services. Function, Database and  File Storage services can be mixed and matched as required. 

bosco uses normalised payloads and a simplified api to seamlessly work with and 
switch between providers

## Prerequisites
Ensure you have NodeJS installed
```
node --version
```
Install node modules
```
npm i
```
Start the server
```
npm run local
```

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
## Dependencies
```json
"devDependencies": {
    "depcheck": "^0.8.4",
    "eslint": "^6.8.0",
    "eslint-config-airbnb-base": "^14.1.0",
    "eslint-plugin-import": "^2.20.1",
    "eslint-plugin-mocha": "^6.3.0",
    "mocha": "^7.1.0",
    "nodemon": "^2.0.2",
    "sinon": "^9.0.0",
    "supertest": "^4.0.2"
  },
  "dependencies": {
    "@azure/abort-controller": "^1.0.1",
    "@azure/cosmos": "^3.6.2",
    "@azure/storage-blob": "^12.1.1",
    "aws-sdk": "^2.633.0",
    "csv-parse": "^4.8.8",
    "dotenv": "^8.2.0",
    "express": "^4.17.1",
    "json2csv": "^5.0.0",
    "loglevel": "^1.6.7",
    "node-fetch": "^2.6.0",
    "serverless-http": "^2.3.2",
    "shortid": "^2.2.15",
    "url-parse": "^1.4.7"
  }
```

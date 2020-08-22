# bosco

> Tá scamaill uafásach. Déanaimis éasca é

![bosco](./bosco.jpg?raw=true "bosco")

- [About](#about)
- [Prerequisites](#prerequisites)
- [Start the Application](#start-the-application)
- [API](#api)
  * [Health Check](#health-check)
  * [Execute Function](#execute-function)
  * [Write to DB](#write-to-db)
  * [Read from DB](#read-from-db)
  * [Write to File](#write-to-file)
  * [Read from File](#read-from-file)
- [Sample CURL Requests](#sample-curl-requests)
  * [Execute Function](#execute-function-1)
  * [File IO](#file-io)
  * [Database Transactions](#database-transactions)
- [CollectorJS](#collectorjs)
- [Dependencies](#dependencies)

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
Rename the `.env.sample` file to `.env`
```
mv .env.sample .env
```
Update the `.env` file to match your own environment. These values are required 
to allow the bosco application gain access to your multi cloud infrastructure.
```
NODE_SERVER_PORT=3000
BOSCO_API_KEY=
LOG_LEVEL=debug
DEFAULT_PROVIDER=aws
AWS_REGION=eu-west-1
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
COSMOS_DATABASE=
COSMOS_ENDPOINT=
COSMOS_KEY=
STORAGE_ACCOUNT_NAME=
STORAGE_KEY=
```

## Start the Application
Start the server
```
npm run local
```
The `start` command in `package.json` is not used here, the `index.js` file can be used as an entry point if deploying the bosco api to an AWS Lambda using `serverless` or similar frameworks.  

***
***
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
	"functionName": "AWS_LAMBDA_NAME",
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
## Sample CURL Requests
The Authorization value in the following CURL requests is `abc123`, this should be modified to match the `BOSCO_API_KEY` value from your own `.env` file
### Execute Function
#### Invoke AWS Lambda
```
curl --location --request POST 'localhost:3000/bosco/executeFunction' \
--header 'Content-Type: application/json' --header 'Authorization: abc123' \
--data-raw '{
	"provider": "aws",
	"functionName": "aws-nodejs-dev-sayHello",
	"transactionID": "12345",
	"strategy": "STRATEGYA",
	"payload" : {
		"timestamp": 1234321,
		"message": "hello world"
	}
}'
```
#### Invoke Azure Function
```
curl --location --request POST 'localhost:3000/bosco/executeFunction' \
--header 'Content-Type: application/json' --header 'Authorization: abc123' \
--data-raw '{
	"provider": "azure",
	"functionName": "https://tx-cloudy-dayz.azurewebsites.net/api/HttpTrigger1",
	"transactionID": "12345",
	"strategy": "STRATEGYA",
	"payload" : {
		"timestamp": 1234321,
		"message": "hello world"
	}
}'
```
### File IO
#### Write to AWS S3
```
curl --location --request POST 'localhost:3000/bosco/writeToFile' \
--header 'Content-Type: application/json' --header 'Authorization: abc123' \
--data-raw '{
    "provider": "aws",
	"bucketName": "cloudy-dayz-bucket",
	"strategy": "STRATEGYA",
	"transactionID": "1a",
	"encryptionMethod": "AES256",
	"storageClass": "STANDARD_IA",
	"timestamp": 1234321,
	"message": "hello s3"
}'
```
#### Read from AWS S3
```
curl --location --request POST 'localhost:3000/bosco/readFromFile' \
--header 'Content-Type: application/json' --header 'Authorization: abc123' \
--data-raw '{
    "provider": "aws",
	"bucketName": "cloudy-dayz-bucket",
	"transactionID": "1a",
	"strategy": "STRATEGYA"
}'
```
#### Write to Azure Storage
```
curl --location --request POST 'localhost:3000/bosco/writeToFile' \
--header 'Content-Type: application/json' --header 'Authorization: abc123' \
--data-raw '{
    "provider": "azure",
	"bucketName": "cloudy-dayz-bucket",
	"strategy": "STRATEGYA",
	"transactionID": "1a",
	"timestamp": 1234321,
	"message": "hello azure"
}' 
```
#### Read from Azure Storage
```
curl --location --request POST 'localhost:3000/bosco/readFromFile' \
--header 'Content-Type: application/json' --header 'Authorization: abc123' \
--data-raw '{
    "provider": "azure",
	"bucketName": "cloudy-dayz-bucket",
	"transactionID": "1a",
	"strategy": "STRATEGYA"
}'
```
### Database Transactions
#### Write to AWS Dynamo
```
curl --location --request POST 'localhost:3000/bosco/writeToDatabase' \
--header 'Content-Type: application/json' --header 'Authorization: abc123' \
--data-raw '{
    "provider": "aws",
	"tableName": "hellodb",
	"strategy": "STRATEGYC",
	"transactionID": "1111aa",
	"timestamp": 1234321,
	"message": "hello dynamo"
}'
```
#### Read from AWS Dynamo
```
curl --location --request POST 'localhost:3000/bosco/readFromDatabase' \
--header 'Content-Type: application/json' --header 'Authorization: abc123' \
--data-raw '{
	"provider": "aws",
	"tableName": "hellodb",
	"strategy": "STRATEGYC",
	"transactionID": "1111aa"
}' -v
```
#### Write to Azure Cosmos
```
curl --location --request POST 'localhost:3000/bosco/writeToDatabase' \
--header 'Content-Type: application/json' --header 'Authorization: abc123' \
--data-raw '{
    "provider": "azure",
	"tableName": "transaction",
	"strategy": "STRATEGYC",
	"transactionID": "1111aa",
	"timestamp": 1234321,
	"message": "hello cosmos"
}'
```
#### Read From Azure Cosmos
```
curl --location --request POST 'localhost:3000/bosco/readFromDatabase' \
--header 'Content-Type: application/json' --header 'Authorization: abc123' \
--data-raw '{
	"provider": "azure",
	"tableName": "transaction",
	"strategy": "STRATEGYC",
	"transactionID": "1111aa"
}
```

## CollectorJS
The `collector.js` script found at the project route is a template NodeJS file that can be used to automate your bosco api tests and record the performance results. Delays, function names, bucket names etc can all be modified to suit your own requirements. Results of each operation will be recorded in the `tx.csv` file in a `results` directory.

The format of each line follows the pattern 
```
status,startTime,endTime,duration,provider,service,action,transactionID,strategy
```

Sample `results/tx.csv` snippet:
```
200,1590048965297,1590048965519,222,"aws","fn:lambda","execute","OOu2UETsH","BASE"
200,1590048965533,1590048965882,349,"azure","fn:function","execute","OOu2UETsH","BASE"
200,1590048965887,1590048966053,166,"aws","db:dynamodb","write","OOu2UETsH","BASE"
200,1590048966057,1590048966781,724,"azure","db:cosmosdb","write","OOu2UETsH","BASE"
200,1590048966784,1590048966865,81,"aws","db:dynamodb","read","OOu2UETsH","BASE"
200,1590048966868,1590048967042,174,"azure","db:cosmosdb","read","OOu2UETsH","BASE"
200,1590048967046,1590048967227,181,"aws","fs:s3","write","OOu2UETsH","BASE"
200,1590048967231,1590048967617,386,"azure","fs:storage","write","OOu2UETsH","BASE"
200,1590048967621,1590048967755,134,"aws","fs:s3","read","OOu2UETsH","BASE"
200,1590048967758,1590048967804,46,"azure","fs:storage","read","OOu2UETsH","BASE"
200,1590048967860,1590048967950,90,"aws","fn:lambda","execute","C2_NxCYhc","BASE"
200,1590048967953,1590048968133,180,"azure","fn:function","execute","C2_NxCYhc","BASE"
...
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

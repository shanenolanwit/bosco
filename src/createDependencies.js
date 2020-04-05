const AWS = require('aws-sdk');
const fetch = require('node-fetch');
const { AbortController } = require('@azure/abort-controller');
const { CosmosClient } = require('@azure/cosmos');
const {
  BlobServiceClient, StorageSharedKeyCredential
} = require('@azure/storage-blob');

const FunctionApp = require('./api/logic/azure/FunctionApp');
const Cosmos = require('./api/logic/azure/Cosmos');
const Storage = require('./api/logic/azure/Storage');
const Lambda = require('./api/logic/aws/Lambda');
const Dynamo = require('./api/logic/aws/Dynamo');
const S3 = require('./api/logic/aws/S3');
const AwsController = require('./controller/AwsController');
const AzureController = require('./controller/AzureController');

const ONE_MINUTE = 60 * 1000;

module.exports = (logger, env) => {
  logger.setDefaultLevel(env.LOG_LEVEL);
  logger.debug('building dependencies');
  logger.debug(env);

  const lambdaLib = new AWS.Lambda({ apiVersion: '2015-03-31', region: env.AWS_DEFAULT_REGION });
  const dynamoLib = new AWS.DynamoDB.DocumentClient({ apiVersion: '2015-03-31', region: env.AWS_DEFAULT_REGION });
  const s3Lib = new AWS.S3({ apiVersion: '2015-03-31', region: env.AWS_DEFAULT_REGION });

  const lambda = new Lambda({ logger, env, lambdaLib });
  const dynamo = new Dynamo({ logger, env, dynamoLib });
  const s3 = new S3({ logger, env, s3Lib });

  const cosmosLib = new CosmosClient({ endpoint: env.COSMOS_ENDPOINT, key: env.COSMOS_KEY });
  const storageCredentials = new StorageSharedKeyCredential(env.STORAGE_ACCOUNT_NAME, env.STORAGE_KEY);
  const storageLib = new BlobServiceClient(`https://${env.STORAGE_ACCOUNT_NAME}.blob.core.windows.net`, storageCredentials);

  const timeoutFunction = AbortController.timeout(ONE_MINUTE);
  const cosmos = new Cosmos({ logger, env, cosmosLib });
  const storage = new Storage({
    logger, env, storageLib, timeoutFunction
  });
  const functionApp = new FunctionApp({ logger, env, fetch });

  const awsController = new AwsController({
    logger, lambda, dynamo, s3
  });
  const azureController = new AzureController({
    logger, functionApp, cosmos, storage
  });

  return {
    logger,
    awsController,
    azureController,
    env
  };
};

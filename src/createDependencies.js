const AWS = require('aws-sdk');
const { CosmosClient } = require('@azure/cosmos');
const Cosmos = require('./api/logic/azure/Cosmos');
const Lambda = require('./api/logic/aws/Lambda');
const Dynamo = require('./api/logic/aws/Dynamo');
const S3 = require('./api/logic/aws/S3');
const AwsController = require('./controller/AwsController');
const AzureController = require('./controller/AzureController');

const Timer = require('./utils/Timer');

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

  const cosmos = new Cosmos({ logger, env, cosmosLib });

  const awsController = new AwsController({
    logger, lambda, dynamo, s3
  });
  const azureController = new AzureController({
    logger, cosmos
  });

  const timer = new Timer({ logger });
  return {
    logger,
    awsController,
    azureController,
    timer,
    env
  };
};

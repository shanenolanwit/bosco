const AWS = require('aws-sdk');
const Lambda = require('./api/logic/aws/Lambda');
const Dynamo = require('./api/logic/aws/Dynamo');
const AwsController = require('./controller/AwsController');
const AzureController = require('./controller/AzureController');

const Timer = require('./utils/Timer');

module.exports = (logger, env) => {
  logger.setDefaultLevel(env.LOG_LEVEL);
  logger.debug('building dependencies');
  logger.debug(env);

  const lambdaLib = new AWS.Lambda({ apiVersion: '2015-03-31', region: env.AWS_DEFAULT_REGION });
  const dynamoLib = new AWS.DynamoDB.DocumentClient({ apiVersion: '2015-03-31', region: env.AWS_DEFAULT_REGION });

  const lambda = new Lambda({ logger, env, lambdaLib });
  const dynamo = new Dynamo({ logger, env, dynamoLib });

  const awsController = new AwsController({ logger, lambda, dynamo });
  const azureController = new AzureController({ logger });

  const timer = new Timer({ logger });
  return {
    logger,
    awsController,
    azureController,
    timer,
    env
  };
};

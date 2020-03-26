const AwsController = require('./controller/AwsController');
const AzureController = require('./controller/AzureController');

const Timer = require('./utils/Timer');

module.exports = (logger, env) => {
  logger.setDefaultLevel(env.LOG_LEVEL);
  logger.debug('building dependencies');
  logger.debug(env);

  const awsController = new AwsController({ logger });
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

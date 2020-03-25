require('dotenv').config();
const logger = require('loglevel');
const serverless = require('serverless-http');
const router = require('./router');
const createDependencies = require('./createDependencies');
const env = require('./getEnvVars')();


module.exports.handler = async (event, context, callback) => {
  logger.info(`request to ${event.path}`);
  const deps = createDependencies(logger, env);
  const app = router(deps);
  return serverless(app)(event, context, callback);
};

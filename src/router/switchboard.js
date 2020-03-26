const Express = require('express');
const safeAccess = require('../utils/safeAccess');
const GenericRequest = require('../api/request/GenericRequest');
const InvokeLambdaRequest = require('../api/request/InvokeLambdaRequest');

const injectAppVersionMiddleware = require('../middleware/injectAppVersion');
const verifyApiKeyMiddleware = require('../middleware/verifyApiKey');

const useAws = (req) => (/aws/i).test(safeAccess(['body', 'provider'], req));
const useAzure = (req) => (/azure/i).test(safeAccess(['body', 'provider'], req));
const UNKNOWN_PROVIDER_ERROR = 'Unknown Provider';

module.exports = (deps) => {
  const {
    logger,
    env,
    awsController,
    azureController,
    timer,
  } = deps;
  const router = Express.Router({ mergeParams: true });

  router.use([injectAppVersionMiddleware, verifyApiKeyMiddleware]);

  router.post('/executeFunction', async (req, res) => {
    let resp;
    if (useAws(req)) {
      const request = new InvokeLambdaRequest({
        req, logger, timer, env
      });
      resp = await awsController.invokeLambda(request);
    } else if (useAzure(req)) {
      const request = new GenericRequest({
        req, logger, timer, env
      });
      resp = await azureController.executeFunction(request);
    } else {
      logger.error(UNKNOWN_PROVIDER_ERROR);
    }
    return res.status(200).send({ status: resp.getStatus(), data: resp.getData() });
  });

  router.post('/readFromFile', async (req, res) => {
    let resp;
    const request = new GenericRequest({
      req, logger, timer, env
    });
    if (useAws(req)) {
      resp = await awsController.s3Read(request);
    } else if (useAzure(req)) {
      resp = await azureController.storageRead(request);
    } else {
      logger.error(UNKNOWN_PROVIDER_ERROR);
    }
    return res.status(200).send({ status: resp.getStatus(), data: resp.getData() });
  });

  router.post('/writeToFile', async (req, res) => {
    let resp;
    const request = new GenericRequest({
      req, logger, timer, env
    });
    if (useAws(req)) {
      resp = await awsController.s3Write(request);
    } else if (useAzure(req)) {
      resp = await azureController.storageWrite(request);
    } else {
      logger.error(UNKNOWN_PROVIDER_ERROR);
    }
    return res.status(200).send({ status: resp.getStatus(), data: resp.getData() });
  });

  router.post('/readFromDatabase', async (req, res) => {
    let resp;
    const request = new GenericRequest({
      req, logger, timer, env
    });
    if (useAws(req)) {
      resp = await awsController.dynamoRead(request);
    } else if (useAzure(req)) {
      resp = await azureController.cosmosRead(request);
    } else {
      logger.error(UNKNOWN_PROVIDER_ERROR);
    }
    return res.status(200).send({ status: resp.getStatus(), data: resp.getData() });
  });

  router.post('/writeToDatabase', async (req, res) => {
    let resp;
    const request = new GenericRequest({
      req, logger, timer, env
    });
    if (useAws(req)) {
      resp = await awsController.dynamoWrite(request);
    } else if (useAzure(req)) {
      resp = await azureController.cosmosWrite(request);
    } else {
      logger.error(UNKNOWN_PROVIDER_ERROR);
    }
    return res.status(200).send({ status: resp.getStatus(), data: resp.getData() });
  });

  return router;
};

const Express = require('express');
const GenericRequest = require('../api/request/GenericRequest');

const useProvider = (requestedProvider, provider) => requestedProvider.toLowerCase() === provider.toLowerCase();
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

  router.post('/executeFunction', async (req, res) => {
    let resp;
    const request = new GenericRequest({
      req, logger, timer, env
    });
    if (useProvider(request.getProvider(), 'aws')) {
      resp = await awsController.executeLambda(request);
    } else if (useProvider(request.getProvider(), 'azure')) {
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
    if (useProvider(request.getProvider(), 'aws')) {
      resp = await awsController.s3Read(request);
    } else if (useProvider(request.getProvider(), 'azure')) {
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
    if (useProvider(request.getProvider(), 'aws')) {
      resp = await awsController.s3Write(request);
    } else if (useProvider(request.getProvider(), 'azure')) {
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
    if (useProvider(request.getProvider(), 'aws')) {
      resp = await awsController.dynamoRead(request);
    } else if (useProvider(request.getProvider(), 'azure')) {
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
    if (useProvider(request.getProvider(), 'aws')) {
      resp = await awsController.dynamoWrite(request);
    } else if (useProvider(request.getProvider(), 'azure')) {
      resp = await azureController.cosmosWrite(request);
    } else {
      logger.error(UNKNOWN_PROVIDER_ERROR);
    }
    return res.status(200).send({ status: resp.getStatus(), data: resp.getData() });
  });

  return router;
};

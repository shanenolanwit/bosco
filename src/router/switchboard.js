/* eslint-disable no-console */
const Express = require('express');
const safeAccess = require('../utils/safeAccess');

const InvokeLambdaRequest = require('../api/request/InvokeLambdaRequest');
const WriteToDynamoRequest = require('../api/request/WriteToDynamoRequest');
const ReadFromDynamoRequest = require('../api/request/ReadFromDynamoRequest');
const WriteToS3Request = require('../api/request/WriteToS3Request');
const ReadFromS3Request = require('../api/request/ReadFromS3Request');

const InvokeFunctionRequest = require('../api/request/InvokeFunctionRequest');
const WriteToCosmosRequest = require('../api/request/WriteToCosmosRequest');
const ReadFromCosmosRequest = require('../api/request/ReadFromCosmosRequest');
const WriteToStorageRequest = require('../api/request/WriteToStorageRequest');
const ReadFromStorageRequest = require('../api/request/ReadFromStorageRequest');

const injectAppVersionMiddleware = require('../middleware/injectAppVersion');
const verifyApiKeyMiddleware = require('../middleware/verifyApiKey');

const useAws = (req) => (/aws/i).test(safeAccess(['body', 'provider'], req));
const useAzure = (req) => (/azure/i).test(safeAccess(['body', 'provider'], req));
const UNKNOWN_PROVIDER_ERROR = 'Unknown Provider';

const defaultResponse = {
  getStatus: () => 500,
  getData: () => ({ error: 'Internal Server Error' })
};

module.exports = (deps) => {
  const {
    logger,
    env,
    awsController,
    azureController
  } = deps;
  const router = Express.Router({ mergeParams: true });

  router.use([injectAppVersionMiddleware, verifyApiKeyMiddleware]);

  router.post('/executeFunction', async (req, res) => {
    let resp = defaultResponse;
    try {
      if (useAws(req)) {
        const request = new InvokeLambdaRequest({
          req, logger, env
        });
        resp = await awsController.invokeLambda(request);
      } else if (useAzure(req)) {
        const request = new InvokeFunctionRequest({
          req, logger, env
        });
        resp = await azureController.executeFunction(request);
      } else {
        logger.error(UNKNOWN_PROVIDER_ERROR);
      }
    } catch (e) {
      console.log(e);
    }
    return res.status(200).send({ status: resp.getStatus(), data: resp.getData() });
  });

  router.post('/readFromFile', async (req, res) => {
    let resp = defaultResponse;
    let request;
    try {
      if (useAws(req)) {
        request = new ReadFromS3Request({
          req, logger, env
        });
        resp = await awsController.s3Read(request);
      } else if (useAzure(req)) {
        request = new ReadFromStorageRequest({
          req, logger, env
        });
        resp = await azureController.storageRead(request);
      } else {
        logger.error(UNKNOWN_PROVIDER_ERROR);
      }
    } catch (e) {
      console.log(e);
    }
    return res.status(200).send({ status: resp.getStatus(), data: resp.getData() });
  });

  router.post('/writeToFile', async (req, res) => {
    let resp = defaultResponse;
    let request;
    try {
      if (useAws(req)) {
        request = new WriteToS3Request({
          req, logger, env
        });
        resp = await awsController.s3Write(request);
      } else if (useAzure(req)) {
        request = new WriteToStorageRequest({
          req, logger, env
        });
        resp = await azureController.storageWrite(request);
      } else {
        logger.error(UNKNOWN_PROVIDER_ERROR);
      }
    } catch (e) {
      console.log(e);
    }
    return res.status(200).send({ status: resp.getStatus(), data: resp.getData() });
  });

  router.post('/readFromDatabase', async (req, res) => {
    let resp = defaultResponse;
    let request;
    try {
      if (useAws(req)) {
        request = new ReadFromDynamoRequest({
          req, logger, env
        });
        resp = await awsController.dynamoRead(request);
      } else if (useAzure(req)) {
        request = new ReadFromCosmosRequest({
          req, logger, env
        });
        resp = await azureController.cosmosRead(request);
      } else {
        logger.error(UNKNOWN_PROVIDER_ERROR);
      }
    } catch (e) {
      console.log(e);
    }
    return res.status(200).send({ status: resp.getStatus(), data: resp.getData() });
  });

  router.post('/writeToDatabase', async (req, res) => {
    let resp = defaultResponse;
    let request;
    try {
      if (useAws(req)) {
        request = new WriteToDynamoRequest({
          req, logger, env
        });
        resp = await awsController.dynamoWrite(request);
      } else if (useAzure(req)) {
        request = new WriteToCosmosRequest({
          req, logger, env
        });
        resp = await azureController.cosmosWrite(request);
      } else {
        logger.error(UNKNOWN_PROVIDER_ERROR);
        resp = {
          getStatus: () => 404,
          getData: () => ({ message: 'unknown provider' })
        };
      }
    } catch (e) {
      console.log(e);
    }

    return res.status(200).send({ status: resp.getStatus(), data: resp.getData() });
  });

  return router;
};

const assert = require('assert');
const GenericResponse = require('../api/response/GenericResponse');
const FunctionAppResponse = require('../api/response/FunctionAppResponse');
const CosmosReadResponse = require('../api/response/CosmosReadResponse');
const StorageReadResponse = require('../api/response/StorageReadResponse');
const StorageWriteResponse = require('../api/response/StorageWriteResponse');

const PROVIDER = 'azure';
const EXECUTE_SERVICE = 'fn:function';
const DATABASE_SERVICE = 'db:cosmosdb';
const FILE_STORAGE_SERVICE = 'fs:storage';

module.exports = class AzureController {
  constructor({
    logger, functionApp, cosmos, storage
  }) {
    assert(logger, 'logger is required');
    assert(functionApp, 'functionApp is required');
    assert(cosmos, 'cosmos is required');
    assert(storage, 'storage is required');
    this.logger = logger;
    this.functionApp = functionApp;
    this.cosmos = cosmos;
    this.storage = storage;
  }

  async executeFunction(request) {
    const provider = PROVIDER;
    const service = EXECUTE_SERVICE;
    const action = 'execute';
    this.logger.info(`${provider}:${service}:${action}`);
    this.logger.debug(JSON.stringify(request));

    const startTime = new Date().getTime();
    const resp = await this.functionApp.invoke(request);
    this.logger.debug(JSON.stringify(resp));
    const functionAppResponse = new FunctionAppResponse(resp);
    const endTime = new Date().getTime();
    const status = functionAppResponse.getStatus() || 500;
    const data = {
      status,
      startTime,
      endTime,
      duration: (endTime - startTime),
      provider,
      service,
      action,
      transactionID: request.getTransactionID(),
      strategy: request.getStrategy(),
      payload: functionAppResponse.getPayload()
    };
    return new GenericResponse({ status, data });
  }

  async cosmosRead(request) {
    const provider = PROVIDER;
    const service = DATABASE_SERVICE;
    const action = 'read';
    this.logger.info(`${provider}:${service}:${action}`);
    this.logger.debug(JSON.stringify(request));

    const startTime = new Date().getTime();
    const resp = await this.cosmos.read(request);
    const cosmosReadResponse = new CosmosReadResponse(resp);
    const endTime = new Date().getTime();

    const data = {
      status: 200,
      startTime,
      endTime,
      duration: (endTime - startTime),
      provider,
      service,
      action,
      transactionID: request.getTransactionID(),
      strategy: request.getStrategy(),
      payload: cosmosReadResponse.getPayload()
    };
    return new GenericResponse({ status: 200, data });
  }

  async cosmosWrite(request) {
    const provider = PROVIDER;
    const service = DATABASE_SERVICE;
    const action = 'write';
    this.logger.info(`${provider}:${service}:${action}`);
    this.logger.debug(JSON.stringify(request));

    const startTime = new Date().getTime();
    await this.cosmos.write(request);
    const endTime = new Date().getTime();

    const data = {
      status: 200,
      startTime,
      endTime,
      duration: (endTime - startTime),
      provider,
      service,
      action,
      transactionID: request.getTransactionID(),
      strategy: request.getStrategy(),
      payload: {}
    };
    return new GenericResponse({ status: 200, data });
  }

  async storageRead(request) {
    const provider = PROVIDER;
    const service = FILE_STORAGE_SERVICE;
    const action = 'read';
    this.logger.info(`${provider}:${service}:${action}`);
    this.logger.debug(JSON.stringify(request));

    const startTime = new Date().getTime();
    const resp = await this.storage.read(request);
    const storageReadResponse = new StorageReadResponse({ body: resp });
    const endTime = new Date().getTime();

    const data = {
      status: 200,
      startTime,
      endTime,
      duration: (endTime - startTime),
      provider,
      service,
      action,
      transactionID: request.getTransactionID(),
      strategy: request.getStrategy(),
      payload: storageReadResponse.getPayload()
    };
    return new GenericResponse({ status: 200, data });
  }

  async storageWrite(request) {
    const provider = PROVIDER;
    const service = FILE_STORAGE_SERVICE;
    const action = 'write';
    this.logger.info(`${provider}:${service}:${action}`);
    this.logger.debug(JSON.stringify(request));

    const startTime = new Date().getTime();
    const resp = await this.storage.write(request);
    const storageWriteResponse = new StorageWriteResponse(resp);
    const endTime = new Date().getTime();

    const data = {
      status: 200,
      startTime,
      endTime,
      duration: (endTime - startTime),
      provider,
      service,
      action,
      transactionID: request.getTransactionID(),
      strategy: request.getStrategy(),
      payload: storageWriteResponse.getPayload()
    };
    return new GenericResponse({ status: 200, data });
  }
};

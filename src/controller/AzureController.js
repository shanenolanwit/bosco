const assert = require('assert');
const GenericResponse = require('../api/response/GenericResponse');
const CosmosReadResponse = require('../api/response/CosmosReadResponse');
const StorageReadResponse = require('../api/response/StorageReadResponse');
const StorageWriteResponse = require('../api/response/StorageWriteResponse');

const PROVIDER = 'azure';
const EXECUTE_SERVICE = 'function';
const DATABASE_SERVICE = 'cosmosdb';
const FILE_STORAGE_SERVICE = 'storage';

module.exports = class AzureController {
  constructor({
    logger, cosmos, storage
  }) {
    assert(logger, 'logger is required');
    assert(cosmos, 'cosmos is required');
    assert(storage, 'storage is required');
    this.logger = logger;
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
    const endTime = new Date().getTime();
    const data = {
      implemented: false,
      startTime,
      endTime,
      duration: (endTime - startTime),
      provider,
      service,
      action,
    };
    return new GenericResponse({ status: 200, data });
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
      implemented: true,
      startTime,
      endTime,
      duration: (endTime - startTime),
      provider,
      service,
      action,
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
      implemented: true,
      startTime,
      endTime,
      duration: (endTime - startTime),
      provider,
      service,
      action,
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
    this.logger.debug(resp);
    const storageReadResponse = new StorageReadResponse({ body: resp });
    const endTime = new Date().getTime();

    const data = {
      implemented: true,
      startTime,
      endTime,
      duration: (endTime - startTime),
      provider,
      service,
      action,
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
      implemented: true,
      startTime,
      endTime,
      duration: (endTime - startTime),
      provider,
      service,
      action,
      strategy: request.getStrategy(),
      payload: storageWriteResponse.getPayload()
    };
    return new GenericResponse({ status: 200, data });
  }
};

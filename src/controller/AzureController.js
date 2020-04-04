const assert = require('assert');
const GenericResponse = require('../api/response/GenericResponse');
const CosmosReadResponse = require('../api/response/CosmosReadResponse');

const PROVIDER = 'azure';
const EXECUTE_SERVICE = 'function';
const DATABASE_SERVICE = 'cosmosdb';
const FILE_STORAGE_SERVICE = 'storage';

module.exports = class AzureController {
  constructor({
    logger, cosmos
  }) {
    assert(logger, 'logger is required');
    assert(cosmos, 'cosmos is required');
    this.logger = logger;
    this.cosmos = cosmos;
  }

  async executeFunction(request) {
    const provider = PROVIDER;
    const service = EXECUTE_SERVICE;
    const action = 'execute';
    this.logger.info(`${provider}:${service}:${action}`);
    this.logger.debug(JSON.stringify(request));
    request.getTimer().start();
    request.getTimer().stop();
    const startTime = request.getTimer().getStartTime();
    const endTime = request.getTimer().getEndTime();
    const duration = request.getTimer().getDuration();
    const data = {
      implemented: false,
      startTime,
      endTime,
      duration,
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
    request.getTimer().start();
    request.getTimer().stop();
    const startTime = request.getTimer().getStartTime();
    const endTime = request.getTimer().getEndTime();
    const duration = request.getTimer().getDuration();
    const resp = await this.cosmos.read(request);
    const cosmosReadResponse = new CosmosReadResponse(resp);
    const data = {
      implemented: false,
      startTime,
      endTime,
      duration,
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
    request.getTimer().start();
    request.getTimer().stop();
    const startTime = request.getTimer().getStartTime();
    const endTime = request.getTimer().getEndTime();
    const duration = request.getTimer().getDuration();
    await this.cosmos.write(request);
    const data = {
      implemented: false,
      startTime,
      endTime,
      duration,
      provider,
      service,
      action,
      strategy: request.getStrategy()
    };
    return new GenericResponse({ status: 200, data });
  }

  async storageRead(request) {
    const provider = PROVIDER;
    const service = FILE_STORAGE_SERVICE;
    const action = 'read';
    this.logger.info(`${provider}:${service}:${action}`);
    this.logger.debug(JSON.stringify(request));
    request.getTimer().start();
    request.getTimer().stop();
    const startTime = request.getTimer().getStartTime();
    const endTime = request.getTimer().getEndTime();
    const duration = request.getTimer().getDuration();
    const data = {
      implemented: false,
      startTime,
      endTime,
      duration,
      provider,
      service,
      action,
    };
    return new GenericResponse({ status: 200, data });
  }

  async storageWrite(request) {
    const provider = PROVIDER;
    const service = FILE_STORAGE_SERVICE;
    const action = 'write';
    this.logger.info(`${provider}:${service}:${action}`);
    this.logger.debug(JSON.stringify(request));
    request.getTimer().start();
    request.getTimer().stop();
    const startTime = request.getTimer().getStartTime();
    const endTime = request.getTimer().getEndTime();
    const duration = request.getTimer().getDuration();
    const data = {
      implemented: false,
      startTime,
      endTime,
      duration,
      provider,
      service,
      action,
    };
    return new GenericResponse({ status: 200, data });
  }
};

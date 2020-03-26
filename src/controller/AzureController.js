const assert = require('assert');
const GenericResponse = require('../api/response/GenericResponse');

const PROVIDER = 'azure';
const EXECUTE_SERVICE = 'function';
const DATABASE_SERVICE = 'cosmosdb';
const FILE_STORAGE_SERVICE = 'storage';

module.exports = class AzureController {
  constructor({
    logger
  }) {
    assert(logger, 'logger is required');
    this.logger = logger;
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

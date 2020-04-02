const assert = require('assert');
const GenericResponse = require('../api/response/GenericResponse');

const PROVIDER = 'aws';
const EXECUTE_SERVICE = 'lambda';
const DATABASE_SERVICE = 'dynamodb';
const FILE_STORAGE_SERVICE = 's3';

module.exports = class AwsController {
  constructor({
    logger, lambda, dynamo
  }) {
    assert(logger, 'logger is required');
    assert(lambda, 'lambda is required');
    assert(dynamo, 'dynamo is required');
    this.logger = logger;
    this.lambda = lambda;
    this.dynamo = dynamo;
  }

  async invokeLambda(request) {
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
    const resp = await this.lambda.invoke(request);
    this.logger.debug(JSON.stringify(resp));
    return new GenericResponse({ status: 200, data });
  }

  async dynamoWrite(request) {
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
    const resp = await this.dynamo.write(request);
    this.logger.debug(JSON.stringify(resp));
    return new GenericResponse({ status: 200, data });
  }

  async dynamoRead(request) {
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

  async s3Read(request) {
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

  async s3Write(request) {
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

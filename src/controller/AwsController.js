const assert = require('assert');
const GenericResponse = require('../api/response/GenericResponse');
const LambdaResponse = require('../api/response/LambdaResponse');
const DynamoReadResponse = require('../api/response/DynamoReadResponse');
const S3WriteResponse = require('../api/response/S3WriteResponse');
const S3ReadResponse = require('../api/response/S3ReadResponse');

const PROVIDER = 'aws';
const EXECUTE_SERVICE = 'fn:lambda';
const DATABASE_SERVICE = 'db:dynamodb';
const FILE_STORAGE_SERVICE = 'fs:s3';

module.exports = class AwsController {
  constructor({
    logger, lambda, dynamo, s3
  }) {
    assert(logger, 'logger is required');
    assert(lambda, 'lambda is required');
    assert(dynamo, 'dynamo is required');
    assert(s3, 's3 is required');
    this.logger = logger;
    this.lambda = lambda;
    this.dynamo = dynamo;
    this.s3 = s3;
  }

  async invokeLambda(request) {
    const provider = PROVIDER;
    const service = EXECUTE_SERVICE;
    const action = 'execute';
    this.logger.info(`${provider}:${service}:${action}`);
    this.logger.debug(JSON.stringify(request));

    const startTime = new Date().getTime();
    const resp = await this.lambda.invoke(request);
    this.logger.debug(JSON.stringify(resp));
    const lambdaResponse = new LambdaResponse(resp);
    const endTime = new Date().getTime();
    const status = lambdaResponse.getStatus() || 500;
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
      payload: lambdaResponse.getPayload()
    };

    return new GenericResponse({ status, data });
  }

  async dynamoWrite(request) {
    const provider = PROVIDER;
    const service = DATABASE_SERVICE;
    const action = 'write';
    this.logger.info(`${provider}:${service}:${action}`);
    this.logger.debug(JSON.stringify(request));

    const startTime = new Date().getTime();
    const resp = await this.dynamo.write(request);
    const endTime = new Date().getTime();

    this.logger.debug(JSON.stringify(resp));
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

  async dynamoRead(request) {
    const provider = PROVIDER;
    const service = DATABASE_SERVICE;
    const action = 'read';
    this.logger.info(`${provider}:${service}:${action}`);
    this.logger.debug(JSON.stringify(request));

    const startTime = new Date().getTime();
    const resp = await this.dynamo.read(request);
    this.logger.debug(JSON.stringify(resp));
    const dynamoReadResponse = new DynamoReadResponse(resp);
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
      payload: dynamoReadResponse.getPayload()
    };

    return new GenericResponse({ status: 200, data });
  }

  async s3Read(request) {
    const provider = PROVIDER;
    const service = FILE_STORAGE_SERVICE;
    const action = 'read';
    this.logger.info(`${provider}:${service}:${action}`);
    this.logger.debug(JSON.stringify(request));

    const startTime = new Date().getTime();
    const resp = await this.s3.read(request);
    this.logger.debug(JSON.stringify(resp));
    const s3ReadResponse = new S3ReadResponse(resp);
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
      payload: s3ReadResponse.getPayload()
    };
    return new GenericResponse({ status: 200, data });
  }

  async s3Write(request) {
    const provider = PROVIDER;
    const service = FILE_STORAGE_SERVICE;
    const action = 'write';
    this.logger.info(`${provider}:${service}:${action}`);
    this.logger.debug(JSON.stringify(request));

    const startTime = new Date().getTime();
    const resp = await this.s3.write(request);
    this.logger.debug(JSON.stringify(resp));
    const s3WriteResponse = new S3WriteResponse(resp);
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
      payload: s3WriteResponse.getPayload()
    };
    return new GenericResponse({ status: 200, data });
  }
};

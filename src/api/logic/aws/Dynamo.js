const assert = require('assert');

module.exports = class Lambda {
  constructor({ logger, env, dynamoLib }) {
    assert(logger, 'logger is required');
    assert(env, 'env is required');
    assert(dynamoLib, 'dynamoLib is required');
    this.logger = logger;
    this.env = env;
    this.dynamoLib = dynamoLib;
  }

  async write(writeToDynamoRequest) {
    const params = {
      TableName: writeToDynamoRequest.getTableName(),
      Item: writeToDynamoRequest.getPayload()
    };
    return this.dynamoLib.put(params).promise();
  }
};

const assert = require('assert');

module.exports = class Dynamo {
  constructor({ logger, env, dynamoLib }) {
    assert(logger, 'logger is required');
    assert(env, 'env is required');
    assert(dynamoLib, 'dynamoLib is required');
    this.logger = logger;
    this.env = env;
    this.dynamoLib = dynamoLib;
  }

  // TODO: Individual items cannot exceed 400kb - confirm this ??
  async write(writeToDynamoRequest) {
    const params = {
      TransactItems: [{
        Put: {
          TableName: writeToDynamoRequest.getTableName(),
          Item: writeToDynamoRequest.getPayload()
        }
      }]
    };

    return this.dynamoLib.transactWrite(params).promise();
  }

  async read(readFromDynamoRequest) {
    const params = {
      TableName: readFromDynamoRequest.getTableName(),
      Key: {
        Strategy: readFromDynamoRequest.getStrategy(),
        TransactionID: readFromDynamoRequest.getTransactionID()
      }
    };
    console.log(params);
    return this.dynamoLib.get(params).promise();
  }
};

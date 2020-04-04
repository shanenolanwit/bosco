const assert = require('assert');

const queryLib = {
  TRANSACTION_BY_STRATEGY_AND_ID: 'SELECT * FROM c where c.Strategy = @Strategy and c.TransactionID = @TransactionID'
};

module.exports = class Cosmos {
  constructor({
    logger, env, cosmosLib
  }) {
    assert(logger, 'logger is required');
    assert(env, 'env is required');
    assert(cosmosLib, 'cosmosLib is required');
    this.logger = logger;
    this.env = env;
    this.cosmosLib = cosmosLib;
    this.database = env.COSMOS_DATABASE;
  }

  async write(writeToCosmosRequest) {
    return this.cosmosLib
      .database(this.database)
      .container(writeToCosmosRequest.getTableName())
      .items.upsert(writeToCosmosRequest.getPayload());
  }

  async read(readFromCosmosRequest) {
    const querySpec = {
      query: queryLib.TRANSACTION_BY_STRATEGY_AND_ID,
      parameters: [
        {
          name: '@Strategy',
          value: readFromCosmosRequest.getStrategy()
        },
        {
          name: '@TransactionID',
          value: readFromCosmosRequest.getTransactionID()
        }
      ]
    };

    return this.cosmosLib
      .database(this.database)
      .container(readFromCosmosRequest.getTableName())
      .items.query(querySpec)
      .fetchAll();
  }
};

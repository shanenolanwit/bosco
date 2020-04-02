const assert = require('assert');

const GenericRequest = require('./GenericRequest');

module.exports = class ReadFromDynamoRequest extends GenericRequest {
  constructor(deps) {
    super(deps);
    const { req } = deps;
    const { tableName, strategy, transactionID } = req.body;
    assert(tableName, 'tableName is required');
    assert(strategy, 'strategy is required');
    assert(transactionID, 'transactionID is required');
    this.tableName = tableName;
    this.strategy = strategy;
    this.transactionID = transactionID;
  }

  getTableName() {
    return this.tableName;
  }

  getStrategy() {
    return this.strategy;
  }

  getTransactionID() {
    return this.transactionID;
  }
};

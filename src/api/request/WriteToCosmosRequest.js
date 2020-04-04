const assert = require('assert');

const GenericRequest = require('./GenericRequest');

const DEFAULT_MESSAGE = 'na';
const DEFAULT_STRATEGY = 'default';

module.exports = class WriteToDynamoRequest extends GenericRequest {
  constructor(deps) {
    super(deps);
    const { req } = deps;
    const {
      tableName, strategy, transactionID, timestamp, message
    } = req.body;
    assert(tableName, 'tableName is required');
    assert(transactionID, 'transactionID is required');
    this.tableName = tableName;
    this.strategy = strategy || DEFAULT_STRATEGY;
    this.transactionID = transactionID;
    this.timestamp = timestamp || Date.now();
    this.message = message || DEFAULT_MESSAGE;
  }

  getTableName() {
    return this.tableName;
  }

  getStrategy() {
    return this.strategy;
  }

  getPayload() {
    return {
      Strategy: this.strategy,
      TransactionID: this.transactionID,
      Timestamp: this.timestamp,
      Message: this.message
    };
  }
};

const assert = require('assert');

const GenericRequest = require('./GenericRequest');

const DEFAULT_MESSAGE = 'na';

module.exports = class WriteToDynamoRequest extends GenericRequest {
  constructor(deps) {
    super(deps);
    const { req } = deps;
    const { tableName, payload } = req.body;
    assert(tableName, 'tableName is required');
    assert(payload, 'payload is required');
    const {
      strategy, transactionID, timestamp, message
    } = payload;
    assert(strategy, 'strategy is required');
    assert(transactionID, 'transactionID is required');
    this.tableName = tableName;
    this.strategy = strategy;
    this.transactionID = transactionID;
    this.timestamp = timestamp || Date.now();
    this.message = message || DEFAULT_MESSAGE;
  }

  getTableName() {
    return this.tableName;
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

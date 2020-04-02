const assert = require('assert');

const GenericRequest = require('./GenericRequest');

const DEFAULT_MESSAGE = 'na';
const DEFAULT_STRATEGY = 'default';

module.exports = class WriteToDynamoRequest extends GenericRequest {
  constructor(deps) {
    super(deps);
    const { req } = deps;
    const {
      tableName, payload, strategy, transactionID
    } = req.body;
    assert(tableName, 'tableName is required');
    assert(payload, 'payload is required');
    assert(transactionID, 'transactionID is required');
    const {
      timestamp, message
    } = payload;
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

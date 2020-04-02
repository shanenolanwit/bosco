const assert = require('assert');

module.exports = class DynamoReadResponse {
  constructor({
    Item: item
  }) {
    assert(item, 'item is required');
    const {
      Strategy: strategy,
      TransactionID: transactionID,
      Timestamp: timestamp,
      Message: message
    } = item;
    assert(strategy, 'strategy is required');
    assert(transactionID, 'transactionID is required');
    assert(timestamp, 'timestamp is required');
    assert(message, 'message is required');
    this.transactionID = transactionID;
    this.timestamp = timestamp;
    this.strategy = strategy;
    this.message = message;
  }


  getExecutedVersion() {
    return this.executedVersion;
  }

  getPayload() {
    return {
      strategy: this.strategy,
      transactionID: this.transactionID,
      timestamp: this.timestamp,
      message: this.message
    };
  }
};

const assert = require('assert');

const GenericRequest = require('./GenericRequest');

const DEFAULT_MESSAGE = 'na';

const DEFAULT_STRATEGY = 'default';

module.exports = class WriteToStorageRequest extends GenericRequest {
  constructor(deps) {
    super(deps);
    const { req } = deps;
    const {
      bucketName, strategy, transactionID, timestamp, message
    } = req.body;
    assert(bucketName, 'bucketName is required');
    assert(transactionID, 'transactionID is required');
    this.strategy = strategy || DEFAULT_STRATEGY;
    this.transactionID = transactionID;
    this.bucketName = bucketName;
    this.key = `${strategy}_${transactionID}.json`;
    this.timestamp = timestamp || Date.now();
    this.message = message || DEFAULT_MESSAGE;
  }

  getStrategy() {
    return this.strategy;
  }

  getBucketName() {
    return this.bucketName;
  }

  getKey() {
    return this.key;
  }

  getPayload() {
    return {
      Strategy: this.strategy,
      TransactionID: this.transactionID,
      Timestamp: this.timestamp,
      Message: this.message,
      BucketName: this.bucketName,
      Key: this.key
    };
  }
};

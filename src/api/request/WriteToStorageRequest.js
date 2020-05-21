const assert = require('assert');

const GenericRequest = require('./GenericRequest');

const DEFAULT_MESSAGE = 'na';

module.exports = class WriteToStorageRequest extends GenericRequest {
  constructor(deps) {
    super(deps);
    const { req } = deps;
    const {
      bucketName, timestamp, message
    } = req.body;
    assert(bucketName, 'bucketName is required');
    this.bucketName = bucketName;
    this.key = `${this.strategy}_${this.transactionID}.json`;
    this.timestamp = timestamp || Date.now();
    this.message = message || DEFAULT_MESSAGE;
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

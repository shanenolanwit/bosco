const assert = require('assert');

const GenericRequest = require('./GenericRequest');

const DEFAULT_STRATEGY = 'default';

module.exports = class ReadFromS3Request extends GenericRequest {
  constructor(deps) {
    super(deps);
    const { req } = deps;
    const {
      bucketName, strategy, transactionID
    } = req.body;
    assert(bucketName, 'bucketName is required');
    assert(transactionID, 'transactionID is required');
    assert(transactionID, 'transactionID is required');
    this.strategy = strategy || DEFAULT_STRATEGY;
    this.transactionID = transactionID;
    this.bucketName = bucketName;
    this.key = `${strategy}_${transactionID}.json`;
  }

  getBucketName() {
    return this.bucketName;
  }

  getKey() {
    return this.key;
  }

  getStrategy() {
    return this.strategy;
  }

  getTransactionID() {
    return this.transactionID;
  }
};

const assert = require('assert');

const GenericRequest = require('./GenericRequest');

module.exports = class ReadFromStorageRequest extends GenericRequest {
  constructor(deps) {
    super(deps);
    const { req } = deps;
    const {
      bucketName
    } = req.body;
    assert(bucketName, 'bucketName is required');
    this.bucketName = bucketName;
    this.key = `${this.strategy}_${this.transactionID}.json`;
  }

  getBucketName() {
    return this.bucketName;
  }

  getKey() {
    return this.key;
  }
};

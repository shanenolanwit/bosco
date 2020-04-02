const assert = require('assert');

const GenericRequest = require('./GenericRequest');

const DEFAULT_MESSAGE = 'na';

const DEFAULT_ENCRYPTION_METHOD = 'AES256';
const DEFAULT_STORAGE_CLASS = 'STANDARD_IA';
const DEFAULT_STRATEGY = 'default';

module.exports = class WriteToS3Request extends GenericRequest {
  constructor(deps) {
    super(deps);
    const { req } = deps;
    const {
      bucketName, payload, strategy, transactionID, encryptionMethod, storageClass
    } = req.body;
    assert(bucketName, 'bucketName is required');
    assert(payload, 'payload is required');
    const {
      timestamp, message,
    } = payload;
    assert(transactionID, 'transactionID is required');
    this.strategy = strategy || DEFAULT_STRATEGY;
    this.transactionID = transactionID;
    this.bucketName = bucketName;
    this.key = `${strategy}_${transactionID}.json`;
    this.timestamp = timestamp || Date.now();
    this.message = message || DEFAULT_MESSAGE;
    this.encryptionMethod = encryptionMethod || DEFAULT_ENCRYPTION_METHOD;
    this.storageClass = storageClass || DEFAULT_STORAGE_CLASS;
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

  getEncryptionMethod() {
    return this.encryptionMethod;
  }

  getStorageClass() {
    return this.storageClass;
  }

  getPayload() {
    return {
      Strategy: this.strategy,
      TransactionID: this.transactionID,
      Timestamp: this.timestamp,
      Message: this.message,
      BucketName: this.bucketName,
      Key: this.key,
      EncryptionMethod: this.encryptionMethod,
      StorageClass: this.storageClass
    };
  }
};

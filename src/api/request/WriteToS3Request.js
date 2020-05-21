const assert = require('assert');

const GenericRequest = require('./GenericRequest');

const DEFAULT_MESSAGE = 'na';

const DEFAULT_ENCRYPTION_METHOD = 'AES256';
const DEFAULT_STORAGE_CLASS = 'STANDARD_IA';

module.exports = class WriteToS3Request extends GenericRequest {
  constructor(deps) {
    super(deps);
    const { req } = deps;
    const {
      bucketName,
      timestamp, message, encryptionMethod, storageClass
    } = req.body;
    assert(bucketName, 'bucketName is required');
    this.bucketName = bucketName;
    this.key = `${this.strategy}_${this.transactionID}.json`;
    this.timestamp = timestamp || Date.now();
    this.message = message || DEFAULT_MESSAGE;
    this.encryptionMethod = encryptionMethod || DEFAULT_ENCRYPTION_METHOD;
    this.storageClass = storageClass || DEFAULT_STORAGE_CLASS;
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

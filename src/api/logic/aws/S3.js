const assert = require('assert');

module.exports = class S3 {
  constructor({ logger, env, s3Lib }) {
    assert(logger, 'logger is required');
    assert(env, 'env is required');
    assert(s3Lib, 's3Lib is required');
    this.logger = logger;
    this.env = env;
    this.s3Lib = s3Lib;
  }

  async write(writeToS3Request) {
    const params = {
      Body: JSON.stringify(writeToS3Request.getPayload(), null, 2),
      Bucket: writeToS3Request.getBucketName(),
      Key: writeToS3Request.getKey(),
      ServerSideEncryption: writeToS3Request.getEncryptionMethod(),
      StorageClass: writeToS3Request.getStorageClass()
    };
    return this.s3Lib.putObject(params).promise();
  }

  async read(readFromS3Request) {
    const params = {
      Bucket: readFromS3Request.getBucketName(),
      Key: readFromS3Request.getKey()
    };
    return this.s3Lib.getObject(params).promise();
  }
};

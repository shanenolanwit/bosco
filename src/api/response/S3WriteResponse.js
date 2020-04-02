const assert = require('assert');

module.exports = class S3WriteResponse {
  constructor({
    ETag: eTag, ServerSideEncryption: serverSideEncryption
  }) {
    assert(eTag, 'eTag is required');
    assert(serverSideEncryption, 'serverSideEncryption is required');
    this.eTag = eTag;
    this.serverSideEncryption = serverSideEncryption;
  }

  getETag() {
    return this.eTag;
  }

  getServerSideEncryption() {
    return this.serverSideEncryption;
  }

  getPayload() {
    return {
      eTag: this.eTag,
      serverSideEncryption: this.serverSideEncryption
    };
  }
};

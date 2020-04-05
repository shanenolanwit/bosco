const assert = require('assert');

module.exports = class S3WriteResponse {
  constructor({
    etag, lastModified, isServerEncrypted
  }) {
    assert(etag, 'eTag is required');
    assert(lastModified, 'lastModified is required');
    assert(isServerEncrypted, 'isServerEncrypted is required');
    this.eTag = etag;
    this.lastModified = lastModified;
    this.isServerEncrypted = isServerEncrypted;
  }

  getETag() {
    return this.eTag;
  }

  getServerSideEncryption() {
    return this.isServerEncrypted;
  }

  getLastModified() {
    return this.lastModified;
  }

  getPayload() {
    return {
      eTag: this.eTag,
      serverSideEncryption: this.serverSideEncryption,
      lastModified: this.lastModified
    };
  }
};

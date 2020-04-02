const assert = require('assert');

module.exports = class S3ReadResponse {
  constructor({
    AcceptRanges: acceptRanges, ETag: eTag,
    ServerSideEncryption: serverSideEncryption,
    LastModified: lastModified, ContentLength: contentLength,
    StorageClass: storageClass, Metadata: metadata,
    Body: body
  }) {
    assert(acceptRanges, 'acceptRanges is required');
    assert(eTag, 'eTag is required');
    assert(serverSideEncryption, 'serverSideEncryption is required');
    assert(lastModified, 'lastModified is required');
    assert(contentLength, 'contentLength is required');
    assert(acceptRanges, 'acceptRanges is required');
    assert(storageClass, 'storageClass is required');
    assert(metadata, 'metadata is required');
    assert(body, 'body is required');
    this.acceptRanges = acceptRanges;
    this.eTag = eTag;
    this.serverSideEncryption = serverSideEncryption;
    this.lastModified = lastModified;
    this.contentLength = contentLength;
    this.storageClass = storageClass;
    this.metadata = metadata;
    this.content = JSON.parse(body.toString('utf-8'));
  }

  getPayload() {
    return {
      acceptRanges: this.acceptRanges,
      eTag: this.eTag,
      serverSideEncryption: this.serverSideEncryption,
      lastModified: this.lastModified,
      contentLength: this.contentLength,
      storageClass: this.storageClass,
      metadata: this.metadata,
      content: this.content
    };
  }
};

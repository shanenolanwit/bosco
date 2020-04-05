const assert = require('assert');

async function streamToString(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on('data', (data) => {
      chunks.push(data.toString());
    });
    readableStream.on('end', () => {
      resolve(chunks.join(''));
    });
    readableStream.on('error', reject);
  });
}

module.exports = class Storage {
  constructor({
    logger, env, storageLib, timeoutFunction
  }) {
    assert(logger, 'logger is required');
    assert(env, 'env is required');
    assert(storageLib, 'storageLib is required');
    assert(timeoutFunction, 'timeoutFunction is required');
    this.logger = logger;
    this.env = env;
    this.storageLib = storageLib;
    this.timeoutFunction = timeoutFunction;
  }

  async write(writeToStorageRequest) {
    const containerClient = this.storageLib.getContainerClient(writeToStorageRequest.getBucketName());
    const blobClient = containerClient.getBlobClient(writeToStorageRequest.getKey());
    const blockBlobClient = blobClient.getBlockBlobClient();

    const content = JSON.stringify(writeToStorageRequest.getPayload(), null, 2);

    return blockBlobClient.upload(content, content.length, this.timeoutFunction);
  }

  async read(readFromStorageRequest) {
    const containerClient = this.storageLib.getContainerClient(readFromStorageRequest.getBucketName());
    const blobClient = containerClient.getBlobClient(readFromStorageRequest.getKey());
    const blockBlobClient = blobClient.getBlockBlobClient();
    const offset = 0;
    const downloadResponse = await blockBlobClient.download(offset, this.timeoutFunction);
    return streamToString(downloadResponse.readableStreamBody);
  }
};

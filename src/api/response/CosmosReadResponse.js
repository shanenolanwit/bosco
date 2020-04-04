const assert = require('assert');

const deserialize = (item) => ({
  strategy: item.Strategy,
  transactionID: item.TransactionID,
  timestamp: item.Timestamp,
  message: item.Message,
  id: item.id
});

module.exports = class DynamoReadResponse {
  constructor({
    resources, headers, hasMoreResults
  }) {
    assert(resources, 'resources is required');
    assert(headers, 'headers is required');
    this.resources = resources;
    this.headers = headers;
    this.hasMoreResults = hasMoreResults;
  }

  getPayload() {
    let payload = {};
    if (this.resources.length > 1) {
      payload = this.resources.map((r) => deserialize(r));
    } else if (this.resources.length > 0) {
      payload = deserialize(this.resources[0]);
    }
    return payload;
  }
};

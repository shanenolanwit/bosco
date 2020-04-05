const assert = require('assert');

module.exports = class StorageReadResponse {
  constructor({
    body
  }) {
    assert(body, 'content is required');
    this.content = JSON.parse(body.toString('utf-8'));
  }

  getPayload() {
    return {
      content: this.content
    };
  }
};

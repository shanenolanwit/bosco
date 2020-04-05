const assert = require('assert');

module.exports = class FunctionAppResponse {
  constructor({
    status, body
  }) {
    assert(status, 'status is required');
    assert(body, 'body is required');
    this.status = status;
    this.body = body;
  }

  getStatus() {
    return this.status;
  }

  getPayload() {
    return {
      status: this.status,
      body: this.body
    };
  }
};

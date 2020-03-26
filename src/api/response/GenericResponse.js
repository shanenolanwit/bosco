const assert = require('assert');

module.exports = class ExecuteFunctionResponse {
  constructor({
    status, data
  }) {
    assert(status, 'status is required');
    assert(data, 'data is required');
    this.status = status;
    this.data = data;
  }

  getStatus() {
    return this.status;
  }

  getData() {
    return this.data;
  }
};

const assert = require('assert');

module.exports = class LambdaResponse {
  constructor({
    StatusCode: status, LogResult: logResult,
    ExecutedVersion: executedVersion, Payload: payload
  }) {
    assert(status, 'status is required');
    assert(logResult, 'logResult is required');
    assert(executedVersion, 'executedVersion is required');
    assert(payload, 'payload is required');
    this.status = status;
    this.logResult = logResult;
    this.executedVersion = executedVersion;
    this.payload = JSON.parse(payload);
  }

  getStatus() {
    return this.status;
  }

  getLogResult() {
    return this.logResult;
  }

  getExecutedVersion() {
    return this.executedVersion;
  }

  getPayload() {
    return this.payload;
  }
};

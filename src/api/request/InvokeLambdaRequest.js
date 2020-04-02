const assert = require('assert');

const GenericRequest = require('./GenericRequest');

const DEFAULT_INVOCATION_TYPE = 'RequestResponse'; // sync
const DEFAULT_LOG_TYPE = 'Tail';

module.exports = class ExecuteFunctionRequest extends GenericRequest {
  constructor(deps) {
    super(deps);
    const { req } = deps;
    const { functionName, payload } = req.body;
    assert(functionName, 'functionName is required');
    assert(payload, 'payload is required');
    this.functionName = functionName;
    this.invocationType = DEFAULT_INVOCATION_TYPE;
    this.logType = DEFAULT_LOG_TYPE;
    this.payload = payload;
  }

  getFunctionName() {
    return this.functionName;
  }

  getInvocationType() {
    return this.invocationType;
  }

  getLogType() {
    return this.logType;
  }

  getPayload() {
    return this.payload;
  }
};

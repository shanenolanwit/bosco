const assert = require('assert');

const GenericRequest = require('./GenericRequest');

const DEFAULT_MESSAGE = 'na';


module.exports = class InvokeFunctionRequest extends GenericRequest {
  constructor(deps) {
    super(deps);
    const { req } = deps;
    const {
      functionName, payload
    } = req.body;
    assert(functionName, 'functionName is required');
    const {
      timestamp, message
    } = payload;
    this.functionName = functionName;
    this.timestamp = timestamp || Date.now();
    this.message = message || DEFAULT_MESSAGE;
  }

  getFunctionUrl() {
    return this.functionName;
  }

  getPayload() {
    return {
      strategy: this.strategy,
      transactionID: this.transactionID,
      timestamp: this.timestamp,
      message: this.message,
      functionName: this.functionName
    };
  }
};

const assert = require('assert');

const GenericRequest = require('./GenericRequest');

const DEFAULT_MESSAGE = 'na';
const DEFAULT_STRATEGY = 'default';

module.exports = class InvokeFunctionRequest extends GenericRequest {
  constructor(deps) {
    super(deps);
    const { req } = deps;
    const {
      functionName, payload, strategy, transactionID
    } = req.body;
    assert(functionName, 'functionName is required');
    assert(transactionID, 'transactionID is required');
    const {
      timestamp, message
    } = payload;
    this.functionName = functionName;
    this.strategy = strategy || DEFAULT_STRATEGY;
    this.transactionID = transactionID;
    this.timestamp = timestamp || Date.now();
    this.message = message || DEFAULT_MESSAGE;
  }

  getFunctionUrl() {
    return this.functionName;
  }

  getStrategy() {
    return this.strategy;
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

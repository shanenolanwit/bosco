const assert = require('assert');

const GenericRequest = require('./GenericRequest');

const DEFAULT_INVOCATION_TYPE = 'RequestResponse'; // sync
const DEFAULT_LOG_TYPE = 'Tail';
const DEFAULT_MESSAGE = 'na';
const DEFAULT_STRATEGY = 'default';

module.exports = class ExecuteFunctionRequest extends GenericRequest {
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
    this.invocationType = DEFAULT_INVOCATION_TYPE;
    this.logType = DEFAULT_LOG_TYPE;
    this.strategy = strategy || DEFAULT_STRATEGY;
    this.transactionID = transactionID;
    this.timestamp = timestamp || Date.now();
    this.message = message || DEFAULT_MESSAGE;
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

  getStrategy() {
    return this.strategy;
  }

  getPayload() {
    return {
      strategy: this.strategy,
      transactionID: this.transactionID,
      timestamp: this.timestamp,
      message: this.message,
      functionName: this.functionName,
      invocationType: this.invocationType,
      logType: this.logType
    };
  }
};

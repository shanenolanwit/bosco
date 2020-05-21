const assert = require('assert');

const safeAccess = require('../../utils/safeAccess');

const NOT_SPECIFIED = 'not_specified';

module.exports = class GenericRequest {
  constructor({
    req, logger, env
  }) {
    assert(req, 'req is required');
    assert(logger, 'logger is required');
    this.logger = logger;
    const specifiedProvider = safeAccess(['body', 'provider'], req);
    const strategy = safeAccess(['body', 'strategy'], req);
    const transactionID = safeAccess(['body', 'transactionID'], req);
    this.provider = specifiedProvider || env.DEFAULT_PROVIDER;
    this.strategy = strategy || NOT_SPECIFIED;
    this.transactionID = transactionID || NOT_SPECIFIED;
  }

  getProvider() {
    return this.provider;
  }

  getStrategy() {
    return this.strategy;
  }

  getTransactionID() {
    return this.transactionID;
  }
};

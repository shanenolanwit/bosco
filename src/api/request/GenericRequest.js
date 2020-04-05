const assert = require('assert');

const safeAccess = require('../../utils/safeAccess');

module.exports = class GenericRequest {
  constructor({
    req, logger, env
  }) {
    assert(req, 'req is required');
    assert(logger, 'logger is required');
    this.logger = logger;
    const specifiedProvider = safeAccess(['body', 'provider'], req);
    this.provider = specifiedProvider || env.DEFAULT_PROVIDER;
  }

  getProvider() {
    return this.provider;
  }
};

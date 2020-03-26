const assert = require('assert');

const safeAccess = require('../../utils/safeAccess');

module.exports = class GenericRequest {
  constructor({
    req, logger, timer, env
  }) {
    assert(req, 'req is required');
    assert(logger, 'logger is required');
    assert(timer, 'timer is required');
    this.logger = logger;
    this.timer = timer;
    const specifiedProvider = safeAccess(['body', 'provider'], req);
    this.provider = specifiedProvider || env.DEFAULT_PROVIDER;
  }

  getTimer() {
    return this.timer;
  }

  getProvider() {
    return this.provider;
  }
};

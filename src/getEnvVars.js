const assert = require('assert');
const { version } = require('../package.json');

module.exports = () => {
  const logLevel = process.env.LOG_LEVEL || 'info';

  const env = {
    APP_VERSION: version,
    BOSCO_API_KEY: process.env.BOSCO_API_KEY,
    BOSCO_URL: process.env.BOSCO_URL,
    LOG_LEVEL: logLevel.toLowerCase(),
    DEFAULT_PROVIDER: process.env.DEFAULT_PROVIDER
  };

  Object.keys(env).forEach((key) => {
    assert.notStrictEqual(env[key], undefined, `ENV VAR ${key} is not set`);
  });

  return env;
};

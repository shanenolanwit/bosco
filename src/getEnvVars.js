const assert = require('assert');

module.exports = () => {
  const logLevel = process.env.LOG_LEVEL || 'info';

  const env = {
    APP_VERSION: process.env.npm_package_version || 'dev',
    BOSCO_API_KEY: process.env.BOSCO_API_KEY,
    LOG_LEVEL: logLevel.toLowerCase(),
    DEFAULT_PROVIDER: process.env.DEFAULT_PROVIDER
  };

  Object.keys(env).forEach((key) => {
    assert.notStrictEqual(env[key], undefined, `ENV VAR ${key} is not set`);
  });

  return env;
};

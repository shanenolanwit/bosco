const assert = require('assert');

module.exports = () => {
  const logLevel = process.env.LOG_LEVEL || 'info';

  const env = {
    APP_VERSION: process.env.npm_package_version || 'dev',
    BOSCO_API_KEY: process.env.BOSCO_API_KEY,
    LOG_LEVEL: logLevel.toLowerCase(),
    DEFAULT_PROVIDER: process.env.DEFAULT_PROVIDER,
    COSMOS_DATABASE: process.env.COSMOS_DATABASE,
    COSMOS_ENDPOINT: process.env.COSMOS_ENDPOINT,
    COSMOS_KEY: process.env.COSMOS_KEY,
    STORAGE_ACCOUNT_NAME: process.env.STORAGE_ACCOUNT_NAME,
    STORAGE_KEY: process.env.STORAGE_KEY,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY
  };

  Object.keys(env).forEach((key) => {
    assert.notStrictEqual(env[key], undefined, `ENV VAR ${key} is not set`);
  });

  return env;
};

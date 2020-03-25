const assert = require('assert');
const { version } = require('../package.json');

module.exports = () => {
  const env = {
    APP_VERSION: version,
    BOSCO_API_KEY: process.env.BOSCO_API_KEY,
    BOSCO_URL: process.env.BOSCO_URL,
    LOG_LEVEL: process.env.LOG_LEVEL || 'info'
  };

  Object.keys(env).forEach((key) => {
    assert.notStrictEqual(env[key], undefined, `ENV VAR ${key} is not set`);
  });

  return env;
};

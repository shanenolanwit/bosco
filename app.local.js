
require('dotenv').config();
const logger = require('loglevel');

const router = require('./src/router');
const createDependencies = require('./src/createDependencies');
const env = require('./src/getEnvVars')();

const deps = createDependencies(logger, env);
const app = router(deps);


app.listen(3000, () => logger.info('Listening on: 3000'));

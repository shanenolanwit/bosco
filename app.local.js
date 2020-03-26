
require('dotenv').config();
const logger = require('loglevel');

const DEFAULT_NODE_SERVER_PORT = 3000;

const router = require('./src/router');
const createDependencies = require('./src/createDependencies');
const env = require('./src/getEnvVars')();

const deps = createDependencies(logger, env);
const app = router(deps);

const port = process.env.NODE_SERVER_PORT || DEFAULT_NODE_SERVER_PORT;
app.listen(port, () => logger.info(`Bosco listening on port ${port}`));

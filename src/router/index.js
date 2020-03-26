const express = require('express');
const HealthRouter = require('./health');
const Switchboard = require('./switchboard');

module.exports = (deps) => {
  const app = express();
  app.disable('x-powered-by');
  app.use(express.json());

  app.use('/health', HealthRouter(deps));
  app.use('/bosco', Switchboard(deps));

  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.publicMessage || 'Internal Server Error';
    res.status(status).json({ Error: message });
  });

  app.all('*', (req, res) => res.status(404).json({}));

  return app;
};

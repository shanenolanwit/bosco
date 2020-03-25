const Express = require('express');

module.exports = (deps) => {
  const { logger } = deps;
  const router = Express.Router({ mergeParams: true });

  router.get('/', async (req, res) => {
    logger.debug('Handling health check');
    return res.status(200).send({ status: 'ok' });
  });

  return router;
};

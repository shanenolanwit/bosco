module.exports = (req, res, next) => {
  const allowedKey = process.env.BOSCO_API_KEY;
  if (allowedKey === req.headers.authorization) {
    next();
  } else {
    const e = new Error({ status: 401, publicMessage: 'Unauthorized' });
    next(e);
  }
};

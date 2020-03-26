module.exports = (req, res, next) => {
  const allowedKey = process.env.BOSCO_API_KEY;
  console.log(req.headers.authorization);
  console.log(allowedKey);
  if (allowedKey === req.headers.authorization) {
    next();
  } else {
    console.log('nah');
    const e = new Error({ status: 401, publicMessage: 'Unauthorized' });
    next(e);
  }
};

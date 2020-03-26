
// this will inject the Version into the header response of all routes that follow
module.exports = (req, res, next) => {
  const version = process.env.npm_package_version || 'dev';
  res.header('Version', version);
  next();
};

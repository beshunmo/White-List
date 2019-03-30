function authenticationMiddlewareApi() {
  return function (req, res, next) { // eslint-disable-line
    if (req.isAuthenticated()) {
      console.log('auth')
      return next();
    }
    res.status(401);
    res.send('401 UNAUTHORISED USER');
  };
}

module.exports = authenticationMiddlewareApi;

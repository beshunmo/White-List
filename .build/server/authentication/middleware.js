'use strict';

function authenticationMiddleware() {
  return function (req, res, next) {
    // eslint-disable-line
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/user/login');
  };
}

module.exports = authenticationMiddleware;
const { jwt: { secret }} = require('../environment');
const { decode } = require('jwt-simple');
const moment = require('moment');

exports.checkAuth = (req, res, next) => {
  try {
    if (!req.cookies.jwt) {
      throw new Error('access not allowed');
    }

    const token = req.cookies.jwt;

    const payload = decode(token, secret);

    if (payload?.exp <= moment.unix()) {
      throw new Error('token expired');
    }
    
    if (payload) {
      req.user = payload;
      return next();
    }
    
    throw new Error('decode token fail');
  }
  catch (e) {
    res.redirect('/users/signin');
  }
}

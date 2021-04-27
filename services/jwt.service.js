const { encode } = require('jwt-simple');
const { lang, parseTwoDigitYear } = require('moment');
const moment = require('moment');
const { jwt: { secret }} = require('../environment');


exports.createToken = ({ _id, username, email, avatar, follows }) => {

  //création d'une variable
  const payload = {
    sub: _id,
    username, email, avatar, follows,
    iat: moment().unix(),
    exp: moment().add(30, 'days').unix()
  };

  //création du token avec la variable
  return encode(payload, secret);
}
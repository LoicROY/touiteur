const { resolve } = require('path');

module.exports = {
  db: {
    protocol: 'mongodb+srv',
    host: 'clusterdiginamic.xctun.mongodb.net',
    options: 'retryWrites=true&w=majority',
    name: 'touiteur',
    user: 'touiteur',
    password: 'touiteur',
  },
  hashRounds: 11,
  ssl: {
    cert: resolve('ssl', 'loic.crt'),
    key: resolve('ssl', 'loic.key'),
  },
  jwt: {
    secret: '123456789',
  },
  ports: {
    http: 8080,
    https: 4443,
  }
};

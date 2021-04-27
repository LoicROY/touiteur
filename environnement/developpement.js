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
  ssl: {
    cert: resolve('ssl', 'loic.crt'),
    key: resolve('ssl', 'loic.key'),
  },
  ports: {
    http: 8080,
    https: 4443,
  }
};

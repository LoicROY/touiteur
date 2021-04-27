const { resolve } = require('path');

module.exports = {
  db: {
    protocol: 'DB_PROTOCOL',
    host: 'DB_HOST',
    options: 'DB_OPTIONS',
    name: 'DB_NAME',
    user: 'DB_USER',
    password: 'DB_PASSWORD',
  },
  ssl: {
    cert: resolve('ssl', 'CERT_FILE'),
    key: resolve('ssl', 'KEY_FILE'),
  },
  ports: {
    http: HTTP_PORT,
    https: HTTPS_PORT,
  }
};

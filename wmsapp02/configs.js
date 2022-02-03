/////////////////////
//config.js
////////////////////

const env = process.env;

const dbsettigs = {
  db: {
    user: env.DB_USER || 'wmsapp02',
    host: env.DB_HOST || 'localhost',
    database: env.DB_NAME || 'wmsappdb',
    password: env.DB_PASSWORD || 'myw23pw',
    port: env.DB_PORT || 5432,
  },
  wmsmail: {
    email: env.WMSMAIL_EMAIL || 'info@yourwmsemail.app',
    user: env.WMSMAIL_USER || '*********',
    pwd: env.WMSMAIL_TOKEN || '**********',
    host: env.WMSMAIL_HOST || 'mail.yourhost',
    port: env.WMSMAIL_PORT || 587,
  },
  dblist: env.LIST_PER_PAGE || 10,
};

module.exports = dbsettigs;

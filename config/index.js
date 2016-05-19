const config = require('./config.json');
const env = process.env.NODE_ENV;

module.exports = config[env];

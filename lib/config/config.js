var settings = require('./settings.json');
var node_env = process.env.NODE_ENV || 'development';
var settings = settings[node_env];

module.exports = {
  port: process.env.PORT || 3000,
  db: settings.database_connection
};
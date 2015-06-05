var settingsJson = require('./settings.json');
var node_env = process.env.NODE_ENV || 'development';
var settings = settingsJson[node_env];

module.exports = {
  port: process.env.PORT || 3000,
  db: settings.database_connection
};
var settingsJson = require('./settings.json');
var node_env = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 3000;
var settings = settingsJson[node_env];
var smtpUser = process.env.SMTP_USER || 'noreply@mail.nodechat.com';
var smtpPassword = process.env.SMTP_PASSWORD || 'noreply';

module.exports = {
  baseUrl: settings.base_url,
  db: settings.database_connection,
  env: node_env,
  port: port,
  secretAuthKey: settings.secret_auth_key,
  smtpPassword: smtpPassword,
  smtpService: settings.smtp_service,
  smtpUser: smtpUser
};
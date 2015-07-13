var settingsJson = require('./settings.json');
var node_env = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 3000;
var settings = settingsJson[node_env];
var smtpService = process.env.SMTP_SERVICE || settings.smtp_service;
var smtpUser = process.env.SMTP_USER || settings.smtp_user;
var smtpPassword = process.env.SMTP_PASSWORD || settings.smtp_password;
var smtpApiKey = process.env.SMTP_API_KEY || settings.smtp_api_key;
var databaseConnection = process.env.DATABASE_CONNECTION || settings.database_connection;
var secretAuthKey = process.env.SECRET_AUTH_KEY || settings.secret_auth_key;
var loggerAccessToken = process.env.LOGGER_ACCESS_TOKEN || settings.logger_access_token;

module.exports = {
  baseUrl: settings.base_url,
  db: databaseConnection,
  env: node_env,
  loggerAccessToken: loggerAccessToken,
  port: port,
  secretAuthKey: secretAuthKey,
  smtpApiKey: smtpApiKey,
  smtpPassword: smtpPassword,
  smtpService: settings.smtp_service,
  smtpUser: smtpUser,
  defaultFromEmailAddress: settings.default_from_email_address
};
const { createLogger, format, transports } = require('winston');

const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`),
);

const logger = createLogger({
  level: 'info',
  format: logFormat,
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'logs/app.log' }),
  ],
});

module.exports = logger;
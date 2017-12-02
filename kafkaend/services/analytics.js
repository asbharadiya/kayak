var winston = require('winston');
const filename = 'logger/analyticsLogger.log';
var loggerFile = require('../logger/logger.js');
var logger = loggerFile.getLogger();

function trackClick(msg, callback) {
  logger.log({
    level: 'info',
    message: msg
  });
}

exports.trackClick = trackClick;

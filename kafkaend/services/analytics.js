var winston = require('winston');
const filename = 'logger/analyticsLogger.log';
var loggerFile = require('../logger/logger.js');
var logger = loggerFile.getLogger();

function trackClick(msg, callback) {
  var res = {};
  logger.log({
    level: 'info',
    message: msg
  });
  res.code = 200  ;
  res.message = "Success";
  callback(null , res);
}

exports.trackClick = trackClick;

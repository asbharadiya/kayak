var winston = require('winston');
const filename = 'logger/analyticsLogger.log';
var loggerFile = require('../logger/logger.js');
var logger = loggerFile.getLogger();
var analyze = require('../logger/loggerAnalyzer.js');
var cron = require('node-cron');

// var task = cron.schedule('* * * * *', function() {
//   console.log('will execute every minute until stopped');
// });
//
// console.log('here');

function trackClick(msg, callback) {
  var res = {};
  msg.type = 'clicksPerPage'
  logger.log({
    level: 'info',
    message: msg
  });
  res.code = 200  ;
  res.message = "Success";
  analyze.run(function() {
    callback(null , res);
  });
}

exports.trackClick = trackClick;

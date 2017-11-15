var mysql = require('mysql');
var config = require('config');

function getConnection() {
	var con = mysql.createConnection({
  		host: config.mySqlHost,
  		user: config.mySqlUsername,
  		password: config.mySqlPassword,
  		database: config.mySqlDb
	});
	return con;
}

exports.getConnection = getConnection;

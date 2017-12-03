var kafka = require('./kafka/client');

var config = require('config');
var topic_name = config.kafkaTopic;

function trackClick(req,res){
	if(req.user) {
		req.body.user = req.user;
	} else {
		req.body.user = 'anonymous';
	}
	getFormattedDate(function(dateTime) {
		req.body.time = dateTime;
		kafka.make_request(topic_name,'trackClick', req.body ,function(err,result){
					if(err) {
							return res.status(500).json({status:500,statusText:"Internal server error"});
					} else {
							return res.status(result.code).json({status:result.code,statusText:result.message});
					}
			});
	})
}

function getFormattedDate(callback) {
    var date = new Date();
    var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    callback(str);
}


exports.trackClick = trackClick;

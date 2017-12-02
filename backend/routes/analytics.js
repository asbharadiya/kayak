var kafka = require('./kafka/client');

var config = require('config');
var topic_name = config.kafkaTopic;

function trackClick(req,res){
	if(req.user) {
		req.body.user = req.user;
	} else {
		req.body.user = 'anonymous';
	}
	kafka.make_request(topic_name,'trackClick', req.body ,function(err,result){
        if(err) {
            return res.status(500).json({status:500,statusText:"Internal server error"});
        } else {
            return res.status(result.code).json({status:result.code,statusText:result.message,data:result.data});
        }
    });
}


exports.trackClick = trackClick;

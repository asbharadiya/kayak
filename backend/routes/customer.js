var kafka = require('./kafka/client');

var config = require('config');
var topic_name = config.kafkaTopic;

function getCustomers(req,res){
	kafka.make_request(topic_name,'getCustomers',{
		
	},function(err,result){
        if(err) {
            return res.status(500).json({status:500,statusText:"Internal server error"});
        } else {
            return res.status(result.code).json({status:result.code,statusText:result.message});
        }
    });

function getCustomerById(req,res){
	kafka.make_request(topic_name,'getCustomerById',{
		
	},function(err,result){
        if(err) {
            return res.status(500).json({status:500,statusText:"Internal server error"});
        } else {
            return res.status(result.code).json({status:result.code,statusText:result.message});
        }
    });
}

function updateCustomerById(req,res){
	kafka.make_request(topic_name,'updateCustomerById',{
		
	},function(err,result){
        if(err) {
            return res.status(500).json({status:500,statusText:"Internal server error"});
        } else {
            return res.status(result.code).json({status:result.code,statusText:result.message});
        }
    });
}

exports.getCustomers = getCustomers;
exports.getCustomerById = getCustomerById;
exports.updateCustomerById = updateCustomerById;
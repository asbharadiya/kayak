var kafka = require('./kafka/client');

var s3 = require('./s3')

var config = require('config');
var topic_name = config.kafkaTopic;

function getRevenueByType(req,res){
    kafka.make_request(topic_name,'getRevenueByType',{

    },function(err,result){
        if(err) {
            return res.status(500).json({status:500,statusText:"Internal server error"});
        } else {
            return res.status(result.code).json({status:result.code,statusText:result.message,data:result.data});
        }
    });
}

function getRevenueByTopCmpny(req,res){
    kafka.make_request(topic_name,'getRevenueByTopCmpny',{

    },function(err,result){
        if(err) {
            return res.status(500).json({status:500,statusText:"Internal server error"});
        } else {
            return res.status(result.code).json({status:result.code,statusText:result.message,data:result.data});
        }
    });
}

function getRevenueByCity(req,res){
    kafka.make_request(topic_name,'getRevenueByCity',{

    },function(err,result){
        if(err) {
            return res.status(500).json({status:500,statusText:"Internal server error"});
        } else {
            return res.status(result.code).json({status:result.code,statusText:result.message,data:result.data});
        }
    });
}

exports.getRevenueByType = getRevenueByType;
exports.getRevenueByCity = getRevenueByCity;
exports.getRevenueByTopCmpny = getRevenueByTopCmpny;

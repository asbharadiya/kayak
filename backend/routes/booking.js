var kafka = require('./kafka/client');

var config = require('config');
var topic_name = config.kafkaTopic;

function getBills(req,res){
	kafka.make_request(topic_name,'getBills',{
		
	},function(err,result){
        if(err) {
            return res.status(500).json({status:500,statusText:"Internal server error"});
        } else {
            return res.status(result.code).json({status:result.code,statusText:result.message});
        }
    });
}

function getBillById(req,res){
	kafka.make_request(topic_name,'getBillById',{
		
	},function(err,result){
        if(err) {
            return res.status(500).json({status:500,statusText:"Internal server error"});
        } else {
            return res.status(result.code).json({status:result.code,statusText:result.message});
        }
    });
}

function makeBooking(req,res){
	kafka.make_request(topic_name,'makeBooking',{
	    userId:req.session.passport.user._id,
        data:req.body
    },function(err,result){
        if(err) {
            return res.status(500).json({status:500,statusText:"Internal server error"});
        } else {
            return res.status(result.code).json({status:result.code,statusText:result.message});
        }
    });
}

function getBookings(req,res){

    console.log("Called ") ; 
	kafka.make_request(topic_name,'getBookings',{
		userId:req.session.passport.user._id
	},function(err,result){
        if(err) {
            return res.status(500).json({status:500,statusText:"Internal server error"});
        } else {
            return res.status(result.code).json({status:result.code,statusText:result.message,data:result.data});
        }
    });
}

function getBookingById(req,res){
	kafka.make_request(topic_name,'getBookingById',{
		
	},function(err,result){
        if(err) {
            return res.status(500).json({status:500,statusText:"Internal server error"});
        } else {
            return res.status(result.code).json({status:result.code,statusText:result.message});
        }
    });
}

exports.getBills = getBills;
exports.getBillById = getBillById;
exports.makeBooking = makeBooking;
exports.getBookings = getBookings;
exports.getBookingById = getBookingById;
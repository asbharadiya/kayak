var kafka = require('./kafka/client');

var config = require('config');
var topic_name = config.kafkaTopic;

function addHotel(req,res){
    console.log("Server called " , req.body)
	kafka.make_request(topic_name,'addHotel',req.body,function(err,result){
        if(err) {
            return res.status(500).json({status:500,statusText:"Internal server error"});
        } else {
            console.log("Result " , result)
            return res.status(result.code).json({status:result.code,statusText:result.message,data:result.data});
        }		
	});
}

function getHotels(req,res){
	kafka.make_request(topic_name,'getHotels',{},function(err,result){
		if(err) {
            return res.status(500).json({status:500,statusText:"Internal server error"});
        } else {
            return res.status(result.code).json({status:result.code,statusText:result.message,data:result.data});
        }
    });
}

function getHotelById(req,res){
	kafka.make_request(topic_name,'getHotelById',{ id : req.params.id }, function(err,result){
        console.log("result.data " , result.data)
        if(err) {
            return res.status(500).json({status:500,statusText:"Internal server error"});
        } else {
            return res.status(result.code).json({status:result.code,statusText:result.message,data:result.data});
        }
    });
}

function updateHotelById(req,res){
	req.body.idToUpdate = req.params.id;
	kafka.make_request(topic_name,'updateHotelById',req.body,function(err,result){
        if(err) {
            return res.status(500).json({status:500,statusText:"Internal server error"});
        } else {
            return res.status(result.code).json({status:result.code,statusText:result.message,data:result.data});
        }
    });
}

function deleteHotelById(req,res){
    console.log("To Delete is " , req.params.id) ;
    var idToDelete = req.params.id ; 
	kafka.make_request(topic_name,'deleteHotelById',{ idToDelete : idToDelete },function(err,result){
        if(err) {
            return res.status(500).json({status:500,statusText:"Internal server error"});
        } else {
           console.log(result) ; 
           return res.status(result.code).json({status:result.code,statusText:result.message, data:result.data});
        }
    });
}

function getHotelsForCustomer(req,res){
	kafka.make_request(topic_name,'getHotelsForCustomer',{
	},function(err,result){
        if(err) {
            return res.status(500).json({status:500,statusText:"Internal server error"});
        } else {
            return res.status(result.code).json({status:result.code,statusText:result.message});
        }
    });
}

exports.addHotel = addHotel;
exports.getHotels = getHotels;
exports.getHotelById = getHotelById;
exports.updateHotelById = updateHotelById;
exports.deleteHotelById = deleteHotelById;
exports.getHotelsForCustomer = getHotelsForCustomer;
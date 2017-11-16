var kafka = require('./kafka/client');

var config = require('config');
var topic_name = config.kafkaTopic;

function addCar(req,res){
    console.log("Server called " , req.body)
	kafka.make_request(topic_name,'addCar',req.body,function(err,result){
        if(err) {
            return res.status(500).json({status:500,statusText:"Internal server error"});
        } else {
            console.log("Result " , result)
            return res.status(result.code).json({status:result.code,statusText:result.message,data:result.data});
        }
    });
}

function getCars(req,res){
	kafka.make_request(topic_name,'getCars',{
		
	},function(err,result){
        if(err) {
            return res.status(500).json({status:500,statusText:"Internal server error"});
        } else {
            return res.status(result.code).json({status:result.code,statusText:result.message,data:result.data});
        }
    });
}

function getCarById(req,res){
	kafka.make_request(topic_name,'getCarById',{
		
	},function(err,result){
        if(err) {
            return res.status(500).json({status:500,statusText:"Internal server error"});
        } else {
            return res.status(result.code).json({status:result.code,statusText:result.message});
        }
    });
}

function updateCarById(req,res){
	kafka.make_request(topic_name,'updateCarById',{
		
	},function(err,result){
        if(err) {
            return res.status(500).json({status:500,statusText:"Internal server error"});
        } else {
            return res.status(result.code).json({status:result.code,statusText:result.message});
        }
    });
}

function deleteCarById(req,res){
    console.log("To Delete is " , req.params.id) ;
    var idToDelete = req.params.id ; 
	kafka.make_request(topic_name,'deleteCarById',{
		idToDelete : idToDelete 
	},function(err,result){
        if(err) {
            return res.status(500).json({status:500,statusText:"Internal server error"});
        } else {
           console.log(result) ; 
           return res.status(result.code).json({status:result.code,statusText:result.message, data:result.data});
        }
    });
}

function getCarsForCustomer(req,res){
	kafka.make_request(topic_name,'getCarsForCustomer',{
		
	},function(err,result){
        if(err) {
            return res.status(500).json({status:500,statusText:"Internal server error"});
        } else {
            return res.status(result.code).json({status:result.code,statusText:result.message});
        }
    });
}

exports.addCar = addCar;
exports.getCars = getCars;
exports.getCarById = getCarById;
exports.updateCarById = updateCarById;
exports.deleteCarById = deleteCarById;
exports.getCarsForCustomer = getCarsForCustomer;
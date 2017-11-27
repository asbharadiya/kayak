var kafka = require('./kafka/client');

var config = require('config');
var topic_name = config.kafkaTopic;
var s3 = require('./s3')



function addFlight(req,res){
	
    var obj =  { flightNumber: req.body.flightNumber,
                airline: req.body.airline ,
                source:  req.body.source ,
                destination: req.body.destination ,
                arrival: req.body.arrival ,
                departure: req.body.departure ,
                serviceStartDate: req.body.serviceStartDate , 
                serviceEndDate: req.body.serviceEndDate , 
                firstClassPrice: req.body.firstClassPrice , 
                firstClassSeats: req.body.firstClassSeats ,
                economyClassPrice: req.body.economyClassPrice,
                economyClassSeats: req.body.economyClassSeats,
                businessClassPrice: req.body.businessClassPrice,
                businessClassSeats: req.body.businessClassSeats 
    }



   
   s3.upload(req.files, function(err, result){

        console.log("Erorr or result " , err , result ) ; 
        if(err) {
            console.log(err) ; 
            return res.status(500).json({status: 500, statusText: "Failed to upload images to S3 storage"});
        } else {
            obj.images = result;

            console.log(obj) ; 
           kafka.make_request(topic_name,'addFlight',obj,function(err,result){
                if(err) {
                    return res.status(500).json({status:500,statusText:"Internal server error"});
                } else {
                console.log("Result " , result)
                    return res.status(result.code).json({status:result.code,statusText:result.message});
                }
            });
        }
    });



	/*kafka.make_request(topic_name,'addFlight',req.body,function(err,result){
        if(err) {
            return res.status(500).json({status:500,statusText:"Internal server error"});
        } else {
		console.log("Result " , result)
            return res.status(result.code).json({status:result.code,statusText:result.message});
        }
    });*/
}

function getFlights(req,res){
	kafka.make_request(topic_name,'getFlights',{
		
	},function(err,result){
        if(err) {
            return res.status(500).json({status:500,statusText:"Internal server error"});
        } else {
            return res.status(result.code).json({status:result.code,statusText:result.message,data:result.data});
        }
    });
}

function getFlightById(req,res){
	var id =  req.params.id
	kafka.make_request(topic_name,'getFlightById',{
		id
	},function(err,result){
		console.log("result.data " , result.data)
        if(err) {
            return res.status(500).json({status:500,statusText:"Internal server error"});
        } else {
        	return res.status(result.code).json({status:result.code,statusText:result.message,data:result.data});
        }
    });
}

function updateFlightById(req,res){
    
    
    var obj = req.body ; 

    
    if(req.files == null){
        kafka.make_request(topic_name,'updateFlightById',obj, function(err,result){
                    if(err) {
                        return res.status(500).json({status:500,statusText:"Internal server error"});
                    } else {
                        return res.status(result.code).json({status:result.code,statusText:result.message});
                    }
                });
    }else{

         s3.upload(req.files, function(err, result){
            if(err) {
                return res.status(500).json({status: 500, statusText: "Failed to upload images to S3 storage"});
            } else {
                obj.images = result;


                kafka.make_request(topic_name,'updateFlightById',obj, function(err,result){
                    if(err) {
                        return res.status(500).json({status:500,statusText:"Internal server error"});
                    } else {
                        return res.status(500).json({status:result.code,statusText:result.message});
                    }
                });
            }
        });
    }

	/*kafka.make_request(topic_name,'updateFlightById',req.body,function(err,result){
        if(err) {
            return res.status(500).json({status:500,statusText:"Internal server error"});
        } else {
            return res.status(result.code).json({status:result.code,statusText:result.message,data:result.data});
        }
    });*/
}
function deleteFlightById(req,res){
    console.log("To Delete is " , req.params.id) ;
    var idToDelete = req.params.id ; 
	kafka.make_request(topic_name,'deleteFlightById',{
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
function getFlightsForCustomer(req,res){
	kafka.make_request(topic_name,'getFlightsForCustomer',{
		
	},function(err,result){
        if(err) {
            return res.status(500).json({status:500,statusText:"Internal server error"});
        } else {
            return res.status(result.code).json({status:result.code,statusText:result.message,data:result.data});
        }
    });
    
}

exports.addFlight = addFlight;
exports.getFlights = getFlights;
exports.getFlightById = getFlightById;
exports.updateFlightById = updateFlightById;
exports.deleteFlightById = deleteFlightById;
exports.getFlightsForCustomer = getFlightsForCustomer;
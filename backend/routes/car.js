var kafka = require('./kafka/client');

var config = require('config');
var topic_name = config.kafkaTopic;



var CHUNK_SIZE = 1024 * 50 ;

function SplitFileIntoArray(fileString){
    var parts = [];
    while(fileString !== ''){
        if(fileString.length > CHUNK_SIZE){
            parts.push(fileString.slice(0, CHUNK_SIZE));
            fileString = fileString.slice(CHUNK_SIZE);
        } else {
            parts.push(fileString);
            break;
        }
    }
    return parts;
}



function addCar(req,res){
    

     var obj = {
      carQuantity : req.body.carQuantity , 
      carType : req.body.carType    ,   
      carName : req.body.carName    , 
      occupancy :  req.body.occupancy    , 
      luggage :  req.body.luggage    ,
      dailyRentalValue :  req.body.dailyRentalValue   ,
      serviceStartDate :  req.body.serviceStartDate    , 
      serviceEndDate :  req.body.serviceEndDate  ,
       filename : req.files.file.name,  
     } 

      
    

    var file = req.files.file ;


    var fileBuffer = new Buffer(file.data).toString('base64') ;
    var chunks = SplitFileIntoArray(fileBuffer) ;
    
    kafka.make_chunked_request(topic_name,'addCar',obj , chunks ,function(err,result){
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
    var id =  req.params.id
	kafka.make_request(topic_name,'getCarById',{
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

function updateCarById(req,res){
    console.log("To Update is " , req.params.id) ;
    console.log("Server called " , req.body)
    
	kafka.make_request(topic_name,'updateCarById',req.body,function(err,result){
        if(err) {
            return res.status(500).json({status:500,statusText:"Internal server error"});
        } else {
            return res.status(result.code).json({status:result.code,statusText:result.message,data:result.data});
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
            return res.status(result.code).json({status:result.code,statusText:result.message,data:result.data});
        }
    });
}

exports.addCar = addCar;
exports.getCars = getCars;
exports.getCarById = getCarById;
exports.updateCarById = updateCarById;
exports.deleteCarById = deleteCarById;
exports.getCarsForCustomer = getCarsForCustomer;
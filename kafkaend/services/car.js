var mongo = require('./mongo');



function addCar(msg, callback){
    var res = {};
    
    console.log("in Kafka ", msg)

    
        mongo.getCollection('cars' , function(err , collection){



            collection.find({carId : msg.carId}).toArray(function(err , result){
                if(err){
                 console.log(err);
                }else{
                    if(result[0]){
                        res.code = 400 ; 
                        res.message = 'Use Different Car ID, the one you provided is already present'
                        callback(null , res) ; 
                    }else{
                        collection.insertOne(msg , function(err , response){
                            
                            if(err){
                                console.log(err);
                                res.code = 500 ; 
                                res.status  = 500 ; 
                                res.message = "Error occured while registering a car with server"
                                callback(null , res) ; 
                               
                            }else{


                                collection.find().toArray(function(err, result){
                                        
                                         if(err){
                                                res.code = 500  ; 
                                                res.status  = 500 ; 
                                                res.message = "Car Registered but error occured while fetching all car's data"
                                                callback(null , res) ; 
                                         }else{
                                                res.code = 200  ; 
                                                res.status  = 200 ; 
                                                res.message = "Success"
                                                res.data = result
                                                callback(null , res) ; 
                                         }
                                })    
        
                            }
                        })
                    }
                 }
            })
        })
}

function getCars(msg, callback){
    var res = {};
    res.code = 200;
    res.message = "Success";
    callback(null, res);
}

function getCarById(msg, callback){
    var res = {};
    res.code = 200;
    res.message = "Success";
    callback(null, res);
}

function updateCarById(msg, callback){
    var res = {};
    res.code = 200;
    res.message = "Success";
    callback(null, res);
}

function deleteCarById(msg, callback){
    var res = {};
    res.code = 200;
    res.message = "Success";
    callback(null, res);
}

function getCarsForCustomer(msg, callback){
    var res = {};
    res.code = 200;
    res.message = "Success";
    callback(null, res);
}

exports.addCar = addCar;
exports.getCars = getCars;
exports.getCarById = getCarById;
exports.updateCarById = updateCarById;
exports.deleteCarById = deleteCarById;
exports.getCarsForCustomer = getCarsForCustomer;
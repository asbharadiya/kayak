var mongo = require('./mongo');
var validator = require('validator');
var ObjectID = require('mongodb').ObjectID


function addCar(msg, callback){
	var res = {};
	
	
	

	   if(validator.isNumeric( msg.carQuantity) && validator.isNumeric( msg.dailyRentalValue) && validator.isNumeric( msg.occupancy) 
		){
			
			msg.createdDate = new Date();
			msg.updatedDate = new Date() ; 
			msg.carQuantity = parseInt(msg.carQuantity) ; 
			msg.dailyRentalValue = parseInt(msg.dailyRentalValue) ; 
			msg.occupancy = parseInt(msg.occupancy) ;
			msg.is_deleted = false ; 

			var serviceDays = (new Date(msg.serviceEndDate)- new Date(msg.serviceStartDate))/(1000*60*60*24) ; 

			var availabilityDateObject = [] ; 
			for(var i=0 ; i <= serviceDays ; i++){
				var date = new Date(msg.serviceStartDate) ;
				date.setDate(date.getDate() + i);
				availabilityDateObject.push({availabilityDate : date , availableCars : msg.carQuantity})
			}

			
			msg.availability = availabilityDateObject ;
			delete msg.serviceEndDate;
			delete msg.serviceStartDate;
			console.log(msg )  ; 

			mongo.getCollection('cars' , function(err , collection){

					collection.insertOne(msg , function(err , response){
							
							if(err){
								console.log(err);
								res.code = 500 ; 
								res.status  = 500 ; 
								res.message = "Error occured while registering a car with server"
								callback(null , res) ; 
							   
							}else{	


								collection.find({is_deleted : false}).toArray(function(err, result){
										
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
		})

	   }else{
			res.code = 400;
			res.status  = 400 ; 
			res.data = []
			res.message = "Please pass the correct Parameteres";
			callback(null, res);
	   }

		
}

function getCars(msg, callback){
	var res = {};

	mongo.getCollection('cars' , function(err , collection){
		collection.find({is_deleted : false} , {_id : 1 , carName : 1  , carQuantity : 1  , carType : 1  , dailyRentalValue : 1 }).toArray(function(err, result){
			if(err){
				res.code = 500  ; 
				res.status  = 500 ; 
				res.message = "Fail to get all cars from the server"
				callback(null , res) ; 
			}else{
				res.code = 200  ; 
				res.status  = 200 ; 
				res.message = "Success"
				res.data = result
				callback(null , res) ; 
			}
		})   
	})
}

function getCarById(msg, callback){
	var res = {};
	console.log(msg);
	idToGet = new ObjectID(msg.id) ;

	mongo.getCollection('cars' , function(err , collection){
		collection.find({is_deleted : false , _id : idToGet}).toArray(function(err, result){
					
					if(err){
						res.code = 500  ; 
						res.status  = 500 ; 
						res.message = "Fail to get all cars from the server"
						callback(null , res) ; 
					}else{

						var startDate =  result[0].availability[0].availabilityDate ;
						startDate.setDate(startDate.getDate() + 1);
						var endDate =  result[0].availability[result[0].availability.length-1].availabilityDate;
						endDate.setDate(endDate.getDate() + 1);

						var mmS = startDate.getMonth().toString().length > 1 ? startDate.getMonth() : '0' + startDate.getMonth().toString();
						var ddS  = startDate.getDate().toString().length > 1 ? startDate.getDate() : '0' + startDate.getDate().toString() ; 
						
						var mmE = endDate.getMonth().toString().length > 1 ? endDate.getMonth() : '0' + endDate.getMonth().toString();
						var ddE  = endDate.getDate().toString().length > 1 ? endDate.getDate() : '0' + endDate.getDate().toString() ; 
						
						startDate = startDate.getFullYear() +  "-" + mmS + "-" + ddS 
						endDate = endDate.getFullYear() +  "-" + mmE + "-" + ddE 

						delete result[0].availability;
						result[0].serviceStartDate = startDate ;
						result[0].serviceEndDate = endDate ; 



						res.code = 200  ; 
						res.status  = 200 ; 
						res.message = "Success"
						res.data = result
						callback(null , res) ; 
					}
				}) 


	})
}



function updateCarById(msg, callback){
	var res = {};
	idToUpdate = new ObjectID(msg._id) ;
	msg._id = idToUpdate ; 
	msg.updatedDate = new Date() ; 
	
	var serviceDays = (new Date(msg.serviceEndDate)- new Date(msg.serviceStartDate))/(1000*60*60*24) ; 

	var availabilityDateObject = [] ; 
	for(var i=0 ; i <= serviceDays ; i++){
		var date = new Date(msg.serviceStartDate) ;
		date.setDate(date.getDate() + i);
		availabilityDateObject.push({availabilityDate : date , availableCars : msg.carQuantity})
	}


	msg.availability = availabilityDateObject ;
	delete msg.serviceEndDate;
	delete msg.serviceStartDate;



	
	mongo.getCollection('cars' , function(err , collection){
		collection.update({is_deleted : false , _id : idToUpdate }  ,
			msg , function(err , response){
				if(err){
					res.code = 500;
					res.message = "Error occured while Updating the Car";
					callback(null, res);
				}else{

					collection.find({is_deleted : false}).toArray(function(err, result){
						if(err){
							res.code = 500  ; 
							res.status  = 500 ; 
							res.message = "Fail to get all cars from the server"
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
	})

	

}

function deleteCarById(msg, callback){
	var res = {};
	console.log("Delete called ") ; 

	mongo.getCollection('cars' , function(err , collection){
		idToDelete = new ObjectID(msg.idToDelete) ;
		collection.find({  is_deleted : false , _id : idToDelete}).toArray(function(err , result){
			if(err){
				res.code = 500;
				res.message = "Internal Server Error";
				callback(null, res);
			}else{
				if(result[0]){
					
					result[0].is_deleted  = true ; 
					result[0].deletedDate = new Date();
					collection.update({is_deleted : false , _id : idToDelete }  ,
                                    result[0] , function(err , response){
                                    	if(err){
											res.code = 500;
											res.message = "Error occured while deleted the Car";
											callback(null, res);
										}else{

											collection.find({is_deleted : false}).toArray(function(err, result){
												if(err){
													res.code = 500  ; 
													res.status  = 500 ; 
													res.message = "Fail to get all cars from the server"
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
var mongo = require('./mongo');
var validator = require('validator');
var ObjectID = require('mongodb').ObjectID;
var hotelModel = require('../models/hotel.js');
const moment = require('moment');

function addHotel(msg, callback){
	var res = {};
	if(true){
		msg.is_deleted = false;
		var now = msg.serviceStartDate;
		msg.availability = [];
		var availabilityObj = {};



		var serviceDays = (new Date(msg.serviceEndDate)- new Date(msg.serviceStartDate))/(1000*60*60*24) ;
		var availabilityDateObject = [] ;
		for (var i=0 ; i <= serviceDays ; i++) {
			
			var date = new Date(new Date(msg.serviceStartDate).setUTCHours(0,0,0,0));
			date.setDate(date.getDate() + i);
			
			availabilityDateObject.push({availableDate : date , hotelRooms : msg.hotelRooms});
		}

		msg.availability = availabilityDateObject ; 
		console.log(msg) ; 




		var newHotel = new hotelModel(msg);
		newHotel.save(function (err) {
			if(err) {
				console.log(err);
				res.code = 500 ;
				res.status  = 500 ;
				res.message = "Error occured while registering a hotel with server"
				callback(null , res);
			} else {
				res.code = 200  ;
				res.status  = 200 ;
				res.message = "Success";
				callback(null , res) ;
			}
		});
	}else{
		res.code = 400;
		res.status  = 400 ;
		res.data = []
		res.message = "Please pass the correct Parameteres";
		callback(null, res);
	}
}

function getHotels(msg, callback){
	var res = {};
	hotelModel.find({ is_deleted : false}, function(err, result){
		if(err){
			res.code = 500  ;
			res.status  = 500 ;
			res.message = "Fail to get all hotels from the server"
			callback(null , res) ;
		}else{
			res.code = 200  ;
			res.status  = 200 ;
			res.message = "Success"
			res.data = result;
			callback(null , res) ;
		}
	});
}

function getHotelById(msg, callback){
	var res = {};
	var idToGet = new ObjectID(msg.id) ;
	if(!validator.isEmpty(msg.id)){
		hotelModel.findOne({ is_deleted : false , _id : idToGet }, function(err, result){
			if(err){
				res.code = 500 ;
				res.status  = 500;
				res.message = "Fail to get hotel from the server";
				callback(null , res);
			}else{
				res.code = 200 ;
				res.status  = 200;
				res.message = "Success";
				res.data = result;
				callback(null , res);
			}
		});
	}else{
		res.code = 400;
		res.status  = 400 ;
		res.data = []
		res.message = "Please pass the correct Parameteres";
		callback(null, res);
	}
}

function updateHotelById(msg, callback){
	var res = {};
	var idToUpdate = new ObjectID(msg.idToUpdate) ;
	msg.is_deleted = false;
	var now = msg.serviceStartDate;
	msg.availability = [];
	var availabilityObj = {};
	for (var d = new Date(msg.serviceStartDate); d <= new Date(msg.serviceEndDate); d.setDate(d.getDate() + 1)) {
		availabilityObj.availableDate = new Date(d);
		availabilityObj.hotelRooms = msg.hotelRooms;
		msg.availability.push(availabilityObj);
	}
	if(true){
		hotelModel.update({is_deleted : false , _id : idToUpdate }, msg, { multi: false }, function(err , response){
			if(err){
				console.log(err);
				res.code = 500 ;
				res.status  = 500 ;
				res.message = "Error occured while updating a hotel"
				callback(null , res);
			} else {
				res.code = 200  ;
				res.status  = 200 ;
				res.message = "Hotel successfully updated";
				callback(null , res) ;
			}
		})
	}else{
		res.code = 400;
		res.status  = 400 ;
		res.data = []
		res.message = "Please pass the correct Parameteres";
		callback(null, res);
	}
}

function deleteHotelById(msg, callback){
	var res = {};
	var idToDelete = new ObjectID(msg.idToDelete) ;
	if(!validator.isEmpty(msg.idToDelete)){
		hotelModel.update({is_deleted : false , _id : idToDelete }, { $set: {is_deleted: true }}, { multi: false }, function(err , response){
			if(err){
				console.log(err);
				res.code = 500 ;
				res.status  = 500 ;
				res.message = "Error occured while deleting a hotel"
				callback(null , res);
			}else{
				res.code = 200  ;
				res.status  = 200 ;
				res.message = "Hotel successfully deleted";
				callback(null , res) ;
			}
		})
	}else{
		res.code = 400;
		res.status  = 400 ;
		res.data = []
		res.message = "Please pass the correct Parameteres";
		callback(null, res);
	}
}

function getHotelsForCustomer(msg, callback){
	var date = moment(msg.queryParams.checkInDate, 'MM-DD-YYYY');
	var date2 = moment(msg.queryParams.checkOutDate, 'MM-DD-YYYY');
	var daysCount = date2.diff(date,'days');
	console.log(daysCount);
	var res = {};
	var query = {
		hotelCity: msg.queryParams.city,
		hotelStar: {"$lte": msg.queryParams.rating || 5},
		hotelRating : {"$lte": msg.queryParams.reviewScoreMax || 5, "$gte": msg.queryParams.reviewScoreMin || 0},
		is_deleted : false,
		availability: {
			$elemMatch: {
				availableDate: {
					$gte: msg.queryParams.checkInDate,
					$lte: msg.queryParams.checkOutDate
				}
			}
		},
		availability:  {$exists:true},
		$where: 'this.availability.length > ' + daysCount
	};

	// query.availability = {
	// 	$group : {
	// 		$elemMatch: {
	// 			availability :{$gte: msg.queryParams.checkInDate, $lte: msg.queryParams.checkOutDate},
	// 			$elemMatch : {
	// 				hotelRooms: {
	// 					$elemMatch : {
	// 						totalAvailable : 0
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}
	// }

var options = {
	select: 'hotelName hotelAddress hotelCity hotelState hotelZip hotelPhoneNumber hotelEmail hotelStar hotelRating hotelAmenities hotelRooms images',
	lean: true,
	page: msg.pageNo || 1,
	limit: 20
};
hotelModel.paginate(query,options, function(err, result){
	if(err){
		res.code = 500  ;
		res.message = "Fail to get all hotels from the server";
		callback(null , res) ;
	}else{
		res.code = 200  ;
		res.message = "Success";
		res.data = result;
		callback(null , res) ;
	}
});
}

function getHotelByIdForCustomer(msg, callback){
	var res = {};
	idToGet = new ObjectID(msg.id) ;
	hotelModel.find({ is_deleted : false , _id : idToGet }).lean().exec(function(err, result){
		if(err){
			res.code = 500  ;
			res.message = "Fail to get all cars from the server"
			callback(null , res) ;
		}else{
			if(result) {
				delete result[0].availability;
				res.code = 200;
				res.message = "Success";
				res.data = result;
				callback(null, res);
			} else {
				res.code = 500  ;
				res.message = "Fail to get all cars from the server"
				callback(null , res) ;
			}
		}
	})
}

exports.addHotel = addHotel;
exports.getHotels = getHotels;
exports.getHotelById = getHotelById;
exports.updateHotelById = updateHotelById;
exports.deleteHotelById = deleteHotelById;
exports.getHotelsForCustomer = getHotelsForCustomer;
exports.getHotelByIdForCustomer = getHotelByIdForCustomer;

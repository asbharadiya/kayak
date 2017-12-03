var winston = require('winston');
const filename = 'logger/analyticsLogger.log';
var loggerFile = require('../logger/logger.js');
var logger = loggerFile.getLogger();
var analyze = require('../logger/loggerAnalyzer.js');
var cron = require('node-cron');

var validator = require('validator');
var ObjectID = require('mongodb').ObjectID;
var billingModel = require('../models/billing.js');
var carModel = require('../models/car.js');
var hotelModel = require('../models/hotel.js');
var flightModel = require('../models/flight.js');
var userModel = require('../models/authUsers.js');



function trackClick(msg, callback) {
  var res = {};
  msg.type = 'clicksPerPage'
  logger.log({
    level: 'info',
    message: msg
  });
  res.code = 200  ;
  res.message = "Success";
  analyze.run(function() {
    callback(null , res);
  });
}

function getRevenueByType(msg, callback){
    var res = {};
    billingModel.aggregate ({$group: { _id: "$listingType", totalAmount: { $sum: "$totalAmount" }, count: { $sum: 1 } } } , function(err, result){
    	if(err){
            res.code = 500  ;
            res.message = "Fail to get data from the server"
            callback(null , res) ;
        }else{
	        userModel.aggregate([{ $group: { _id: null, count: { $sum: 1 } } }], function(err, result1){
	    		 if(err){
		            res.code = 500  ;
		            res.message = "Fail to get data from the server"
		            callback(null , res) ;
		        }else{
		        	hotelModel.aggregate([{ $group: { _id: null, count: { $sum: 1 } } }], function(err, result2){
			    		 if(err){
				            res.code = 500  ;
				            res.message = "Fail to get data from the server"
				            callback(null , res) ;
				        }else{
				        	flightModel.aggregate([{ $group: { _id: null, count: { $sum: 1 } } }], function(err, result3){
					    		 if(err){
						            res.code = 500  ;
						            res.message = "Fail to get data from the server"
						            callback(null , res) ;
						        }else{
						        	carModel.aggregate([{ $group: { _id: null, count: { $sum: 1 } } }], function(err, result4){
							    		if(err){
								            res.code = 500  ;
								            res.message = "Fail to get data from the server"
								            callback(null , res) ;
								        }else{
								            res.code = 200  ;
								            res.message = "Success";
								            res.data = {};
								            res.data.revenueByType = result;
								            res.data.userCount = result1[0].count;
								            res.data.hotelCount = result2[0].count;
								            res.data.flightCount = result3[0].count;
								            res.data.carCount = result4[0].count;
								            callback(null , res) ;
								        }
						        	});
						        }
				        	});
				      }
        	   });
           }
        });
	  }
  });
}

function getRevenueByTopCmpny(msg, callback){
    var res = {};
    billingModel.aggregate([{ '$match': { 'createdDate': { $gte: new Date("2016-12-22T00:00:00.000Z"), $lt: new Date("2017-12-22T00:00:00.000Z")}}},
		{ $group: { _id: "$listingId", totalAmount: { $sum: "$totalAmount" }, count: { $sum: 1 }, listingType: { "$first": "$listingType" }} },
		{$sort: {totalAmount: -1}},
                {$lookup: {from: "hotels" ,localField: "_id",foreignField: "_id", as: "listingHotelName"}},
                {$lookup: {from: "cars" ,localField: "_id",foreignField: "_id", as: "listingCarName"}},
                {$lookup: {from: "flights" ,localField: "_id",foreignField: "_id", as: "listingFlightName"}}]).limit(10).exec(function(err, result){
        if(err){
            res.code = 500  ;
            res.message = "Fail to get data from the server"
            callback(null , res) ;
        }else{
        	billingModel.aggregate([{ '$match': { 'createdDate': { $gte: new Date("2017-11-22T00:00:00.000Z"), $lt: new Date("2017-12-22T00:00:00.000Z")}}},
        		{ $group: { _id: "$listingId", totalAmount: { $sum: "$totalAmount" }, count: { $sum: 1 }, listingType: { "$first": "$listingType" }} },
        		{$sort: {totalAmount: -1}},
                        {$lookup: {from: "hotels" ,localField: "_id",foreignField: "_id", as: "listingHotelName"}},
                        {$lookup: {from: "cars" ,localField: "_id",foreignField: "_id", as: "listingCarName"}},
                        {$lookup: {from: "flights" ,localField: "_id",foreignField: "_id", as: "listingFlightName"}}]).limit(10).exec(function(err, result0){
        		 if(err){
    	            res.code = 500  ;
    	            res.message = "Fail to get data from the server"
    	            callback(null , res) ;
    	        }else{
    	        	res.code = 200  ;
    	            res.message = "Success";
    	            res.data = {};
    	            res.data.revenueYr = result;
    	            res.data.revenueMonth = result0;
    	            callback(null , res);
    	        }
        	});
        }
    });
}

function getRevenueByCity(msg, callback){
    var res = {};
    billingModel.aggregate([ { $group: { _id: "$revenueGeneratingCity", totalAmount: { $sum: "$totalAmount" },count: { $sum: 1 }} },
    	{$sort: {totalAmount: -1}} ]).limit(10).exec(function(err, result){
        if(err){
            res.code = 500  ;
            res.message = "Fail to get data from the server"
            callback(null , res) ;
        }else{
            res.code = 200  ;
            res.message = "Success"
            res.data = result
            callback(null , res) ;
        }
    });
}

exports.getRevenueByType = getRevenueByType;
exports.getRevenueByCity = getRevenueByCity;
exports.getRevenueByTopCmpny = getRevenueByTopCmpny;
exports.trackClick = trackClick;

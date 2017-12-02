var validator = require('validator');
var ObjectID = require('mongodb').ObjectID;
var billingModel = require('../models/billing.js');
var carModel = require('../models/car.js');
var hotelModel = require('../models/hotel.js');
var flightModel = require('../models/flight.js');
var userModel = require('../models/authUsers.js');

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
		            res.code = 200  ;
		            res.message = "Success";
		            res.data = {};
		            res.data.revenueByType = result;
		            res.data.userCount = result1[0].count;
		            callback(null , res) ;
		        }
        	});
        }
    });
}

function getRevenueByTopCmpny(msg, callback){
    var res = {};
    billingModel.aggregate([{ '$match': { 'createdDate': { $gte: new Date("2016-12-22T00:00:00.000Z"), $lt: new Date("2017-12-22T00:00:00.000Z")}}},
    		{ $group: { _id: "$listingId", totalAmount: { $sum: "$totalAmount" }, count: { $sum: 1 } } }, 
    		{$sort: {totalAmount: -1}}], function(err, result){
        if(err){
            res.code = 500  ;
            res.message = "Fail to get data from the server"
            callback(null , res) ;
        }else{
        	billingModel.aggregate([{ '$match': { 'createdDate': { $gte: new Date("2017-11-22T00:00:00.000Z"), $lt: new Date("2017-12-22T00:00:00.000Z")}}},
        		{ $group: { _id: "$listingId", totalAmount: { $sum: "$totalAmount" }, count: { $sum: 1 } } }, 
        		{$sort: {totalAmount: -1}}], function(err, result1){
        		 if(err){
    	            res.code = 500  ;
    	            res.message = "Fail to get data from the server"
    	            callback(null , res) ;
    	        }else{
    	        	res.code = 200  ;
    	            res.message = "Success";
    	            res.data = {};
    	            res.data.revenueYr = result;
    	            res.data.revenueMonth = result1;
    	            callback(null , res) ;    	        	
    	        }
        	});
        	/*var count = 0;
        	while(count<result.length){
        		var idToGet = new ObjectID(result[count]._id) ;
        		flightModel.findOne({ is_deleted : false , _id : idToGet }, function(err, result1){
        			if(result1!=null){
        				result[count].listingName = result1.airline;
        				count++;
        			} else {
	        			hotelModel.findOne({ is_deleted : false , _id : idToGet }, function(err, result2){
	        				if(result2!=null){
	            				result[count].listingName = result2.hotelName;
	            				count++;
	            			} else {
		        				carModel.findOne({ is_deleted : false , _id : idToGet }, function(err, result3){
		        					result[count].listingName = result3.carName;
		        					count++;
		                		});
	            			}
	            		});
        			}
        		});
        		if(count==(result.length-1)){
	                res.code = 200  ;
	                res.message = "Success"
	                res.data = result
	                callback(null , res) ;
        		}
        	}*/
        }
    });
}

function getRevenueByCity(msg, callback){
    var res = {};
    billingModel.aggregate([ { $group: { _id: "$revenueGeneratingCity", totalAmount: { $sum: "$totalAmount" },count: { $sum: 1 }} }, 
    	{$sort: {totalAmount: -1}} ], function(err, result){
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
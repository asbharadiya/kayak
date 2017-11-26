var validator = require('validator');
var ObjectID = require('mongodb').ObjectID;
var carModel = require('../models/car.js');

function addCar(msg, callback){
    var res = {};
    if(validator.isNumeric( msg.carQuantity) && validator.isNumeric( msg.dailyRentalValue) && validator.isNumeric( msg.occupancy) )
    {
        var _date = new Date();
        msg.createdDate = _date;
        msg.updatedDate = _date ;
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

        var newCar = new carModel(msg);

        newCar.save(function (err) {
            if(err) {
                res.code = 500 ;
                res.message = "Error occured while registering a car with server";
                callback(null , res);
            } else {
                res.code = 200  ;
                res.message = "Success";
                callback(null , res) ;
            }
        });
    }else{
        res.code = 400;
        res.message = "Please pass the correct Parameteres";
        callback(null, res);
    }
}

function getCars(msg, callback){
    var res = {};
    carModel.find({ is_deleted : false}, function(err, result){
        if(err){
            res.code = 500  ;
            res.message = "Fail to get all hotels from the server"
            callback(null , res) ;
        }else{
            res.code = 200  ;
            res.message = "Success"
            res.data = result
            callback(null , res) ;
        }
    });
}

function getCarById(msg, callback){
    var res = {};
    idToGet = new ObjectID(msg.id) ;
    carModel.find({ is_deleted : false , _id : idToGet }).lean().exec(function(err, result){
        if(err){
            res.code = 500  ;
            res.message = "Fail to get all cars from the server"
            callback(null , res) ;
        }else{
            delete result[0].availability;

            res.code = 200  ;
            res.message = "Success";
            res.data = result;
            callback(null , res) ;
        }
    })
}

function updateCarById(msg, callback){
    var res = {};
    idToUpdate = new ObjectID(msg._id) ;

    msg.updatedDate = new Date() ;

    var serviceDays = (new Date(msg.serviceEndDate)- new Date(msg.serviceStartDate))/(1000*60*60*24) ;

    var availabilityDateObject = [] ;
    for(var i=0 ; i <= serviceDays ; i++){
        var date = new Date(msg.serviceStartDate) ;
        date.setDate(date.getDate() + i);
        availabilityDateObject.push({availabilityDate : date , availableCars : msg.carQuantity})
    }

    msg.availability = availabilityDateObject ;

    carModel.update({is_deleted : false , _id : idToUpdate }, msg, { multi: false }, function(err , response){
        if(err){
            res.code = 500 ;
            res.message = "Error occured while updating  a car";
            callback(null , res);
        }else{
            res.code = 200  ;
            res.message = "Success";
            callback(null , res) ;
        }
    })
}

function deleteCarById(msg, callback){
    var res = {};
    if(!validator.isEmpty(msg.idToDelete)){
        var idToDelete = new ObjectID(msg.idToDelete) ;
        carModel.update({is_deleted : false , _id : idToDelete }, { $set: {is_deleted: true, updatedDate: new Date() }}, { multi: false }, function(err , response){
            if(err){
                res.code = 500 ;
                res.message = "Error occured while deleting a hotel"
                callback(null , res);
            }else{
                res.code = 200  ;
                res.message = "Success"
                callback(null , res) ;
            }
        })
    }else{
        res.code = 400;
        res.message = "Please pass the correct Parameteres";
        callback(null, res);
    }
}

function getCarsForCustomer(msg, callback){
    var res = {};

    carModel.find({ is_deleted : false}, function(err, result){
        if(err){
            res.code = 500  ;
            res.status  = 500 ;
            res.message = "Fail to get all hotels from the server"
            callback(null , res) ;
        }else{
            res.code = 200  ;
            res.status  = 200 ;
            res.message = "Success"
            res.data = result
            callback(null , res) ;
        }
    });
}

exports.addCar = addCar;
exports.getCars = getCars;
exports.getCarById = getCarById;
exports.updateCarById = updateCarById;
exports.deleteCarById = deleteCarById;
exports.getCarsForCustomer = getCarsForCustomer;
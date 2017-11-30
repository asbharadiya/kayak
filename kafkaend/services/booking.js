var bookingModel = require('../models/booking.js');
var billingModel = require('../models/billing.js');
var creditCardModel = require('../models/creditCard.js');
var ObjectID = require('mongodb').ObjectID;

function getBills(msg, callback){
    var res = {};
    res.code = 200;
    res.message = "Success";
    callback(null, res);
}

function getBillById(msg, callback){
    var res = {};
    res.code = 200;
    res.message = "Success";
    callback(null, res);
}

function makeBooking(msg, callback){
    var res = {};
    var curr_date = new Date();
    //TODO: first subtract availability based on category and travellers, take additional data from frontend if needed
    var booking = new bookingModel();
    booking.listingType = msg.data.listingType;
    booking.listingId = new ObjectID(msg.data.listingId);
    booking.userId = msg.userId;
    booking.bookingInfo = msg.data.bookingInfo;
    booking.createdDate = curr_date;
    booking.save(function (err, booking) {
        if (!err) {
            var billing = new billingModel();
            billing.listingType = msg.data.listingType;
            billing.listingId = new ObjectID(msg.data.listingId);
            billing.userId = msg.userId;
            billing.totalAmount = msg.data.total;
            billing.createdDate = curr_date;
            billing.bookingId = new ObjectID(booking._id);
            if(msg.data.paymentMethod === 'new'){
                if(msg.data.saveCard){
                    var card = new creditCardModel();
                    card.cardNumber = msg.data.cardNumber;
                    card.nameOnCard = msg.data.nameOnCard;
                    card.expiryDate = msg.data.expiryDate;
                    card.cvv = msg.data.cvv;
                    card.userId = msg.userId;
                    card.save(function(err,card){
                       if(!err){
                           billing.creditCardId = new ObjectID(card._id);
                           billing.save(function(err){
                               if(!err){
                                   res.code = 200;
                                   res.message = "Success";
                                   callback(null, res);
                               } else {
                                   //TODO: delete booking
                                   //TODO: rollback availability
                                   res.code = 500;
                                   res.message = "Internal serve error";
                                   callback(null, res);
                               }
                           });
                       } else {
                           //TODO: delete booking
                           //TODO: rollback availability
                           res.code = 500;
                           res.message = "Internal serve error";
                           callback(null, res);
                       }
                    });
                } else {
                    //TODO: verify card
                    billing.save(function(err){
                        if(!err){
                            res.code = 200;
                            res.message = "Success";
                            callback(null, res);
                        } else {
                            //TODO: delete booking
                            //TODO: rollback availability
                            res.code = 500;
                            res.message = "Internal serve error";
                            callback(null, res);
                        }
                    });
                }
            } else {
                billing.creditCardId = new ObjectID(msg.data.selectedCreditCard);
                billing.save(function(err){
                    if(!err){
                        res.code = 200;
                        res.message = "Success";
                        callback(null, res);
                    } else {
                        //TODO: delete booking
                        //TODO: rollback availability
                        res.code = 500;
                        res.message = "Internal serve error";
                        callback(null, res);
                    }
                });
            }
        } else {
            //TODO: rollback availability
            res.code = 500;
            res.message = "Internal serve error";
            callback(null, res);
        }
    });
}

function getBookings(msg, callback){
    var res = {};
    res.code = 200;
    res.message = "Success";
    callback(null, res);
}

function getBookingById(msg, callback){
    var res = {};
    res.code = 200;
    res.message = "Success";
    callback(null, res);
}

exports.getBills = getBills;
exports.getBillById = getBillById;
exports.makeBooking = makeBooking;
exports.getBookings = getBookings;
exports.getBookingById = getBookingById;
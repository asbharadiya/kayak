var validator = require('validator');
var ObjectID = require('mongodb').ObjectID;
var userModel = require('../models/authUsers.js');
var creditCardModel = require('../models/creditCard.js');


function getProfile(msg, callback){
    var res = {};
    console.log('KAFKA '+ msg.id)
    userModel.find({ auth_user_id : msg.id}, function(err, result){
    	if(err){
    		console.log('ERROR ' + err)
			res.code = 500  ; 
			res.status  = 500 ; 
			res.message = "Fail to get User Details from the server"
			callback(null , res) ; 
		}else{
			console.log('Passed '+ result)
			res.code = 200  ; 
			res.status  = 200 ; 
			res.message = "Success"
			res.data = result
			callback(null , res) ; 
		}
    });
}

function updateProfile(msg, callback){
	console.log('USER KAFKA')
    var res = {};
	idToUpdate = msg.id ;
	console.log(idToUpdate)
	
	userModel.update({is_deleted : false , _id : idToUpdate }, msg, { multi: false }, function(err , result){
        if(err){
            res.code = 500 ;
            res.message = "Error occured while updating Profle";
            callback(null , res);
        }else{
        	console.log('Update Passed '+ result)
            res.code = 200  ;
            res.message = "Success";
            callback(null , res) ;
        }
    })
}

function addCreditCard(msg, callback){
    var res = {};
    msg.creditCard.userId = msg.user_id;
    creditCardModel.insert(msg.creditCard, function(err, result){
        if(err){
            res.code = 500  ;
            res.message = "Fail to get credit cards from the server";
            callback(null , res) ;
        }else{
            res.code = 200;
            res.message = "Success";
            callback(null, res);
        }
    });
}

function getCreditCards(msg, callback){
    var res = {};
    creditCardModel.find(
        {
            userId : msg.user_id
        },{
            cardNumber:true
        }, function(err, result){
        if(err){
            res.code = 500  ;
            res.message = "Fail to get credit cards from the server";
            callback(null , res) ;
        }else{
            res.code = 200;
            res.message = "Success";
            res.data = result;
            callback(null, res);
        }
    });
}

function deleteCreditCardById(msg, callback){
    var res = {};
    res.code = 200;
    res.message = "Success";
    callback(null, res);
}

exports.getProfile = getProfile;
exports.updateProfile = updateProfile;
exports.addCreditCard = addCreditCard;
exports.getCreditCards = getCreditCards;
exports.deleteCreditCardById = deleteCreditCardById;
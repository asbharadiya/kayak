var kafka = require('./kafka/client');

var config = require('config');
var topic_name = config.kafkaTopic;

function getProfile(req,res){
	console.log('AMAN in GET PROFILE ' + req.session.passport.user._id)
	var id= req.session.passport.user._id;
	kafka.make_request(topic_name,'getProfile',{
		id
	},function(err,result){
        if(err) {
            return res.status(500).json({status:500,statusText:"Internal server error"});
        } else {
        	console.log('Backend Passed' + result.data)
            return res.status(result.code).json({status:result.code,statusText:result.message,data:result.data});
        }
    });
}

function updateProfile(req,res){
	kafka.make_request(topic_name,'updateProfile',{
		
	},function(err,result){
        if(err) {
            return res.status(500).json({status:500,statusText:"Internal server error"});
        } else {
            return res.status(result.code).json({status:result.code,statusText:result.message});
        }
    });
}

function addCreditCard(req,res){
	kafka.make_request(topic_name,'addCreditCard',{
		
	},function(err,result){
        if(err) {
            return res.status(500).json({status:500,statusText:"Internal server error"});
        } else {
            return res.status(result.code).json({status:result.code,statusText:result.message});
        }
    });
}

function getCreditCards(req,res){
	kafka.make_request(topic_name,'getCreditCards',{
		
	},function(err,result){
        if(err) {
            return res.status(500).json({status:500,statusText:"Internal server error"});
        } else {
            return res.status(result.code).json({status:result.code,statusText:result.message});
        }
    });
}

function deleteCreditCardById(req,res){
	kafka.make_request(topic_name,'deleteCreditCardById',{
		
	},function(err,result){
        if(err) {
            return res.status(500).json({status:500,statusText:"Internal server error"});
        } else {
            return res.status(result.code).json({status:result.code,statusText:result.message});
        }
    });
}

exports.getProfile = getProfile;
exports.updateProfile = updateProfile;
exports.addCreditCard = addCreditCard;
exports.getCreditCards = getCreditCards;
exports.deleteCreditCardById = deleteCreditCardById;
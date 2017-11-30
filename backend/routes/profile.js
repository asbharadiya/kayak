var kafka = require('./kafka/client');

var config = require('config');
var topic_name = config.kafkaTopic;

function getProfile(req,res){
	
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
	console.log('AMAN in UPDATE PROFILE ' + req.session.passport.user._id)
	console.log(req.body)
	
	var obj = {
			
		    id : req.body._id,
		    auth_user_id : req.body.auth_user_id,
		    firstName : req.body.firstName,
		    lastName : req.body.lastName,
		    address: req.body.address,
		    city: req.body.city,
		    state: req.body.state,
		    zip_code: req.body.zip_code,
		    phone_number: req.body.phone_number,
		    profile_image: '',
		    role: 'USER',
		    email: req.body.email
    }
	
	kafka.make_request(topic_name,'updateProfile',obj,function(err,result){
        if(err) {
            return res.status(500).json({status:500,statusText:"Internal server error"});
        } else {
            return res.status(result.code).json({status:result.code,statusText:result.message});
        }
    });
}

function addCreditCard(req,res){
	kafka.make_request(topic_name,'addCreditCard',{
        user_id:req.session.passport.user._id,
        creditCard:req.body
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
        user_id:req.session.passport.user._id
	},function(err,result){
        if(err) {
            return res.status(500).json({status:500,statusText:"Internal server error"});
        } else {
            return res.status(result.code).json({status:result.code,statusText:result.message,data:result.data});
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
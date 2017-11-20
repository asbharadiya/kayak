var mongoose = require("mongoose");

var flightSchema = new mongoose.Schema({
	
    id : String,
    flightNumber : String ,
	airline : String ,
	source : String ,
	destination : String ,
	arrival : String ,
	departure : String ,
	serviceStartDate : Date,
	serviceEndDate : Date,
	class : String ,
	seats : Number ,
	price : Number ,
	is_deleted : Boolean
});
module.exports = mongoose.model('flight', flightSchema);
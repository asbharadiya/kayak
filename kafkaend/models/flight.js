var mongoose = require("mongoose");

var flightSchema = new mongoose.Schema({
	
    id : String,
    flightNumber : String ,
	airline : String ,
	source : String ,
	destination : String ,
	arrival : Date ,
	departure : Date ,
	serviceStartDate : Date,
	serviceEndDate : Date,
	class : String ,
	price : Number ,
	seats : Number ,
	is_deleted : Boolean
});
module.exports = mongoose.model('flight', flightSchema);
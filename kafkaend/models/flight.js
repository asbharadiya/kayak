var mongoose = require("mongoose");

var flightSchema = new mongoose.Schema({
	
    id : String,
    flightNumber : String ,
	airline : String ,
	source : String ,
	destination : String ,
	arrival : String ,
	departure : String ,
	class : String ,
	price : Number ,
	seats : Number ,
	createdDate: Date,
    updatedDate : Date,
    is_deleted : Boolean,
    availability : [{ availabilityDate : Date, seats : Number }],
	deletedDate : Date
});
module.exports = mongoose.model('flight', flightSchema);
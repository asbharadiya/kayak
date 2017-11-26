var mongoose = require("mongoose");

var carSchema = new mongoose.Schema({
	id : String,
    carType : String,
    carName : String,
    occupancy : Number,
    luggage : String,
    dailyRentalValue : Number,
    createdDate: Date,
    updatedDate : Date,
    is_deleted : Boolean,
    availability : [{ availabilityDate : Date, availableCars : Number }],
    carImageId : [String]
})
    
module.exports = mongoose.model('car', carSchema);
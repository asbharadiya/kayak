var mongoose = require("mongoose");

var hotelSchema = new mongoose.Schema({
	id : String,
	hotelName : String,
	hotelAddress : String,
	hotelCity : String,
	hotelState : String,
	hotelZip : Number,
	hotelPhoneNumber : Number,
    hotelEmail: String,
    hotelStar : Number,
    hotelRating : Number,
    hotelPhotos : [{ file : String, fileId : String }],
    hotelAmenities : [{ name : String, id : String }],
    hotelReviews : [{ userId : String, review : String, rating : Number, postDate : Date }],
    hotelOverAllRating : Number,
    hotelRooms : [{ roomType : String, priceTotal : Number, totalAvailable : Number, personPerRoom : Number}],
    is_deleted : Boolean,
    serviceStartDate : Date,
    serviceEndDate : Date,
    availability : [{ availableDate: Date, hotelRooms : [{ roomType : String, priceTotal : Number, totalAvailable : Number, personPerRoom : Number}] } ],
    images : [String]
});
module.exports = mongoose.model('hotel', hotelSchema);
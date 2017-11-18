var mongoose = require("mongoose");

var hotelSchema = new mongoose.Schema({
	id : String,
    name : String,
    address : String,
    city : String,
    state : String,
    zip : Number,
    phoneNumber : Number,
    email: String,
    star : Number,
    photos : [{ file : String, fileId : String }],
    amenities : [{ name : String, id : String }],
    reviews : [{ userId : String, review : String, rating : Number, postDate : Date }],
    overAllRating : Number,
    rooms : [{ roomType : String, priceTotal : Number, totalAvailable : Number }],
    is_deleted : Boolean
});
module.exports = mongoose.model('hotel', hotelSchema);
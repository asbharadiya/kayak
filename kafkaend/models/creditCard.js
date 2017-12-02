var mongoose = require("mongoose");

var creditCardSchema = new mongoose.Schema({
    id : String,
    userId: String,
    cardNumber:String,
    nameOnCard:String,
    cvv:String,
    expiryDate:String,
    isDeleted : Boolean
})

module.exports = mongoose.model('creditcards', creditCardSchema);
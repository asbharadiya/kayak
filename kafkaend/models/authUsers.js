var mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
	id : String,
	auth_user_id : String,
	firstName : String,
	lastName : String,
  address: String,
  city: String,
  state: String,
  zip_code: String,
  phone_number: Number,
  profile_image: String,
  role: String,
  email: String,
  is_deleted: Boolean
});

module.exports = mongoose.model('users', userSchema);

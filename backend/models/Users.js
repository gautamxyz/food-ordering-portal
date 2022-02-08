const mongoose = require("mongoose");
const Foods = require("./Foods");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	contact_number: {
		type: String,
		required: true
	},
	age: {
		type: String,
		required: true
	},
	batch: {
		type: String,
		required: true,
		enum: ['UG1', 'UG2', 'UG3', 'UG4', 'UG5']
	},
	password: {
		type: String,
		required: true
	},
	wallet: {
		type: Number,
		required: true,
		default: 0
	},
	favorite:{
		type:String,
		required:false
	}
});
	
module.exports=User= mongoose.model("Users", UserSchema);
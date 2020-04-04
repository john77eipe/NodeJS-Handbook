const mongoose = require('mongoose');

// User Schema - Mongoose schema defines the structure of the document, default values, validators, etc.
const userSchema = new mongoose.Schema({
	username: {
		type: String,
		index: true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	fullname: {
		type: String
	},
	profileimage:{
		type: String
	},
	lastaccess: {
		type: Date,
		default: Date.now
	}
});

module.exports = userSchema;
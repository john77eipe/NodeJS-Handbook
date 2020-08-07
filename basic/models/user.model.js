import mongoose from 'mongoose';

// User Schema - Mongoose schema defines the structure of the document, default values, validators, etc.
export const userSchema = new mongoose.Schema({
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
	profileimage: {
		type: String
	},
	lastaccess: {
		type: Date,
		default: Date.now
	}
});

userSchema.path('username').validate(
	function (username) {
		return username.length;
	}, 
	'Name cannot be blank');

userSchema.path('email').validate(
	function (email) {
		return email.length;
	}, 
	'Email cannot be blank');
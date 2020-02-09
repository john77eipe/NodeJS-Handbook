var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodeauth');

var db = mongoose.connection;

// User Schema - Mongoose schema defines the structure of the document, default values, validators, etc.
var UserSchema = mongoose.Schema({
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
	name: {
		type: String
	},
	profileimage:{
		type: String
	}
});

// User Model -  Mongoose model provides an interface to the database for creating, querying, updating, deleting records, etc.
// Model is a wrapper on the Mongoose schema
// If collection name is not specified, Mongoose automatically looks for the plural version of your model name 
module.exports = mongoose.model('User', UserSchema);
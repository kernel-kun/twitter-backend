const mongoose = require("mongoose");
const validator = require('validator');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	// No need to add `_id` field as it gets created by default
	username: {
		type: String,
		required: [true, "Please provide a Username"],
		unique: true,
		trim: true
	},
	email: {
		type: String,
		required: [true, "Please provide your email"],
		unique: true,
		validate: [validator.isEmail, 'Please enter a valid email address']
	},
	password: {
		type: String,
		required: [true, "Please provide a password"],
		validate: [validator.isStrongPassword, 'Password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character'],
		trim: true
	},
	// tweets: [{
	// 	type: Schema.Types.ObjectId,
	// 	ref: 'Tweet'
	// }],
	role: {
		type: String,
		enum: ['user', 'admin'],
		default: 'user'
	},
	isSuperAdmin: {
		type: Boolean,
		default: false
	}
});

const User = mongoose.model('User', userSchema, 'users');
module.exports = User;
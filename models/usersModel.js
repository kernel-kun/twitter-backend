const mongoose = require("mongoose");
import { isEmail } from 'validator';
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
		validate: [isEmail, 'Please enter a valid email address.']
	},
	password: {
		type: String,
		required: [true, "Please provide a password"],
		minlength: [8, 'Password must be at least 8 characters.'],
		trim: true
	},
	tweets: [{
		type: Schema.Types.ObjectId,
		ref: 'Tweet'
	}],
	role: {
		type: String,
		enum: ['user', 'admin'],
		default: 'user'
	},
});

const User = mongoose.model('User', userSchema, 'users');
module.exports = User;
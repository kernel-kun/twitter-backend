const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
	// No need to add `_id` field as it gets created by default
    text: {
        type: String,
        required: true,
        default: 'This is a default tweet!'
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
});

const Tweet = mongoose.model('Tweet', tweetSchema, 'tweets');
module.exports = Tweet;
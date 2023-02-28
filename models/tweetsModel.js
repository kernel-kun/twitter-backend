const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
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
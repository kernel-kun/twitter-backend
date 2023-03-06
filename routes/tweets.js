const express = require('express');
// Import Authentication functionality
const userAuthentication = require('../controller/userAuthentication');
// Import User and Tweet Model
const User = require('../models/usersModel');
const Tweet = require('../models/tweetsModel')

const router = express.Router();

// GET all posts by all users
router.get('/', (req, res) => {
    Tweet.find()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => { res.status(500).json({ error: `Error while retrieving data: ${err}` }) });
})

// GET a single tweet using 'object.id'
router.get('/:id', (req, res) => {
    try {
        Tweet.findById(req.params.id)
            .then(result => {
                res.status(200).json(result);
            })
            .catch(err => { res.status(500).json({ error: `Error while retrieving data: ${err}` }) });

    } catch (err) {
        res.status(500).json({ error: err });
    }
})

// Patch a single tweet
router.patch('/:id', userAuthentication.verifyToken, (req, res) => {
    try {
        if (Tweet.findById(req.params.id).createdBy === req.user.id) {
            Tweet.findByIdAndUpdate(req.params.id, req.body)
                .then(result => {
                    res.status(200).json({ updatedTweet: result });
                })
                .catch(err => { res.status(500).json({ error: `Error while updating data: ${err}` }) });
        } else {
            res.status(400).json({ error: "Only the owner of the tweet can update it!" })
        }
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// Delete a single tweet
router.delete('/:id', userAuthentication.verifyToken, (req, res) => {
    try {
        if (Tweet.findById(req.params.id).createdBy === req.user.id || User.findById(req.user.id).role === 'admin') {
            Tweet.findByIdAndDelete(req.params.id)
                .then(result => {
                    res.status(200).json({ deletedTweet: result })
                })
                .catch(err => { res.status(500).json({ error: `Error while deleting data: ${err}` }) });
        } else {
            res.status(400).json({ error: "Only the owner of tweet or admin can delete it!" })
        }
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// Post a new tweet
// router.post('/',)

module.exports = router;
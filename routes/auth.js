const express = require('express');
// Import Authentication functionality
const userAuthentication = require('../controller/userAuthentication');

const router = express.Router();

router.post('/login', userAuthentication.login);
router.post('/signup', userAuthentication.signup);

module.exports = router;
// Import Auth dependencies
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Import User Model
const User = require('../models/usersModel');

// Sign a JSON Object using JWT
const signToken = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};

// SignUp Logic
exports.signUp = (req, res, next) => {
    // Check if passwords match
    if (req.body.password === req.body.passwordConfirm) {
        //Hash the password
        const saltRounds = 10;
        bcrypt.hash(req.body.password, saltRounds)
            .then(result => {
                const newUser = new User({
                    username: req.body.name,
                    email: req.body.email,
                    password: result
                });
                // Find if user already exists
                User.findOne({ email: req.body.email })
                    .then(result => {
                        if (result.length === 0) {
                            newUser.save()
                                .then(result => res.status(201).json({ message: 'User Signup Successful!', userDetails: result }))
                                .catch(err => res.status(500).json({ message: 'Error occured in the DB', error: err }))
                        } else {
                            res.status(400).json({ message: 'Email already exists!' })
                        }
                    })
            })
            .catch(err => res.status(500).json({ message: 'Error while hashing password', error: err }))

    } else {
        res.status(400).json({ message: 'Passwords donot match!' })
    }
};

// Login Logic
exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // Check if Email or Password are empty
        if (!email || !password) {
            res.status(404).json({ status: "fail", message: "Please provide email and password!" });
        }
        const user = await User.findOne({ email: email });
        // Check is User exists OR Passwords match
        if (!user || await !bcrypt.compareSync(req.body.password, user.password)) {
            res.status(401).json({ status: "fail", message: "Incorrect email or password OR user doesnot exist!" });
        }

        // Define payload data for JWT
        const jwt_data = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        // Generate a token
        const token = signToken(jwt_data);
        res.status(200).json({ status: "success", jwt_token: token });
    } catch (err) {
        console.log(err);
    }
};

// Verify a logged in user
exports.verifyToken = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token)
            res.status(401).json({
                status: "fail",
                message: "Your are not logged in! Please log in to get access",
            });

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        if (!user)
            res.status(401).json({
                status: "fail",
                message: "The user belonging to this token no longer exist",
            });
        
        req.user = decoded;
        console.log("🚀 ~ file: userAuthentication.js:97 ~ exports.verifyToken= ~ decoded:", decoded)
        next();
    } catch (err) {
        console.log(err);
    }
};
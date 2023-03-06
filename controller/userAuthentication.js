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

// ↓ Signup Logic ↓
exports.signup = (req, res) => {
    // Check if passwords match
    if (req.body.password === req.body.passwordConfirm) {
        //Hash the password
        const saltRounds = 10;
        bcrypt.hash(req.body.password, saltRounds)
            .then(result => {
                const newUser = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: result
                });
                // Find if user already exists
                User.findOne({ email: req.body.email })
                    .then(result => {
                        if (!result || result.length === 0) {
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

// ↓ Login Logic ↓
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // #### LOGIN CHECKS ####
        // Check if Email or Password are empty
        if (!email || !password) {
            res.status(400).json({ status: "fail", message: "Please provide email and password!" });
        }
        const user = await User.findOne({ email: email });
        // Check if User exists
        if (!user) {
            res.status(404).json({ status: "fail", message: "User doesnot exist!" });
        }
        // Check if Passwords match
        if (await !bcrypt.compareSync(req.body.password, user.password)) {
            res.status(401).json({ status: "fail", message: "Incorrect password!" });
        }

        // Define payload data for JWT
        const jwt_data = {
            id: user.id,
            username: user.username,
            email: user.email
        }

        // Generate a token
        const token = signToken(jwt_data);
        // Set the token in the Authorization header of the response
        res.set('Authorization', `Bearer ${token}`);

        const successRes = { status: "success", message: "Logged in successfully" };
        if (process.env.IS_DEV_ENV === "true") {
            console.log("[login] JWT payload data:\n", jwt_data);
            successRes.jwt_token = token;
        }
        res.status(200).json(successRes);
    } catch (err) {
        console.log(err);
    }
};

// Verify a logged in user
exports.verifyToken = async (req, res, next) => {
    try {
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
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
        if (process.env.IS_DEV_ENV === "true") {
            console.log("[verifyToken] Decoded JWT data:\n", decoded);
        }
        next();
    } catch (err) {
        console.log(err);
    }
};
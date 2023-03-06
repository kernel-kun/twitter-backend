const express = require("express");

// ----------------------
// - Import Middlewares -
// ----------------------

// ↓ Development Middlewares ↓
// if(process.env.IS_DEV_ENV === "true"){

// }
// ↓ Production Middlewares ↓
require('dotenv').config();
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require('helmet');

// Import Routes
const authRoute = require('./routes/auth');
const usersRoute = require('./routes/users');
const tweetsRoute = require('./routes/tweets');

const PORT = process.env.PORT || 8000       // either define a custom port or use 8000
const DB_URL = process.env.DB_URL           // MongoDB login url already embedded with password

const app = express();
// Parse buffer streams; and populate that data in 'req.param', 'req.query', 'req.body'
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// Enable CORS
app.use(cors({
    origin: "*",
    // exposedHeaders: 'Authorization'
}));
// Increase security by adding http headers
app.use(helmet());
// Ignore Mongoose DeprecationWarning
mongoose.set('strictQuery', false);


// --------------
// --- Routes ---
// --------------
app.get('/', (req, res) => {
    res.send('This page needs to be documented');
});
app.use('/auth', authRoute);
app.use('/tweets', tweetsRoute);
// app.use('/users', usersRoute);

// connect MongoDB -> then start server
mongoose.connect(DB_URL)
    .then(() => {
        console.log("MongoDB successfully connected");
        // Once DB is connected then -> start listening to server
        app.listen(PORT, () => {
            console.log(`App running on port ${PORT}`);
        })
    })
    .catch((err) => {
        console.log(`Error connecting MongoDB. Error: ${err}`);
    });

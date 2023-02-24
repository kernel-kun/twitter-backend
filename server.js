const express = require("express");
// Import Middlewares
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const PORT = process.env.PORT || 8000       // either define a custom port or use 8000
const DB_URL = process.env.DB_URL           // MongoDB login url already embedded with password

const app = express();
// Parse buffer streams; and populate that data in 'req.param', 'req.query', 'req.body'
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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

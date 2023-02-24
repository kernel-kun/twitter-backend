const express = require("express");
// Import Middlewares
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require('helmet');
require('dotenv').config();

const PORT = process.env.PORT || 8000       // either define a custom port or use 8000
const DB_URL = process.env.DB_URL           // MongoDB login url already embedded with password

const app = express();
// Parse buffer streams; and populate that data in 'req.param', 'req.query', 'req.body'
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// Enable CORS
app.use(cors({
    origin: "*"
}));
// Increase security by using http headers
app.use(helmet());

// Routes
app.use()
app.use()

mongoose.connect(DB_URL, {
    NewUrlParser: true,
    useUnifiedTopology: true
})
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

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
let mongoose = require('mongoose');
const { authRoute } = require("./routes/authRoute");

const path = require("path");

app.use(express.json());
app.use(cors());



// http://localhost:2000/
app.get("/", (req, res) => {
    res.send({
        status: true,
        message: "backend health is ok..."
    });
});
// Allow access to static files
app.use(
  '/uploads/profiles',
  express.static('uploads/profiles')
);

app.use('/my-backend/api/auth',authRoute)
// app.use('/my-backend/api/services',)


mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.Dbname}`)
    .then(() => {
        // Start server
        app.listen(process.env.PORT, () => {
            console.log(`Backend connected to mongoDb`);
        });
    })
    .catch((err) => {
        console.error(err);
    })



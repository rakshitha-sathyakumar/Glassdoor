// var express = require('express');
// //var app = express();
// var bodyParser = require('body-parser');
// var session = require('express-session');
// var cookieParser = require('cookie-parser');
// var cors = require('cors');

const app = require('./app');

const { mongoDB } = require('./config');
const mongoose = require('mongoose');
//const Books = require('./Models/BookModel');

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 500,
    bufferMaxEntries: 0
};

mongoose.connect(mongoDB, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
});

const companyProfile = require('./routes/Employer/profile');
const companyReview = require('./routes/Employer/reviews');

//app.use('/glassdoor/company', companyProfile);
app.use('/glassdoor/company/reviews', companyReview);
const images = require('./routes/Student/images')
const studentRouter = require("./routes/Student/student");
const companyRouter = require("./routes/Employer/company");

app.use("/images", images)
app.use("/student", studentRouter);
app.use("/company", companyRouter);

const port = process.env.PORT || 3001;
var server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;



const db = require("./models");
// TODO: Remove force: true and change to sync() in production
// force: true drops table and resyncs db 
db.sequelize.sync({ force: false }).then(() => {
    console.log("Drop and re-sync db.");
});

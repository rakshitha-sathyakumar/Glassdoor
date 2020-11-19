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

const port = process.env.PORT || 3001;
var server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;




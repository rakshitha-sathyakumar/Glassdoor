const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require('../config');
const Company = require('../models/company');
const reviews = require('../models/reviews');
//const Rest = require('../models/restaurant');
const redisClient = require('../redisConfig');

exports.companyProfileService = function (msg, callback) {
    console.log("In SignUp Login Service path:", msg.path);
    switch (msg.path) {
        case "getCompanyDetails":
            getCompanyDetails(msg, callback);
            break;

        case "companyUpdate":
            companyUpdate(msg, callback);
            break;

        case "companyReviews":
            companyReviews(msg, callback);
            break;
    }
};

async function getCompanyDetails(msg, callback) {
    let err = {};
    let response = {};
    console.log("In get company details topic service. Msg: ", msg);
    console.log(msg.body);
    
    await Company.findById(
        { _id: msg.body },
        //{ safe: true, new: true, useFindAndModify: false },
    ).then(comp => {
        console.log("Company exists");
        response.status = 200;
        response.message = "USER_EXISTS";
        response.data = comp
        return callback(null, response);
    })
    .catch(err => {
        console.log(err)
    });
}

async function companyUpdate(msg, callback) {
    let err = {};
    let response = {};
    console.log("In company update topic service. Msg: ", msg);
    console.log(msg.body);
    
    await User.findByIdAndUpdate(
        { _id: msg.userId },
        { $set: msg.body },
        { safe: true, new: true, useFindAndModify: false },
    ).then(user => {
        console.log(user);
        console.log("Company details updated successfully");
        response.status = 200;
        response.message = "COMPANY_UPDATED";
        return callback(null, response);
    })
    .catch(err => {
        console.log(err)
    });
}

async function companyReviews(msg, callback) {
    let err = {};
    let response = {};
    console.log("In company update topic service. Msg: ", msg);
    console.log(msg.body);
    
    redisClient.get("allReviews", function (err, data) {
        if (err) {
            console.log("error")
            response.status = 400;
        }
        // else if (data) {
        //     console.log("fetching from redis cache");
        //     console.log(data);
        //     response.data = (JSON.parse(data));
        //     console.log(response);
        //     return callback( null, response)
        // } 
        else {
            console.log("fetching from mongoDb")
            reviews.find({companyName: msg.body},
                function (err, doc) {
                    if(err || !doc){
                        response.status = 400;
                    } else {
                        //console.log(doc);
                        redisClient.setex("allReviews", 36000, JSON.stringify(doc));
                        //response.status = 200;
                        response.data = doc;
                        //console.log(response)
                        return callback(null, response)
                    }
                })
            }
        })
    }

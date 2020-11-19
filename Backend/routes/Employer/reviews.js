const express = require("express");
const router = express.Router();
const Company = require('../../models/company');
const reviews = require('../../models/reviews');
var kafka = require('../../kafka/client');
//const redisClient = require('../../redisConfig');

router.get('/:companyName', (req, res) => {
    console.log("hi")
    // console.log(req.params.companyName);
    reviews.find({},)
    .then(comp => {
        console.log(comp);
        res.status = 200;
        res.message = "REVIEWS_FETCHED";
        res.send(comp)
    })
    .catch(err => {
        console.log(err)
    });
    }
)

// router.get('/:companyName', (req, res) => {
//     console.log(req.params.companyName)
//   kafka.make_request("companyProfile_topic", { "path": "companyReviews", "body": req.params.companyName }, function (err, results) {
//     console.log(results);
//     console.log("In make request call back", results);
//     if (err) {
//       console.log("Inside err");
//       console.log(err);
//       return res.status(err.status).send(err.message);
//     } else {
//       //console.log("Inside else", results);
//       if (results.status === 200) {
//         return res.status(results.status).send(results.data);
//       } else {
//         return res.status(results.status).send(results.errors);
//       }
//     }
//   })


// })

module.exports=router;
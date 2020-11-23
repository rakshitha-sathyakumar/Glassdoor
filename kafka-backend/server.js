<<<<<<< HEAD
var connection =  new require('./kafka/Connection');
//topics files
//var signin = require('./services/signin.js');
var companyProfileTopic = require('./services/companyProfile_topic');
const mongoose = require('mongoose');
const {mongoDB} = require('./config');
const redisClient = require('./redisConfig');
var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 500,
    bufferMaxEntries: 0
};
//connect to mongoDB
mongoose.connect(mongoDB, options, (err, res) => {
    if (err) {
        console.log(err);
        console.log(`MongoDB Connection Failed`);
    } else {
        console.log(`MongoDB Connected`);
    }
});

function handleTopicRequest(topic_name, fname) {
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        //console.log('message received for ' + topic_name + " ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);

        switch (topic_name) {

            case 'companyProfile_topic':
                fname.companyProfileService(data.data, function (err, res) {
                    response(data, res, producer);
                    return;
                });
                break;

            // case 'restSignUp_topic':
            //     fname.restSignUpService(data.data, function (err, res) {
            //         response(data, res, producer);
            //         return;
            //     });
            //     break;
            
            // case 'events_topic':
            //     fname.eventService(data.data, function(err, res){
            //         response(data, res, producer);
            //         return;
            //     });
            //     break;

            // case 'login_topic':
            //     fname.loginService(data.data, function(err, res){
            //         response(data, res, producer);
            //         return;
            //     });
            //     break;

            // case 'orders_topic':
            //     fname.ordersService(data.data, function (err, res) {
            //         response(data, res, producer);
            //         return;
            //     });
            //     break;

            // case 'messages_topic':
            //     fname.messageService(data.data, function (err, res) {
            //         response(data, res, producer);
            //         return;
            //     });
        }
    });
}

function response(data, res, producer) {
    console.log('after handle', res);
    console.log(res);
    var payloads = [
        {
            topic: data.replyTo,
            messages: JSON.stringify({
                correlationId: data.correlationId,
                data: res
            }),
            partitions: 10
        }
    ];
    producer.send(payloads, function (err, data) {
        console.log('producer send', data);
    });
    return;
}


handleTopicRequest("companyProfile_topic",companyProfileTopic);
=======
var connection = new require("./kafka/connection");

// topic files
var companyProfileTopic = require("./services/companyProfile_topic");
var reviewTopic = require("./services/review_topic");

const mongoose = require("mongoose");
const { mongoDBURI } = require("./config/config");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 1,
  bufferMaxEntries: 0,
};

mongoose.connect(mongoDBURI, options, (err, res) => {
  if (err) {
    console.log(err);
    console.log(`MongoDB Connection Failed`);
  } else {
    console.log(`MongoDB Connected`);
  }
});

function handleTopicRequest(topic_name, fname) {
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running");
  consumer.on("message", function (message) {
    console.log("message received for " + topic_name + " ", fname);
    console.log(JSON.stringify(message.value));
    var data = JSON.parse(message.value);
    switch (topic_name) {
      case "companyProfile_topic":
        fname.companyProfileService(data.data, function (err, res) {
          response(data, res, producer);
          return;
        });
        break;
      case "review_topic":
        fname.reviewService(data.data, function (err, res) {
          response(data, res, producer);
          return;
        });
        break;
    }
  });
}

function response(data, res, producer) {
  console.log("after handle", res);
  var payloads = [
    {
      topic: data.replyTo,
      messages: JSON.stringify({
        correlationId: data.correlationId,
        data: res,
      }),
      partition: 0,
    },
  ];
  producer.send(payloads, function (err, data) {
    console.log("producer send");
  });
  return;
}

// Add your TOPICS here
// first argument is topic name
// second argument is a function that will handle this topic request

handleTopicRequest("companyProfile_topic", companyProfileTopic);
handleTopicRequest("review_topic", reviewTopic);
>>>>>>> 5fc43c0ac0db7c3fec7fa434acb4f42128f4684d

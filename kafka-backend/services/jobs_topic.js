const Jobs = require('../models/jobs');

module.exports.jobsService = function (msg, callback) {
  console.log('In jobs service path', msg.path);
  switch (msg.path) {
    case 'insertJobDetails':
      insertJobDetails(msg, callback);
      break;

    
    case 'getAllCompanyJobs':
      getAllCompanyJobs(msg, callback);
      break;

    case 'getJobsStatistics':
      getJobsStatistics(msg, callback);
      break;
  }
};

async function insertJobDetails(msg, callback) {
  let err = {};
  let response = {};
  console.log('In post job details topic service. Msg: ', msg);
  console.log(msg.body);
  await Jobs.create(msg.body)
    .then((data) => {
      response.status = 200;
      response.message = 'Inserted Successfully';
      response.data = data;
      return callback(null, response);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getAllCompanyJobs(msg, callback) {
  let err = {};
  let response = {};
  console.log('In get job details topic. Msg: ', msg);
  console.log(msg.body);
  await Jobs.find({ companyName: { $regex: msg.body, $options: 'i' } })
    .then((data) => {
      response.status = 200;
      response.data = data;
      return callback(null, response);
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getJobsStatistics(msg, callback) {
  let err = {};
  let response = {};
  let count = {};
  let start = new Date();
  start.setDate(start.getDate() - 365);
  start = start.toLocaleDateString();
  console.log('In get job details topic. Msg: ', msg);
  console.log(msg.body);
  console.log(start);

  
  await Jobs.find({
    companyName: 'Facebook',
    // posted_date: {$elemMatch: { $lt: 11/29/2019 }},
  }).count()
  .then((data) =>
    {
      count.jobsCount = data
    })
  console.log(response);

  await Jobs.aggregate([
    { $match: { companyName: 'Facebook' } },
    { $unwind: '$applied_students' },
    { $unwind: { path: '$applied_students.application_status' } },

    {
      $group: {
        _id: '$applied_students.application_status',
        Frequency: { $sum: 1 },
      },
    },
  ])
  .then((data) =>
    {
      count.selectedCount = data
    })

  // await Jobs.find({
  //     companyName: 'Facebook',
  //     applied_students: { $elemMatch: { application_status: 'Rejected'} },
  //   }).count()
  // .then((data) => {
  //   count.rejectedCount = data;
  // })

  await Jobs.aggregate([
    {
      $match: { companyName: 'Facebook' },
    },
    {
      $group: {
        _id: 'applied_students.$._id',
        applicants: { $sum: 1 },
      },
    },
  ])
  .then((data) => {
    count.applicantCount = data[0].applicants
  })
  .then(() => {
    console.log(count);
    response.status = 200;
    response.data = count;
    return callback(null, response);
  })
  .catch((err) => {
    console.log(err);
  });
}
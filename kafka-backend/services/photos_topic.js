"use strict";
const sqlDB = require('../config/sqlConfig')
const Company = require('../models/company')

exports.companyPhotoServices = function (msg, callback) {
  console.log("In studentResumeServices \n", msg.path);
  switch (msg.path) {
    case "uploadCompanyPhoto":
        uploadCompanyPhoto(msg, callback);
      break;
    case "getCompanyPhotos":
        getCompanyPhotos(msg, callback);
      break;
    case "getStudentPhotos":
      getStudentPhotos(msg, callback);
      break;
  }
};

async function uploadCompanyPhoto(msg, callback){
    let error = {}, response = {}
    console.log("IN COMPANY PHOTOS TOPIC", msg)
    Company.findOneAndUpdate({sql_company_id:msg.companyId}, 
        {
        $push : {'photos': { $each: msg.data
        }}}, (error1, result1) => {
        if(error1){
            error.message = error1
            error.status = 500
            return callback(null, error);
        } else if (result1){
          response.status = 200
          response.message = 'PHOTO_UPLOADED'
          response.data = "CHANGES_SAVED"
          return callback(null, response)
        } else if(!error1 && !result1){
            console.log("OK")
            Company.create({
                sql_company_id: msg.companyId,
                photos: msg.data}, (error2, result2) => {
                if (error2) {
                error.message = error2
                error.status = 500
                return callback(null, error);
                } else if(result2){
                console.log(result2)
                response.status = 200
                response.message = 'PHOTO_UPLOADED'
                response.data = "CHANGES_SAVED"
                return callback(null, response)
                }
              })   
        }
        
    })

}

async function getCompanyPhotos(msg, callback){
  let error = {}, response = {}
  console.log("IN COMPANY PHOTOS TOPIC", msg)
  Company.find({sql_company_id: msg.companyId}, 
    {photos: 1}, (err, result) => {
    if(err){
      error.message = err
      error.status = 500
      return callback(null, error);
    } else if (result) {
      console.log(result)
      response.status = 200
      response.message = 'PHOTO_UPLOADED'
      response.data = result[0].photos
      return callback(null, response)
    }
  })

}

async function getStudentPhotos(msg, callback){
  let error = {}, response = {}
  console.log("IN COMPANY PHOTOS TOPIC", msg)
  Company.find({'photos.sql_student_id': msg.studentId}, 
   (err, result) => {
    if(err){
      error.message = err
      error.status = 500
      return callback(null, error);
    } else if (result) {
      console.log(typeof result)
      let tempArr = [], tempObj = {}; var output = [];
      result.forEach(res => {
        tempObj = {}
        tempObj.photos = res.photos
        tempArr.push(tempObj)
      });
      tempArr.forEach(item => {
        output.push(item.photos)
      })
      let photos_arr_obj = [] 
      for (const key of Object.keys(output)) {
        photos_arr_obj = photos_arr_obj.concat(output[key])
    }
      console.log(photos_arr_obj)
      response.status = 200
      response.message = 'PHOTO_UPLOADED'
      response.data = photos_arr_obj
      return callback(null, response)
    }
  })

}
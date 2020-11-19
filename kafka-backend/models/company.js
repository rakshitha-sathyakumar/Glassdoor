const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var companySchema = new Schema({
    name: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
	street: {type: String, required: true},
	city: {type: String, required: true},
	state: {type: String, required: true},
    website: {type: String, required: true},
    size: {type: String, required: true},
    type: {type: String, required: true},
    revenue: {type: String},
    headquarters: {type: String},
    industry: {type: String},
    founded: {type: String},
    ceoName: {type: String},
    mission: {type: String}
    },

{
    versionKey: false
});

const company = mongoose.model('company', companySchema);
module.exports = company;
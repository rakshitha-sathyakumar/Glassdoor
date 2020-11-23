const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var reviewSchema = new Schema({
    helpful: {type: String, required: true},
    date: {type: String, required: true},
    featured: {type: String, required: true},
	favorite: {type: String, required: true},
	status: {type: String, required: true},
	approvedstatus: {type: String, required: true},
    rating: {type: String, required: true},
    headline: {type: String, required: true},
    description: {type: String, required: true},
    pros: {type: String},
    cons: {type: String},
    ceo_rating: {type: String},
    recommended: {type: String},
    company: {type: String},
    student: {type: String},
    createdAt: {type: String},
    updatedAt: {type: String}
    },

{
    versionKey: false
});

const reviews = mongoose.model('review', reviewSchema);
module.exports = reviews;
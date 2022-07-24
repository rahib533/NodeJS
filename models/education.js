const mongoose = require('mongoose')

const EducationSchema = new mongoose.Schema({
    location: {type: String, required:true},
    degree: {type: String, required:true},
    specality: {type: String, required:true},
    grade: {type: Number, required:true},
    beginDate: {type: Date, required:true},
    endDate: {type:Date}
})

module.exports = mongoose.model('Education', EducationSchema)
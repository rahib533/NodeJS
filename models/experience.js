const mongoose = require('mongoose')

const ExperienceSchema = new mongoose.Schema({
    role: {type: String, required:true},
    location: {type: String, required:true},
    description: {type: String, required:true},
    beginDate: {type: Date, required:true},
    endDate: {type: Date}
})

module.exports = mongoose.model('Experience', ExperienceSchema)
const mongoose = require('mongoose')

const SkillSchema = new mongoose.Schema({
    name: {type: String, required:true},
    className: {type: String, required:true},
    rate: {type: Number, required:true}
})

module.exports = mongoose.model('Skill', SkillSchema)
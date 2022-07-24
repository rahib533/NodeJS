const mongoose = require('mongoose')

const AboutSchema = new mongoose.Schema({
    firstName: {type: String, required:true},
    lastName: {type: String, required:true},
    secondName: {type: String, required:true},
    description: {type: String, required:true},
    photoUrl: {type: String, required:false}
})

module.exports = mongoose.model('About', AboutSchema)
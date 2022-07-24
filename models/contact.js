const mongoose = require('mongoose')

const ContactSchema = new mongoose.Schema({
    facebook: {type: String, required:true},
    linkedin: {type: String, required:true},
    email: {type: String, required:true},
    phone: {type: String, required:true},
    github: {type: String, required:true},
    adress: {type: String, required:true}
})

module.exports = mongoose.model('Contact', ContactSchema)
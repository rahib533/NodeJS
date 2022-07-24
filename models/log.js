const mongoose = require('mongoose')

const LogSchema = new mongoose.Schema({
    userAgent: {type: String, required:false},
    sName: {type: String, required:false},
    date: {type: Date, default: new Date()}
})

module.exports = mongoose.model('Log', LogSchema)
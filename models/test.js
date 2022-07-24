const mongoose = require('mongoose')

const TestSchema = new mongoose.Schema({
    title: {type: String, required:true},
    content: {type: String, required:true}
})

module.exports = mongoose.model('Test', TestSchema)
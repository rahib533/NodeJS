const mongoose = require('mongoose')

const InterestSchema = new mongoose.Schema({
    description: {type: String, required:true}
})

module.exports = mongoose.model('Interest', InterestSchema)
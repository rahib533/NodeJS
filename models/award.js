const mongoose = require('mongoose')

const AwardSchema = new mongoose.Schema({
    description: {type: String, required:true}
})

module.exports = mongoose.model('Award', AwardSchema)
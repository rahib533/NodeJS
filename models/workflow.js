const mongoose = require('mongoose')

const WorkflowSchema = new mongoose.Schema({
    description: {type: String, required:true}
})

module.exports = mongoose.model('Workflow', WorkflowSchema)
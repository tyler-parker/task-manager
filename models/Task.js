const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    projectId: {
        type: Schema.Types.ObjectId,
        ref:  "Project"
    },
    priority: {
        type: String
    },
    status: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Task", taskSchema)
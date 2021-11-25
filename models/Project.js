const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
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
    priority: {
        type: String
    },
    status: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Project', projectSchema)
const mongoose = require('../db/comn')
const { Schema } = mongoose

const Project = mongoose.model('Project',
    new Schema({
        name: {type: String, required: true},
        content: {type: String },
        describe: {type: String},
        user: Object
    },
        { timestamps: true }
    ),
)

module.exports = Project
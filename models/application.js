const { Schema, model } = require('mongoose')

const applicationSchema = new Schema({
    name: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = model('Application', applicationSchema)
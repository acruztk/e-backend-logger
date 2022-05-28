const { Schema, model, SchemaTypes } = require('mongoose')

const logSchema = new Schema({
    application_id: SchemaTypes.ObjectId,
    type: {
        type: String,
        enum: ['error', 'info', 'warning']
    },
    priority: {
        type: String,
        enum: ['lowest', 'low', 'medium', 'high', 'highest']
    },
},{
    timestamps: true
})

module.exports = model('log', logSchema)
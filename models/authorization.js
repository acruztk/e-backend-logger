const { Schema, model, SchemaTypes } = require('mongoose')

const authorizationsSchema = new Schema({
    application_id: SchemaTypes.ObjectId,
    token: {
        type: String
    },
},{
    timestamps: true
})

module.exports = model('authorization', authorizationsSchema)
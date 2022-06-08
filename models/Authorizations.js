const { Schema, model, mongoose } = require('mongoose');

const authorizationsSchema = new Schema({
    application_id:{
        type: Schema.Types.ObjectId,
    },
    token:{
        type: Schema.Types.String,
    },
}, { timestamps: true });

module.exports = model('Authorization', authorizationsSchema);
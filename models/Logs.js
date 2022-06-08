const { Schema, model, mongoose } = require('mongoose');

const LogsSchema = Schema({
    application_id: {
        type: Schema.Types.ObjectId,
    },
    type: {
        type: mongoose.Schema.Types.String,
        enum: ['error', 'info', 'warning']
    },
    priority: {
        type: mongoose.Schema.Types.String,
        enum: ['lowest', 'low', 'medium', 'high', 'highest']
    },
    path: {
        type: mongoose.Schema.Types.String
    },
    message: {
        type: mongoose.Schema.Types.String
    },
    request: {
        type: mongoose.Schema.Types.Mixed
    },
    response: {
        type: mongoose.Schema.Types.Mixed
    }
}, { timestamps: true });

module.exports = model('Log', LogsSchema);


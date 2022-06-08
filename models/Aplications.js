const { Schema, model, mongoose } = require('mongoose');

const aplicationsSchema = new Schema({
    name: mongoose.Schema.Types.String
}, { timestamps: true });

module.exports = mongoose.model('Aplication', aplicationsSchema);
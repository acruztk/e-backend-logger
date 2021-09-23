const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorizationsSchema = new Schema({
  application_id: { type: String, required: true },
  token: { type: String , required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Authorization', AuthorizationsSchema);

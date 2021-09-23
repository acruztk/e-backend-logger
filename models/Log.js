const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LogSchema = new Schema({
  application_id: { type: String, required: true },
  type: { type: String, required: true },
  priority: { type: String, required: true },
  path: { type: String, required: true },
  message: { type: String, required: true },
  request: { type: Object },
  response: { type: Object },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Log', LogSchema);
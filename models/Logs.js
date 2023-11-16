const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const Joi = require('joi');

const schemaLogs = new Schema({
  application_id: mongoose.Schema.Types.ObjectId,
  type: {
    type: String,
    enum: ['error', 'info', 'warning'],
  },
  priority: {
    type: String,
    enum: ['lowest', 'low', 'medium', 'high', 'highest'],
  },
  path: String,
  message: String,
  request: mongoose.Schema.Types.Mixed,
  response: mongoose.Schema.Types.Mixed,
  description: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const schemaLogsJoi = Joi.object({
  application_id: Joi.string().length(24).hex().required(),
  type: Joi.string().valid('error', 'info', 'warning').required(),
  priority: Joi.string()
    .valid('lowest', 'low', 'medium', 'high', 'highest')
    .required(),
  path: Joi.string(),
  message: Joi.string(),
  request: Joi.any(),
  response: Joi.any(),
  description: Joi.string(),
  created_at: Joi.date().default(Date.now),
  updated_at: Joi.date().default(Date.now),
});
const schemaLogsJoiFind = Joi.object({
  id: Joi.string().required(),
});
const schemaLogsJoiUpdate = Joi.object({
  application_id: Joi.string().length(24).hex().required(),
  type: Joi.string().valid('error', 'info', 'warning'),
  priority: Joi.string().valid('lowest', 'low', 'medium', 'high', 'highest'),
  path: Joi.string(),
  message: Joi.string(),
  request: Joi.any(),
  response: Joi.any(),
  description: Joi.string(),
  updated_at: Joi.date().default(Date.now),
});

const logsModel = mongoose.model('logsModel', schemaLogs);

module.exports = {
  logsModel,
  schemaLogsJoi,
  schemaLogsJoiUpdate,
  schemaLogsJoiFind,
};

const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const Joi = require('joi');

const schemaApplications = new Schema({
  name: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const schemaApplicationsJoi = Joi.object({
  name: Joi.string().required(),
  created_at: Joi.date().default(Date.now),
  updated_at: Joi.date().default(Date.now),
});
const schemaApplicationsJoiFind = Joi.object({
  id: Joi.string().required(),
});
const schemaApplicationsJoiUpdate = Joi.object({
  name: Joi.string().required(),
  updated_at: Joi.date().default(Date.now),
});

const applicationsModel = mongoose.model(
  'applicationsModel',
  schemaApplications,
);

module.exports = {
  applicationsModel,
  schemaApplicationsJoi,
  schemaApplicationsJoiFind,
  schemaApplicationsJoiUpdate,
};

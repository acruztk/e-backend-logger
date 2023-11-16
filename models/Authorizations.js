const { Schema } = require('mongoose');
const mongoose = require('mongoose');
const Joi = require('joi');

const schemaAuthorizations = new Schema({
  application_id: mongoose.Schema.Types.ObjectId,
  token: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});
const schemaAuthorizationsJoi = Joi.object({
  application_id: Joi.string().length(24).hex().required(),
  token: Joi.string().required(),
  created_at: Joi.date().default(Date.now),
  updated_at: Joi.date().default(Date.now),
});
const schemaAuthorizationsJoiFind = Joi.object({
  id: Joi.string().required(),
});
const schemaAuthorizationsJoiUpdate = Joi.object({
  application_id: Joi.string().length(24).hex().required(),
  token: Joi.string().required(),
  updated_at: Joi.date().default(Date.now),
});
const schemaAuthorizationsToken = Joi.object({
  token: Joi.string().required(),
  application_id: Joi.string().length(24).hex().required(),
});
const authorizationsModel = mongoose.model(
  'authorizationModel',
  schemaAuthorizations,
);

module.exports = {
  authorizationsModel,
  schemaAuthorizationsJoi,
  schemaAuthorizationsJoiFind,
  schemaAuthorizationsJoiUpdate,
  schemaAuthorizationsToken,
};

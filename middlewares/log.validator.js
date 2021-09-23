const joi = require('joi');
const validateRequest = require('../services/validateRequest');

const validateCreateLog = async (req, res, next) => {
  const schema = joi.object({
    application_id: joi.string().required(),
    type: joi.string().allow('error','info','warning').required(),
    priority: joi.string().allow('lowest','low','medium','high','highest').required(),
    path: joi.string().required(),
    message: joi.string().required(),
    request: joi.object().required(),
    response: joi.object().required()
  });
  await validateRequest(schema, req.body, res, next);
}

const validateUpdateLog = async (req, res, next) => {
  const schema = joi.object({
    application_id: joi.string(),
    type: joi.string().allow('error','info','warning'),
    priority: joi.string().allow('lowest','low','medium','high','highest'),
    path: joi.string(),
    message: joi.string(),
    request: joi.object(),
    response: joi.object()
  });
  await validateRequest(schema, req.body, res, next);
}

module.exports = {
  validateCreateLog,
  validateUpdateLog
}
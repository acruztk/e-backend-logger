const Joi = require('joi')

// eslint-disable-next-line camelcase
const application_id = Joi.string().hex().length(24).required()
const type = Joi.string().valid('error', 'info', 'warning').required()
const priority = Joi.string().valid('lowest', 'low', 'medium', 'high', 'highest').required()
const path = Joi.string().regex(/^\/[a-zA-Z0-9\-_/]+$/).required()
const message = Joi.string().required()
const request = Joi.any()
const response = Joi.any()

const createUpdateLogSchema = Joi.object({
  // eslint-disable-next-line camelcase
  application_id,
  type,
  priority,
  path,
  message,
  request,
  response
}).options({ abortEarly: false })

module.exports = { createUpdateLogSchema }

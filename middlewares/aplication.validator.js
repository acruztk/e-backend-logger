const joi = require('joi');
const validateRequest = require('../services/validateRequest');

module.exports = validateCreateAplication = async (req, res, next) => {
  const schema = joi.object({
    name: joi.string().max(100).required(),
  });
  await validateRequest(schema, req.body, res, next);
}
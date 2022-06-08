const Joi = require('joi');

const schemas = {
    logsPOST: Joi.object().keys({
        application_id: Joi.string().alphanum().required(),
        type: Joi.string().valid('error', 'info', 'warning').required(),
        priority: Joi.string().valid('lowest', 'low', 'medium', 'high', 'highest').required(),
        path: Joi.string().required(),
        message: Joi.string().required(),
        request: Joi.object({ data: Joi.any() }).required(),
        response: Joi.object({ data: Joi.any() }).required(),
    }),
    logsPUT: Joi.object().keys({
        application_id: Joi.string().alphanum().required(),
        type: Joi.string().valid('error', 'info', 'warning').required(),
        priority: Joi.string().valid('lowest', 'low', 'medium', 'high', 'highest').required(),
        path: Joi.string().required(),
        message: Joi.string().required(),
        request: Joi.object({ data: Joi.any() }).required(),
        response: Joi.object({ data: Joi.any() }).required(),
    })
};
module.exports = schemas;
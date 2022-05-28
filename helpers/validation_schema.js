const Joi = require('joi')

const logSchema = Joi.object({
    type: Joi.string().required(),
    priority: Joi.string().required()
})

module.exports = {
    logSchema
}
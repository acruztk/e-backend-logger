const { logSchema } = require('../helpers/validation_schema')

const validateLogSchema = async (req, res, next) => {
    try {
        const result = await logSchema.validateAsync(req.body)
        res.locals.body = result
        next()
    } catch (error) {
        if (error.isJoi == true) error.status = 422
        return res.status(422).json(error)
    }
}


module.exports = {
    validateLogSchema
}

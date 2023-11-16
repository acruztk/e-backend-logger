/**
 * middleware to validate data with Joi schema and return error if any.
 * @param {Object} schema - Joi schema
 * @param {String} property - Property to validate
 */

module.exports = function validateData (schema, property) {
  return (req, res, next) => {
    const data = req[property]
    const { error } = schema.validate(data, { abortEarly: false })
    if (error) {
      const errorMessage = error.details.map(arr => arr.message)
      console.log(errorMessage)
      return res.status(400).json({ error: errorMessage })
    }
    next()
  }
}

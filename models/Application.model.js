const { model } = require('mongoose')
const { applicationSchema } = require('../db/dbSchemas')

const Application = model('Application', applicationSchema)

module.exports = Application

const { model } = require('mongoose')
const { authorizationSchema } = require('../db/dbSchemas')

const Authorization = model('Authorization', authorizationSchema)

module.exports = Authorization

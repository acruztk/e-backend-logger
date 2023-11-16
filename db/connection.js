const mongoose = require('mongoose')
const config = require('../config')

async function connection () {
  await mongoose.connect(config.dbUrl)
}

module.exports = connection

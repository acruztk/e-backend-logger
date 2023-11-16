const { model } = require('mongoose')
const { logSchema } = require('../db/dbSchemas')
/**
 * Creating the Log Model with the logSchema
 */
const LogModel = model('Log', logSchema)

/**
 * Log class with static methods to manipulate the LogModel
 * the class can only bring data from the database if the token corresponds to the application_id
 */

class Log {
  static async getAllLogs ({ appId }) {
    return await LogModel.find({ application_id: appId })
  }

  // eslint-disable-next-line camelcase
  static async createLog ({ application_id, type, priority, path, message, request, response }) {
    // eslint-disable-next-line camelcase
    return await LogModel.create({ application_id, type, priority, path, message, request, response })
  }

  static async getLogById ({ id, appId }) {
    const log = await LogModel.findById(id)
    if (!log) {
      return { message: 'Log not found.' }
    }
    if (log.application_id.toString() !== appId.toString()) {
      return { message: 'Invalid token.' }
    }
    return log
  }

  // eslint-disable-next-line camelcase
  static async updateLogById ({ id, application_id, type, priority, path, message, request, response }) {
    const log = await LogModel.findById(id)
    if (!log) {
      return { message: 'Log not found.' }
    }

    // eslint-disable-next-line camelcase
    await LogModel.findByIdAndUpdate(id, { application_id, type, priority, path, message, request, response })
    return { message: `Log ${id} Updated.` }
  }

  static async deleteLogById ({ id, appId }) {
    const log = await LogModel.findById(id)
    if (!log) {
      return { message: 'Log not found.' }
    }
    console.log(log.application_id)
    console.log(appId)
    if (log.application_id.toString() !== appId.toString()) {
      return { message: 'Invalid token.' }
    }
    await LogModel.findByIdAndDelete(id)
    return { message: `Log ${id} Deleted.` }
  }
}

module.exports = { Log, LogModel }

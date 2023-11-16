const { Log } = require('../models/Log.model')

class LogsController {
  async all (req, res) {
    try {
      const result = await Log.getAllLogs({ appId: req.appId })
      res.json(result).status(200)
    } catch (error) {
      console.error(error)
    }
  }

  async create (req, res, next) {
    try {
      // eslint-disable-next-line camelcase
      const { application_id, type, priority, path, message, request, response } = req.body
      // eslint-disable-next-line camelcase
      const result = await Log.createLog({ application_id, type, priority, path, message, request, response })
      res.json(result).status(201)
    } catch (error) {
      console.error(error)
    }
  }

  async info (req, res, next) {
    try {
      const { id } = req.params
      const result = await Log.getLogById({ id, appId: req.appId })
      res.json(result).status(200)
    } catch (error) {
      next(error)
    }
  }

  async update (req, res, next) {
    try {
      const { id } = req.params
      // eslint-disable-next-line camelcase
      const { application_id, type, priority, path, message, request, response } = req.body
      // eslint-disable-next-line camelcase
      const result = await Log.updateLogById({ id, application_id, type, priority, path, message, request, response })
      res.json(result).status(200)
    } catch (error) {
      next(error)
    }
  }

  async delete (req, res, next) {
    try {
      const { id } = req.params
      const result = await Log.deleteLogById({ id, appId: req.appId })
      res.json(result).status(200)
    } catch (error) {
      next(error)
    }
  }
}

module.exports = new LogsController()

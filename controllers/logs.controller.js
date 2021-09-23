"use strinct";
const Authorization = require("../models/Authorization");
const Application = require("../models/Application");
const Log = require("../models/Log");

class LogsController {
  async all(req, res) {
    try {
      const result = await Log.find();
      if (result.length === 0) {
        return res.json({ message: "Logs not found!", logs: [] });
      }
      return res.json({ message: "Logs found!", result });
    } catch (error) {
      return res.json({
        message: "An error was ocurred!",
        error: error.message,
      });
    }
  }

  async create(req, res) {
    try {
      const { application_id } = req.body;
      const token = req.token;
      const auth = await Authorization.findOne({ application_id }, { token });
      if (!auth) {
        return res.json({
          message: "The token and application id doesn't match!",
        });
      }
      const result = await Log.create(req.body);
      if (!result._id) {
        return res.json({ message: "The log could'nt be created!" });
      }
      return res.json({
        message: "Log created successfully!",
        log: {
          id: result._id,
          type: result.type,
          priority: result.priority,
          path: result.path,
          message: result.message,
        },
      });
    } catch (error) {
      return res.json({
        message: "An error was ocurred!",
        error: error.message,
      });
    }
  }

  async info(req, res) {
    try {
      const logId = req.params.id;
      const token = req.token;
      const logDb = await Log.findOne({ _id: logId });
      if (!logDb) {
        return res.json({
          message: "Log not found!",
        });
      }
      const auth = await checkTokenApplication(token, logDb.application_id);
      if (!auth) {
        return res.json({
          message: "The token and application id doesn't match!",
        });
      }
      return res.json({ message: "Log found!", logDb });
    } catch (error) {
      return res.json({
        message: "An error was ocurred!",
        error: error.message,
      });
    }
  }

  async update(req, res) {
    try {
      const logId = req.params.id;
      const token = req.token;
      const logDb = await Log.findOne({ _id: logId });
      if (!logDb) {
        return res.json({
          message: "Log not found!",
        });
      }
      const auth = await checkTokenApplication(token, logDb.application_id);
      if (!auth) {
        return res.json({
          message: "The token and application id doesn't match!",
        });
      }
      const result = await logDb.updateOne({
        ...req.body,
        updated_at: new Date(),
      });
      if (result.modifiedCount !== 1) {
        return res.json({
          message: "Log doesn't updated!",
        });
      }
      return res.json({
        message: "Log updated successfully!",
      });
    } catch (error) {
      return res.json({
        message: "An error was ocurred!",
        error: error.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const logId = req.params.id;
      const token = req.token;
      const logDb = await Log.findOne({ _id: logId });
      if (!logDb) {
        return res.json({
          message: "Log not found!",
        });
      }
      const auth = await checkTokenApplication(token, logDb.application_id);
      if (!auth) {
        return res.json({
          message: "The token and application id doesn't match!",
        });
      }
      const result = await logDb.delete();
      if (!result._id) {
        return res.json({
          message: "The log couldn't be deleted!",
        });
      }
      return res.json({ message: "Log deleted successfully!", result });
    } catch (error) {
      return res.json({
        message: "An error was ocurred!",
        error: error.message,
      });
    }
  }
}

const checkTokenApplication = async (token, applicationId) => {
  return await Authorization.findOne(
    { application_id: applicationId },
    { token }
  );
};

module.exports = new LogsController();

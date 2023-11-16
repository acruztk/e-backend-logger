'use strinct';
const mongoose = require('mongoose');

const {
  logsModel,
  schemaLogsJoiUpdate,
  schemaLogsJoiFind,
  schemaLogsJoi,
} = require('../models');

class logsCotnroller {
  async all(req, res) {
    const data = await logsModel.find();
    try {
      if (data.length > 0) {
        res.json({
          message: 'Success',
          data,
        });
      } else {
        res.status(400).json({
          message: 'No data',
          data,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: `error: ${error}`,
        data: null,
      });
    }
  }

  async create(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { error, value } = schemaLogsJoi.validate(req.body);
      if (error) {
        await session.abortTransaction();
        res.status(400).json({ message: `error: ${error}` });
      } else {
        const data = await logsModel.create([value], session);
        await session.commitTransaction();
        res.status(201).json({ message: 'created Succesfully', data });
      }
    } catch (error) {
      await session.abortTransaction();
      res.status(500).json({
        message: `error: ${error}`,
        data: null,
      });
    }
  }

  async info(req, res) {
    try {
      const { error, value } = schemaLogsJoiFind.validate(req.params);
      const data = await logsModel.findById(value.id);
      if (error) {
        res.status(500).json({ message: `error: ${error}` });
      } else if (data) {
        res.json({
          message: 'Element found succesfully',
          data,
        });
      } else {
        res.status(404).json({
          message: 'Element not found',
          data,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: `error: ${error}`,
        data: null,
      });
    }
  }

  async update(req, res) {
    try {
      const paramsFind = schemaLogsJoiFind.validate(req.params);
      const bodyParams = schemaLogsJoiUpdate.validate(req.body);

      if (paramsFind.error || bodyParams.error) {
        const error = paramsFind.error ? paramsFind.error : bodyParams.error;

        res.status(400).json({ message: `error: ${error}` });
      } else {
        const data = await logsModel.findOneAndUpdate(
          { _id: paramsFind.value.id },
          bodyParams.value,
          { returnOriginal: false, new: false },
        );
        if (data) {
          res.json({
            message: 'Element updated successfully',
            data,
          });
        } else {
          res.status(404).json({
            message: 'Element not found',
            data,
          });
        }
      }
    } catch (error) {
      res.status(500).json({
        message: `error: ${error}`,
        data: null,
      });
    }
  }

  async delete(req, res) {
    try {
      const paramsFind = schemaLogsJoiFind.validate(req.params);

      if (paramsFind.error) {
        const { error } = paramsFind;

        res.status(400).json({ message: `error: ${error}` });
      } else {
        const data = await logsModel.findOneAndDelete(
          { _id: paramsFind.value.id },
          { returnOriginal: false, new: false },
        );
        if (data) {
          res.status(200).json({
            message: 'Element deleted successfully',
            data,
          });
        } else {
          res.status(404).json({
            message: 'Element not found',
            data,
          });
        }
      }
    } catch (error) {
      res.status(500).json({
        message: `error: ${error}`,
        data: null,
      });
    }
  }
}

module.exports = new logsCotnroller();

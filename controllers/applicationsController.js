'use strinct';
const mongoose = require('mongoose');
const {
  applicationsModel,
  schemaApplicationsJoi,
  schemaApplicationsJoiFind,
  schemaApplicationsJoiUpdate,
} = require('../models');

class applicationsController {
  async all(req, res) {
    const data = await applicationsModel.find();
    try {
      if (data.length > 0) {
        res.json({
          message: 'Success',
          data,
        });
      } else {
        res.status(404).json({
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
      const { error, value } = schemaApplicationsJoi.validate(req.body);
      if (error) {
        await session.abortTransaction();
        res.status(500).json({ message: `error: ${error}` });
      } else {
        const data = await applicationsModel.create([value], session);
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
      const { error, value } = schemaApplicationsJoiFind.validate(req.params);
      const data = await applicationsModel.findById(value.id);
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
      const paramsFind = schemaApplicationsJoiFind.validate(req.params);
      const bodyParams = schemaApplicationsJoiUpdate.validate(req.body);

      if (paramsFind.error || bodyParams.error) {
        const error = paramsFind.error ? paramsFind.error : bodyParams.error;

        res.status(400).json({ message: `error: ${error}` });
      } else {
        const data = await applicationsModel.findOneAndUpdate(
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
      const paramsFind = schemaApplicationsJoiFind.validate(req.params);

      if (paramsFind.error) {
        const { error } = paramsFind;

        res.status(400).json({ message: `error: ${error}` });
      } else {
        const data = await applicationsModel.findOneAndDelete(
          { _id: paramsFind.value.id },
          { returnOriginal: false, new: false },
        );
        if (data) {
          res.json({
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

module.exports = new applicationsController();

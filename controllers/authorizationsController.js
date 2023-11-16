'use strinct';
const mongoose = require('mongoose');
const {
  authorizationsModel,
  schemaAuthorizationsJoi,
  schemaAuthorizationsJoiFind,
  schemaAuthorizationsJoiUpdate,
  schemaAuthorizationsToken,
} = require('../models');

const { generateToken } = require('../utils');

class authorizationsController {
  async all(req, res) {
    try {
      const data = await authorizationsModel.find();
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
      const { error, value } = schemaAuthorizationsJoi.validate(req.body);
      if (error) {
        await session.abortTransaction();
        res.status(500).json({ message: `error: ${error}` });
      } else {
        const data = await authorizationsModel.create([value], session);
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
      const { error, value } = schemaAuthorizationsJoiFind.validate(req.params);
      const data = await authorizationsModel.findById(value.id);
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
      const paramsFind = schemaAuthorizationsJoiFind.validate(req.params);
      const bodyParams = schemaAuthorizationsJoiUpdate.validate(req.body);

      if (paramsFind.error || bodyParams.error) {
        const error = paramsFind.error ? paramsFind.error : bodyParams.error;

        res.status(400).json({ message: `error: ${error}` });
      } else {
        const data = await authorizationsModel.findOneAndUpdate(
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
      const paramsFind = schemaAuthorizationsJoiFind.validate(req.params);

      if (paramsFind.error) {
        const { error } = paramsFind;

        res.status(400).json({ message: `error: ${error}` });
      } else {
        const data = await authorizationsModel.findOneAndDelete(
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

  async createToken(req, res) {
    try {
      const { value, error } = schemaAuthorizationsToken.validate(req.body);
      if (error) {
        res.status(400).json({ message: `error: ${error}` });
      } else {
        const exist = await authorizationsModel.findOne(value);

        if (
          exist.token === value.token &&
          exist.application_id.toString() === value.application_id
        ) {
          const data = generateToken(value);

          res.status(200).json({
            message:
              'token generated succesfully, this token is valid for 2 hours',
            data: exist,
            token: data,
          });
        } else {
          res.status(400).json({ message: 'Incorrect Token' });
        }
      }
    } catch (error) {
      res.status(500).json({ message: `error: ${error}` });
    }
  }
}

module.exports = new authorizationsController();

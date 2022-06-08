'use strinct';
const logsSchema = require('../models/Logs.js');
const aplicationsSchema = require('../models/Aplications.js');
const Joi = require('joi');
const schemas = require('../schemas_joi/schemas.js');

class MainController {

	async all(req, res) {

		logsSchema
			.find()
			.then((data) => res.json(data))
			.catch((error) => req.json({ message: error }));
	}

	async create(req, res, next) {


		const body = req.body;

		const resultValidations = schemas.logsPOST.validate(body);
		if (resultValidations.error) {
			res.json({ message: resultValidations.error });
		}

		const validarApplicationID = await aplicationsSchema.findOne({ _id: body.application_id });
		if (!validarApplicationID) {
			res.json({ message: 'application_id no existe.' });
		}


		logsSchema.create(body)
			.then((data) => {
				res.json({ message: 'Log creado correctamente.', data: data });
			})
			.catch((error) => {
				req.json({ message: error })
			});
	}

	async info(req, res, next) {

		const { id } = req.params;
		const body = req.body;

		logsSchema.findById(id)
			.then((data) => {
				if (data) {
					res.json({ message: 'Log encontrado correctamente.', data: data });
				} else {
					res.json({ message: 'Log no encontrado.' });
				}
			})
			.catch((error) => {
				req.json({ message: error })
			});
	}

	async update(req, res, next) {

		const { id } = req.params;
		const body = req.body;

		const resultValidations = schemas.logsPUT.validate(body);
		if (resultValidations.error) {
			res.json({ message: resultValidations.error });
		}

		const validarApplicationID = await aplicationsSchema.findOne({ _id: body.application_id });
		if (!validarApplicationID) {
			res.json({ message: 'application_id no existe.' });
		}

		logsSchema.findByIdAndUpdate(id, body)
			.then((data) => {
				if (data) {
					res.json({ message: 'Log actualizado correctamente.', data: data });
				} else {
					res.json({ message: 'Log no encontrado.' });
				}
			})
			.catch((error) => {
				req.json({ message: error })
			});

	}

	async delete(req, res, next) {


		const { id } = req.params;
		logsSchema.findByIdAndDelete(id)
			.then((data) => {
				if (data) {
					res.json({ message: 'Log eliminado correctamente.', data: data });
				} else {
					res.json({ message: 'Log no encontrado.' });
				}
			})
			.catch((error) => {
				req.json({ message: error })
			});
	}
}

module.exports = new MainController();

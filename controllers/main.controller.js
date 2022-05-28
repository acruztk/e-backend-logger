'use strinct';
const Log = require('../models/logs')

class MainController {

	async all(req, res) {
		try {
			const logs = await Log.find()

			return res.json(logs)
		} catch (error) {
			console.log(error);
			throw new Error("Error")
		}
	}

	async create(req, res) {
		try {
			const { type, priority } = res.locals.body

			const log = new Log({ type, priority, application_id: res.locals.authorization.application_id })

			await log.save()

			res.json({ message: 'Log creado correctamente', log });
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				msg: "Hubo un errpr al guardad, hable con el administrador"
			})
		}
	}

	async info(req, res, next) {
		const { id } = req.params

		const log = await Log.findById(id)

		if (!log) {
			res.status(404).json({
				msg: "Log no encontrado"
			})
		}

		res.json(log);
	}

	async update(req, res, next) {
		try {
			const { id } = req.params

			const { type, priority } = res.locals.body


			const log = await Log.findById(id)

			if (!log) {
				return res.status(404).json({
					msg: "Log no encontrado"
				})
			}

			await log.update({ type, priority, application_id: res.locals.authorization.application_id })

			res.json({
				msg: "Log actualizado correctamente",
				log
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				msg: "Hubo un errpr al guardad, hable con el administrador"
			})
		}
	}

	async delete(req, res, next) {

		const { id } = req.params

		const log = await Log.findById(id)

		if (!log) {
			return res.status(404).json({
				msg: "Log no encontrado"
			})
		}

		await log.delete()

		res.json({ message: 'Log eliminado correctamente', log });
	}
}

module.exports = new MainController();

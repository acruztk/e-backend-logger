const { Logs, validateLogs } = require("../models/Logs");
const { logsEnums } = require("../helpers/logEnums");

class LogsController {

	async all(req, res) {		
		try {
			const allLogs = await Logs.find({})
			res.json(allLogs)
		} catch (error) {
			res.json(error.message)
		}

	}

	async create(req, res) {
		try {
			const logsBody = req.body 
		console.log(logsBody);
		const { error, value } = validateLogs(logsBody);

		if(error){
			return res.json(error.message)
		}

		const newLog = new Logs(value) 
		
		const logSaved = await newLog.save()
		res.json(logSaved)
		} catch (error) {
			res.json(error)
		}
	}

	async info(req, res) {
		try {
			const id = req.params.id 
		
			const log = await Logs.findById(id)	
			res.json(log)
		} catch (error) {
			res.json(error.message)	
		}
	}

	async update(req, res) {
		try {
			const id = req.params.id;
			const update = req.body
			const logUpdated = await Logs.findByIdAndUpdate(id,update, {new: true});
			return res.json(logUpdated)
		} catch (error) {

			res.json(error.message);
		}
	}

	async delete(req, res) {
		try {
			const id = req.params.id;
			const logDeleted = await Logs.findByIdAndRemove(id);
			res.status(202).json(logDeleted)
		} catch (error) {

			res.json(error.message);
		}	}
}

module.exports = new LogsController();

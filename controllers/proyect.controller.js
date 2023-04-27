const {Aplication,validateApp}  = require('../models/Aplications')

class ProjectController {

	async all(req, res) {
		const Apps = await Aplication.find({})
		res.json(Apps)
	}

	async create(req, res) {
		const appData = req.body 
		const { error, value } = validateApp(appData);

		if(error) return res.json(error.message)

		const app = new Aplication(value) 
		
		const appSaved = await app.save()
		res.json(appSaved)
	}

	async info(req, res) {
		try {
			const id = req.params.id 
		
			const app = await Aplication.findById(id)	
			res.json(app)
		} catch (error) {
			res.json(error.message)	
		}
	}

	async update(req, res) {
		try {
			const id = req.params.id;
			const name = req.body.name
			const appUpdated = await Aplication.findByIdAndUpdate(id,{name}, {new: true});
			return res.json(appUpdated)
		} catch (error) {

			res.json(error.message);
		}
	}

	async delete(req, res) {
		try {
			const id = req.params.id;
			const appDeleted = await Aplication.findByIdAndRemove(id);
			res.status(202).json()
		} catch (error) {

			res.json(error.message);
		}	}
}

module.exports = new ProjectController();

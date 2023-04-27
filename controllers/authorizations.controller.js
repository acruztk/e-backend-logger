const generarId = require("../helpers/generateId");
const { Aplication } = require("../models/Aplications");
const { Authorizations } = require("../models/Authorizations");
var jwt = require('jsonwebtoken');

class AuthorizationController {

	async getToken(req, res) {		
		try {
			console.log('hola');
			const id = req.params.id
			if(!id) return res.json({error: `id is required`})

			const exists = await Aplication.exists({_id: id})
	
			if(!exists){
				return res.json({error:'app id not registed'})
			}	
		


			const authFinded = await Authorizations.findOne({application_id: id})
			if(!authFinded){
				return res.json({error: 'not auth token for this app'})
			}	
			 res.json(authFinded)
		} catch (error) {
			res.json(error)	
		}

	}

	async setToken(req, res) {		
		try {
			console.log('hola');
			const id = req.params.id
			if(!id) return res.json({error: `id is required`})

			const exists = await Aplication.exists({_id: id})

			if(!exists){
				res.json({error:'app id not registed'})
			}	

			const authExist = await Authorizations.exists({application_id: id})
			if(!authExist){
				const toSign = generarId()

			const newAuth = new Authorizations({
				application_id: id,
				token: jwt.sign({token: toSign}, process.env.SECRET )
			})

			await newAuth.save()

			return res.json(newAuth);
			}
			const toSign = generarId()

			const token = jwt.sign({token: toSign}, process.env.SECRET )
			const updatedUser =await Authorizations.findByIdAndUpdate({application_id:id}, {token:token}, {new:true})
			return res.status(201).json(updatedUser)
			
		} catch (error) {
			res.json(error)	
		}

	}

}

module.exports = new AuthorizationController();

const mongoose = require ('mongoose')
const Joi = require('joi');

const aplicationsSchema = new mongoose.Schema({
  name: String
},
{timestamps: true}
)

const Aplication = mongoose.model('Aplications', aplicationsSchema)

function validateApp(user){
  const schema = Joi.object({
    name: Joi.string().required()
  })
  return schema.validate(user)
}

module.exports = {Aplication, validateApp}
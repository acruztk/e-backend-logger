const mongoose = require ('mongoose')
const JoiObjectId = require('joi-objectid');
const Joi = require('joi');

const schema = mongoose.Schema

const authorizationsSchema = new schema({
  application_id: schema.ObjectId,
  token: String
},
{timestamps: true}
)


const Authorizations = mongoose.model('Authorizations', authorizationsSchema)

function validateAuth(auth){
  const schema = Joi.object({
    application_id: JoiObjectId().required(),
    token: Joi.string.required()
  })
  
  return schema.validate(auth)
}

module.exports = {Authorizations, validateAuth}


const mongoose = require ('mongoose')
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi)

const schema = mongoose.Schema

const logsSchema = new schema({
  application_id: schema.ObjectId,
  type: {
    type: String,
    enum: ["error", "info", "warning"],
    required: true
  },
  priority:  {
    type: String,
    enum: ["low", "medium", "high", "highest"],
  },
  path: String,
  message: String,
  request: { },
  reponse: {  }
},
{timestamps: true}
)


const Logs = mongoose.model('Logs', logsSchema)

function validateLogs(log){
  const schema = Joi.object({
    application_id: Joi.objectId().required(), 
    type: Joi.string().required(),
    priority: Joi.string().required(),
    path:  Joi.string().required(),
    message:  Joi.string().required(),
    request:  Joi.object(),
    reponse:  Joi.object()
  })
  
  return schema.validate(log)
}

module.exports = {Logs,validateLogs}


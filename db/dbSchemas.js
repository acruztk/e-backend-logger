const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const type = mongoose.Schema.Types

/**
 * Creating the Log Schema
 */
const logSchema = new Schema({
  application_id: {
    type: type.ObjectId,
    ref: 'Application',
    required: true
  },
  type: {
    type: String,
    enum: ['error', 'info', 'warning'],
    required: true
  },
  priority: {
    type: String,
    enum: ['lowest', 'low', 'medium', 'high', 'highest'],
    required: true
  },
  path: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  request: {
    type: type.Mixed
  },
  response: {
    type: type.Mixed
  }
},
{ timestamps: true }
)

logSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

/**
 * Creating the Application Schema
 */

const applicationSchema = new Schema({
  name: String
},
{ timestamps: true }
)

applicationSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

/**
 * Creating the Authorization Schema
 */

const authorizationSchema = new Schema({
  application_id: mongoose.Types.ObjectId,
  token: String
},
{ timestamps: true }
)

applicationSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
module.exports = { logSchema, applicationSchema, authorizationSchema }

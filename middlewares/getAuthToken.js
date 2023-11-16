const Authorization = require('../models/Authorization.model')

/**
 * Middleware to get the authorization token from the request headers and validate it.
 */

module.exports = async function getAuthToken (req, res, next) {
  // get the token from the request headers
  const authHeader = req.headers.authorization
  // eslint-disable-next-line camelcase
  const application_id = req.body.application_id
  // if there is no token return error message
  if (!authHeader) return res.status(401).send('Access denied. No token provided.')
  const token = authHeader.toString()
  /**
   * if there is a token, validate it and return error message if invalid token or application not exist
   * */

  // eslint-disable-next-line camelcase
  const app = application_id ? await Authorization.find({ application_id }) : await Authorization.find({ token })
  if (!app.length) {
    // eslint-disable-next-line camelcase
    return res.status(400).send(application_id ? 'Application not exist.' : 'Invalid token.')
  }
  /**
   * if there is an application_id in the request body
   * validate if the token corresponds to the application_id
  * */
  // eslint-disable-next-line camelcase
  if (application_id && token !== app[0].token) {
    return res.status(400).send('Invalid token.')
  }
  req.appId = app[0].application_id
  next()
}

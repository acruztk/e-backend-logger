const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const authorization = req.get('authorization')

  let token = ''

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }
  console.log(authorization)

  let decodedToken = {}

  decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.token) {
    return res.status(400).json({ error: 'token is missing or invalid' })
  }
  const { token:authToken } = decodedToken
  req.token = authToken
  next()
}
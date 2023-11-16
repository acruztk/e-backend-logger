require('dotenv').config();
const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

const generateToken = (token) =>
  jwt.sign(token, secretKey, { expiresIn: '2h' });

const checkToken = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ message: 'Incorrect Token' });
  }

  const [schena, token] = authorizationHeader.split(' ');

  if (schena !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Invalid authorization schema' });
  }

  jwt.verify(token, secretKey, (error, decoded) => {
    if (error) {
      return res.status(401).json({ message: 'Invalid Token' });
    }

    req.usuario = decoded;
    next();
  });
};

module.exports = {
  generateToken,
  checkToken,
};

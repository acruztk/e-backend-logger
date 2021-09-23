const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = authValidate = (req, res, next) => {
  const token = req.get('Authorization');
  jwt.verify(`${token}`, process.env.JWT_SECRET, (error) => {
    if (error){
      return res.json({message: 'Access Denied!'});
    }
    req.token = token;
    next();
  });
}
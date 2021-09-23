const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (payload) => {
  const { _id, name } = payload;
  return jwt.sign({
    id: _id,
    name
  },
  process.env.JWT_SECRET,
  { expiresIn: '14 days' });
}
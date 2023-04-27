const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config()
require('./mongo')

const app = express();
const PORT = process.env.PORT || 3000
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/api', (req, res) => res.json({api: 'ok'}))

app.use('/api', require('./routes/logs.routes'));
app.use('/api', require('./routes/project.routes'));


app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT} 🚀`);
  
})
module.exports = app;

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config()
const { dbConnection  } = require('./database/config')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', require('./routes/main.routes'));

app.listen(process.env.PORT || 3000, async () => {
    console.log("Servidor corriendo");
    dbConnection()
})

module.exports = app;

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./database.js');

const app = express();
app.set('port', process.env.PORT || 4000);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', require('./routes/main.routes'));

app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
});

module.exports = app;

'use strict';

const express = require('express');
const app = express();

app.use( '/', require('./logs.routes') );
app.use( '/', require('./aplications.routes') );
app.use( '/', require('./authorization.routes') );

module.exports = app;
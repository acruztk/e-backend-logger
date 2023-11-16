const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dbConfig = require('./utils/databaseConfig');
const routeMain = require('./routes/main.routes');

const app = express();

dbConfig.on(
  'error',
  // eslint-disable-next-line no-console
  console.error.bind(console, 'Error de conexión a la base de datos:'),
);
dbConfig.once('open', () => {
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));

  app.use('/api', routeMain);
});

module.exports = app;

require('dotenv').config();
const mongoose = require('mongoose');

const connectionClient = (env) => {
  let uri = 'mongodb://localhost/logsApplications';
  switch (env) {
    case 'LOCAL':
      uri = 'mongodb://0.0.0.0/logsApplications';
      break;

    case 'PRODUCTION':
      uri =
        'mongodb+srv://master:password54321@databaselogs.rox8wex.mongodb.net/?retryWrites=true&w=majority';
      break;

    case 'DEV':
      uri =
        'mongodb+srv://master:password54321@databaselogs.rox8wex.mongodb.net/?retryWrites=true&w=majority';
      break;

    default:
      uri = 'mongodb://0.0.0.0/logsApplications';
      break;
  }

  return uri;
};
mongoose.connect(connectionClient(process.env.ENVIROMENT || 'LOCAL'), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dbConfig = mongoose.connection;

module.exports = dbConfig;

const {
  applicationsModel,
  schemaApplicationsJoi,
  schemaApplicationsJoiFind,
  schemaApplicationsJoiUpdate,
} = require('./Applications');
const {
  authorizationsModel,
  schemaAuthorizationsJoi,
  schemaAuthorizationsJoiFind,
  schemaAuthorizationsJoiUpdate,
  schemaAuthorizationsToken,
} = require('./Authorizations');
const {
  logsModel,
  schemaLogsJoi,
  schemaLogsJoiUpdate,
  schemaLogsJoiFind,
} = require('./Logs');

module.exports = {
  applicationsModel,
  authorizationsModel,
  logsModel,
  schemaApplicationsJoiFind,
  schemaApplicationsJoiUpdate,
  schemaLogsJoiUpdate,
  schemaLogsJoiFind,
  schemaApplicationsJoi,
  schemaAuthorizationsJoi,
  schemaLogsJoi,
  schemaAuthorizationsJoiFind,
  schemaAuthorizationsJoiUpdate,
  schemaAuthorizationsToken,
};

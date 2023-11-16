'use strict';
const router = require('express').Router();
const {
  applicationsController,
  logsController,
  authorizationsController,
} = require('../controllers');
const { checkToken } = require('../utils');

const prefix = 'logs';
const app = 'application';
const log = 'log';
const auth = 'authorization';

router.get(`/${prefix}/${app}`, checkToken, applicationsController.all);
router.post(`/${prefix}/${app}`, applicationsController.create);
router.get(`/${prefix}/${app}/:id`, checkToken, applicationsController.info);
router.put(`/${prefix}/${app}/:id`, checkToken, applicationsController.update);
router.delete(
  `/${prefix}/${app}/:id`,
  checkToken,
  applicationsController.delete,
);

router.get(`/${prefix}/${log}`, checkToken, logsController.all);
router.post(`/${prefix}/${log}`, checkToken, logsController.create);
router.get(`/${prefix}/${log}/:id`, checkToken, logsController.info);
router.put(`/${prefix}/${log}/:id`, checkToken, logsController.update);
router.delete(`/${prefix}/${log}/:id`, checkToken, logsController.delete);

router.get(`/${prefix}/${auth}`, checkToken, authorizationsController.all);
router.post(`/${prefix}/${auth}`, authorizationsController.create);
router.get(`/${prefix}/${auth}/:id`, checkToken, authorizationsController.info);
router.put(
  `/${prefix}/${auth}/:id`,
  checkToken,
  authorizationsController.update,
);
router.delete(
  `/${prefix}/${auth}/:id`,
  checkToken,
  authorizationsController.delete,
);

router.post(
  `/${prefix}/${auth}/generateToken`,
  authorizationsController.createToken,
);

module.exports = router;

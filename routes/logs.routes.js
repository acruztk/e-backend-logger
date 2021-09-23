'use strict';

const router = require('express').Router();
const prefix = 'logs';

const authValidate = require('../middlewares/jwt.validator');
const { validateCreateLog, validateUpdateLog } = require('../middlewares/log.validator');
const controller = require('../controllers/logs.controller');

router.get(`/${prefix}`, authValidate, controller.all);
router.post(`/${prefix}`, authValidate, validateCreateLog, controller.create);
router.get(`/${prefix}/:id`, authValidate, controller.info);
router.put(`/${prefix}/:id`, authValidate, validateUpdateLog, controller.update);
router.delete(`/${prefix}/:id`, authValidate, controller.delete);

module.exports = router;
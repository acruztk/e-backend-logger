'use strict';

const router = require('express').Router();
const prefix = '/logs';

const controller = require('../controllers/main.controller');
const { validateToken } = require('../middlewares/validateToken');
const { validateLogSchema } = require('../middlewares/validateLogSchema')

router.get(`${prefix}/`, validateToken, controller.all);
router.post(`${prefix}/`, [validateToken, validateLogSchema], controller.create);
router.get(`${prefix}/:id`, [validateToken, validateLogSchema], controller.info);
router.put(`${prefix}/:id`, validateToken, controller.update);
router.delete(`${prefix}/:id`, validateToken, controller.delete);

module.exports = router;
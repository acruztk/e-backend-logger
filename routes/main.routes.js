'use strict';

const router = require('express').Router();
const prefix = '/logs';
const isValidAuthorization = require('../middlewares/validateAuthorization.js');

const controller = require('../controllers/main.controller');

router.get(`${prefix}/`, isValidAuthorization, controller.all);

router.post(`${prefix}/`, isValidAuthorization, controller.create);

router.get(`${prefix}/:id`, isValidAuthorization, controller.info);

router.put(`${prefix}/:id`, isValidAuthorization, controller.update);

router.delete(`${prefix}/:id`, isValidAuthorization, controller.delete);

module.exports = router;
'use strict';

const router = require('express').Router();
const prefix = 'auth';
const validateCreateToken = require('../middlewares/authorization.validator');

const controller = require('../controllers/authorization.controller');

router.post(`/${prefix}`, validateCreateToken ,controller.create );

module.exports = router;
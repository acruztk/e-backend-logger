const router = require('express').Router()
const prefix = 'logs'

const controller = require('../controllers/log.controller')
const getAuthToken = require('../middlewares/getAuthToken')
const validateData = require('../middlewares/validateData')
const { createUpdateLogSchema } = require('../schemas/logs.schema')

router.get(
    `/${prefix}`,
    getAuthToken,
    controller.all)
router.post(
    `/${prefix}`,
    validateData(createUpdateLogSchema, 'body'),
    getAuthToken,
    controller.create)
router.get(
    `/${prefix}/:id`,
    getAuthToken,
    controller.info)
router.put(
    `/${prefix}/:id`,
    getAuthToken,
    controller.update)
router.delete(
    `/${prefix}/:id`,
    getAuthToken,
    controller.delete)

module.exports = router


const router = require('express').Router();
const authExtractor = require('../middleware/authExtractor')

const prefix = 'logs';

const controller = require('../controllers/logs.controller');

router.get(`/${prefix}/`, authExtractor ,controller.all);
router.post(`/${prefix}/`, authExtractor,controller.create);
router.get(`/${prefix}/:id`,authExtractor, controller.info);
router.put(`/${prefix}/:id`,authExtractor, controller.update);
router.delete(`/${prefix}/:id`,authExtractor, controller.delete);

module.exports = router;
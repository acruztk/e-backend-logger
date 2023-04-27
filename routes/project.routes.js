const router = require('express').Router();
const prefix = 'project';

const controller = require('../controllers/proyect.controller');
const authController = require('../controllers/authorizations.controller');

router.post(`/auth/:id`, authController.setToken);
router.get(`/auth/:id`, authController.getToken);
router.get(`/${prefix}`, controller.all);
router.post(`/${prefix}/`, controller.create);
router.get(`/${prefix}/:id`, controller.info);
router.put(`/${prefix}/:id`, controller.update);
router.delete(`/${prefix}/:id`, controller.delete);

module.exports = router;
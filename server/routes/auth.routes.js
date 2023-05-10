const router = require('express').Router();
const authController = require('../controllers/auth.controller');

router.post('/register', authController.register);

router.post('/login', authController.login);

router.post('/update-password', authController.updatePassword);

module.exports = router;

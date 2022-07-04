const express = require('express');
const LoginController = require('../controller/loginController');
const router = express.Router();
//Get
router.get('/', LoginController.login);
router.get('/registrar', LoginController.registrar);
router.post('/auth', LoginController.auth);
//post
router.post('/register', LoginController.regUser);
//Put
router.get('/logout', LoginController.logout);
//Delete
module.exports = router;


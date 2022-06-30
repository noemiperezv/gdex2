const express = require('express');
const LoginController = require('../controller/loginController');
const router = express.Router();
const validator = require("../config/validator");
//Get
router.get('/', LoginController.login);
router.get('/registrar', LoginController.registrar);
router.post('/', validator.login, LoginController.auth);
//post
router.post('/registrar', validator.register,LoginController.regUser);
//Put

//Delete
module.exports = router;


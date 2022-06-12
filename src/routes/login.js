const express = require('express');
const LoginController = require('../controller/loginController');
const router = express.Router();

router.get('/', LoginController.login);
router.get('/datos', LoginController.consulta);

module.exports = router;


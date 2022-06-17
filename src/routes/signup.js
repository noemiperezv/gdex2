const express = require('express');
const SignupController = require('../controller/signupController');
const router = express.Router();

router.get('/', SignupController.signup);
router.get('/datos', SignupController.consulta);

module.exports = router;
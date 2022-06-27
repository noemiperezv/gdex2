const express = require('express');
const IndexController = require('../controller/indexController');
const router = express.Router();

router.get('/', IndexController.index);
router.get('/miscursos', IndexController.misCursos);
router.get('/aprendiendo', IndexController.aprendiendo);

module.exports = router;

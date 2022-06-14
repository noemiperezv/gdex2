const express = require('express');
const IndexController = require('../controller/indexController');
const router = express.Router();

router.get('/', IndexController.index);

module.exports = router;

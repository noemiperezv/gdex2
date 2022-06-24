const express = require('express');
const inicioController = require('../controller/inicioController');
const router = express.Router();

router.get('/', inicioController.inicio);
router.get('/seguirCurso', inicioController.seguirCurso);
router.get('/misCursos', inicioController.misCursos);
router.get('/datosCurso', inicioController.datosCurso);


module.exports = router;
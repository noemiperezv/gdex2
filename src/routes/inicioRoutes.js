const express = require('express');
const inicioController = require('../controller/inicioController');
const router = express.Router();

router.get('/', inicioController.verifytoken ,inicioController.inicio);
router.get('/misCursos', inicioController.misCursos);
router.get('/aprendiendo', inicioController.aprendiendo);
router.get('/verCurso', inicioController.verCurso);
router.get('/seguirCurso', inicioController.seguirCurso);
router.get('/usuarios', inicioController.listarUsuarios);

module.exports = router;
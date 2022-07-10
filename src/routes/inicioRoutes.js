const express = require('express');
const inicioController = require('../controller/inicioController');
const router = express.Router();

router.get('/', inicioController.verifytoken ,inicioController.inicio);
router.get('/misCursos', inicioController.verifytoken, inicioController.misCursos);
router.get('/aprendiendo', inicioController.verifytoken, inicioController.aprendiendo);
router.get('/verCurso', inicioController.verifytoken, inicioController.verCurso);
router.get('/seguirCurso', inicioController.verifytoken, inicioController.seguirCurso);
router.get('/usuarios/:id', inicioController.verifytoken,inicioController.listarUsuarios);
router.get('/editarUsuario/:id', inicioController.verifytoken, inicioController.mostrarUsuario);
router.post('/editarUsuario', inicioController.verifytoken, inicioController.editarUsuario);
router.get('/eliminarUsuario/:id', inicioController.verifytoken, inicioController.eliminarUsuario);

module.exports = router;
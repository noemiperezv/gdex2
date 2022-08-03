const express = require('express');
const usuarioController = require('../controller/usuarioController');
const router = express.Router();

router.get('/editarPerfil/:id', usuarioController.verifytoken, usuarioController.editarPerfil);
router.post('/modificarUsuario', usuarioController.verifytoken, usuarioController.modificarUsuario);
router.get('/cambiarPassword/:id', usuarioController.verifytoken, usuarioController.cambiarPassword);
router.post('/modificarPassword', usuarioController.verifytoken, usuarioController.modificarPassword);

module.exports = router;
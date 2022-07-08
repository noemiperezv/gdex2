const express = require('express');
const usuarioController = require('../controller/usuarioController');
const router = express.Router();

router.get('/editarPerfil/:id', usuarioController.editarPerfil);
router.post('/modificarUsuario', usuarioController.modificarUsuario);
router.get('/cambiarPassword/:id', usuarioController.cambiarPassword);
router.post('/modificarPassword', usuarioController.modificarPassword);

module.exports = router;
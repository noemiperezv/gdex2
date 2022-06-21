const express = require('express');
const cursoController = require('../controller/cursoController');
const router = express.Router();

router.get('/', cursoController.crearCurso);
router.get('/misCursosC', cursoController.misCursosCreados);
router.get('/editarTema', cursoController.editarTema);
router.get('/editarCurso', cursoController.editarCurso);


module.exports = router;
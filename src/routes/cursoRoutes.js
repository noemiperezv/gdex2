const express = require('express');
const cursoController = require('../controller/cursoController');
const router = express.Router();

router.get('/', cursoController.crearCurso);
router.get('/misCursos', cursoController.misCursos);
router.get('/editarTema', cursoController.editarTema);
router.get('/editarCurso', cursoController.editarCurso);


module.exports = router;
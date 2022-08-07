const express = require('express');
const inicioController = require('../controller/inicioController');
const router = express.Router();

router.get('/', inicioController.verifytoken ,inicioController.inicio);
router.get('/misCursos', inicioController.verifytoken, inicioController.misCursos);
router.get('/aprendiendo', inicioController.verifytoken, inicioController.aprendiendo);
router.get('/verCurso/:id', inicioController.verifytoken, inicioController.verCurso);
router.get('/seguirCurso/:id/:idTema', inicioController.verifytoken, inicioController.seguirCurso);
router.get('/usuarios/:id', inicioController.verifytoken,inicioController.listarUsuarios);
router.get('/editarUsuario/:id', inicioController.verifytoken, inicioController.mostrarUsuario);
router.post('/editarUsuario', inicioController.verifytoken, inicioController.editarUsuario);
router.get('/eliminarUsuario/:id', inicioController.verifytoken, inicioController.eliminarUsuario);
router.post('/asignarCurso', inicioController.verifytoken, inicioController.asignarCurso);
router.get('/updateTemaAvance/:estado/:id/:idCurso', inicioController.verifytoken, inicioController.updateTemaAvance);
router.get('/cargarComentarios/:idCurso/:idTema', inicioController.verifytoken, inicioController.cargarComentarios);
router.get('/cargarComentariosRespuestas/:idCurso/:idTema', inicioController.verifytoken, inicioController.cargarComentariosRespuestas);
router.get('/insertarComentario/:idTema/:idusuario/:comentario', inicioController.verifytoken, inicioController.insertarComentario);
router.get('/eliminarCurso/:id', inicioController.verifytoken, inicioController.eliminarCurso);


router.get('/insertarComentarioRespuesta/:idcomentario/:idusuario/:comentario', inicioController.verifytoken, inicioController.insertarComentarioRespuesta);



module.exports = router;

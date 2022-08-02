const express = require('express');
const cursoController = require('../controller/cursoController');
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './src/views/public/uploads/img/')
    },
    filename: (req, file, cb)=>{
        const ext = file.originalname.split('.').pop();
        cb(null, `${Date.now()}.${ext}`);
    }
});
const upload = multer({storage});

router.get('/', cursoController.crearCurso);
router.get('/misCursos', cursoController.misCursos);
router.post('/editarTema', cursoController.editarTema);
router.get('/editarCurso', cursoController.editarCurso);
router.post('/upload', upload.single('imagen'),cursoController.upload);
router.post('/modificarCurso', upload.single('imagen'),cursoController.modificarCurso);
router.post('/agregarSeccion', cursoController.agregarSeccion);
router.post('/filtrarTemas', cursoController.filtrarTemas);
router.post('/agregarTema', cursoController.agregarTema);
router.post('/eliminarSeccion', cursoController.eliminarSeccion);
router.get('/borrarSeccion/:id', cursoController.borrarSeccion);
router.post('/eliminarTema', cursoController.eliminarTema);
router.get('/borrarTema/:id', cursoController.borrarTema);
router.post('/modificarTema', cursoController.modificarTema);
router.post('/agregarMaterial', upload.single('archivo'),cursoController.agregarMaterial);
router.post('/eliminarMaterial', cursoController.eliminarMaterial);
router.get('/borrarMaterial/:id', cursoController.borrarMaterial);
router.post('/agregarTeoria', cursoController.agregarTeoria);
module.exports = router;
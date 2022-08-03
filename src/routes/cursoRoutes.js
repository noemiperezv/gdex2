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

router.get('/', cursoController.verifytoken, cursoController.crearCurso);
router.post('/editarTema', cursoController.verifytoken, cursoController.editarTema);
router.get('/editarCurso', cursoController.verifytoken, cursoController.editarCurso);
router.post('/upload', cursoController.verifytoken, upload.single('imagen'),cursoController.upload);
router.post('/modificarCurso', cursoController.verifytoken, upload.single('imagen'),cursoController.modificarCurso);
router.post('/agregarSeccion', cursoController.verifytoken, cursoController.agregarSeccion);
router.post('/filtrarTemas', cursoController.verifytoken, cursoController.filtrarTemas);
router.post('/agregarTema', cursoController.verifytoken, cursoController.agregarTema);
router.post('/eliminarSeccion', cursoController.verifytoken, cursoController.eliminarSeccion);
router.get('/borrarSeccion/:id', cursoController.verifytoken, cursoController.borrarSeccion);
router.post('/eliminarTema', cursoController.verifytoken, cursoController.eliminarTema);
router.get('/borrarTema/:id', cursoController.verifytoken, cursoController.borrarTema);
router.post('/modificarTema', cursoController.verifytoken, cursoController.modificarTema);
router.post('/agregarMaterial', cursoController.verifytoken, upload.single('archivo'),cursoController.agregarMaterial);
router.post('/eliminarMaterial', cursoController.verifytoken, cursoController.eliminarMaterial);
router.get('/borrarMaterial/:id', cursoController.verifytoken, cursoController.borrarMaterial);
router.post('/agregarTeoria', cursoController.verifytoken, cursoController.agregarTeoria);
module.exports = router;
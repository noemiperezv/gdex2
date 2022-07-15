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
router.get('/editarTema', cursoController.editarTema);
router.get('/editarCurso', cursoController.editarCurso);
router.post('/upload', upload.single('imagen'),cursoController.upload);
module.exports = router;
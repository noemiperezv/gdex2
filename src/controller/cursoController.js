const express = require('express');
const cors = require('cors');
const sharp = require('sharp');
const app= express();
const Swal = require('sweetalert2')
const jwt = require("jsonwebtoken");
const { promisify } = require('util')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

function crearCurso(req, res) {
    res.render("curso/crearCurso");
}
function editarCurso(req, res) {
    res.render("curso/editarCurso");
}
function editarTema(req, res) {
    res.render("curso/editarTema");
}


function upload(req, res) {
    var nombreImagen = "";
    
     if(req.file != null || require.file != undefined) {
        nombreImagen = req.file.filename;
     }
    
    req.getConnection((err, conn) => {
        conn.query(`INSERT INTO tblcurso (nombre, descripcion, estatus, fechaRegistro, cantidadUsuarios, rutaImagen,cveUsuario) 
        values ('${req.body.nameCurso}', '${req.body.descripcion}', 1, CURDATE(), 0, '${nombreImagen}',6 )`, (err2, rows) => {
            usuario = req.session.cveUsuario;
                console.log(usuario);
                res.render('curso/crearCurso',{alert:true, sesion: req.session});

        });
    });
    console.log(req.session.cveUsuario);
}

module.exports = {
    crearCurso,
    editarTema,
    editarCurso,
    upload
}
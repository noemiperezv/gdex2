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

async function verifytoken(req, res, next) {

    if (req.cookies.jwt) {
        const decodificada = await promisify(jwt.verify)(req.cookies.jwt, 'secretkey')
        console.log(decodificada)

        req.token = decodificada;
        console.log(req.token.user)
        //req.user = results[0];
        next();
    } else {
        res.redirect('/')
    }
}

function crearCurso(req, res) {
    res.render("curso/crearCurso", {sesion: req.token.user});
}
function editarCurso(req, res) {
    res.render("curso/editarCurso", {sesion: req.token.user});
}
function editarTema(req, res) {
    res.render("curso/editarTema", {sesion: req.token.user});
}


function upload(req, res) {
    var nombreImagen = "";
    
     if(req.file != null || require.file != undefined) {
        nombreImagen = req.file.filename;
     }
    
    req.getConnection((err, conn) => {
        conn.query(`INSERT INTO tblcurso (nombre, descripcion, estatus, fechaRegistro, cantidadUsuarios, rutaImagen,cveUsuario) 
        values ('${req.body.nameCurso}', '${req.body.descripcion}', 1, CURDATE(), 0, '${nombreImagen}',6 )`, (err2, rows) => {
            usuario = req.token.user.cveUsuario;
                console.log(usuario);
                res.render('curso/crearCurso',{alert:true, sesion: req.token.user});

        });
    });
    console.log(req.token.user.cveUsuario);
}

module.exports = {
    crearCurso,
    editarTema,
    editarCurso,
    upload,
    verifytoken,
    //eliminarCurso
}
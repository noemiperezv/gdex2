const express = require('express');
const cors = require('cors');
const sharp = require('sharp');
const app= express();


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
function misCursos(req, res) {
    req.getConnection((err, conn) => {
        conn.query('SELECT c.nombre, c.descripcion, c.estatus, date_format(c.fechaRegistro, "%d-%m-%Y") AS fecha, c.rutaImagen FROM tblcurso c JOIN tblusuario u ON u.cveUsuario = c.cveUsuario WHERE u.cveUsuario = 1', (err, miscursosdata) => {
            if(err){
                res.render(err)
            }else{
                res.render("curso/miscursos", {miscursos: miscursosdata})
            }
   
        });
    });
  
}

function upload(req, res) {
    const helperImage = (filePath, fileName, size = 300) => {
        return sharp(filePath)
        .resize(size)
        .toFile(`./src/views/public/optimize/${fileName}.png`)
     }
    helperImage(req.file.path,`resize-${req.file.filename}`, 100)
    
    req.getConnection((err, conn) => {
        conn.query(`INSERT INTO tblcurso (nombre, descripcion, estatus, fechaRegistro, cantidadUsuarios, rutaImagen,cveUsuario) values ('
        ${req.body.nameCurso}', '${req.body.descripcion}', 1, CURDATE(), 0, '${req.file.filename}',${req.session.cveUsuario} )`, (err2, rows) => {
            usuario = req.session.cveUsuario;
                console.log(usuario);
                res.redirect('/inicio/misCursos');

        });
    });
    //res.send(req.body.nameCurso);
    console.log(req.session.cveUsuario);
}

module.exports = {
    crearCurso,
    misCursos,
    editarTema,
    editarCurso,
    upload
}
const jwt = require("jsonwebtoken");
const { promisify } = require('util')

function inicio(req, res) {
    req.getConnection((err, conn) => {
        conn.query('SELECT c.nombre, c.descripcion, c.estatus, date_format(c.fechaRegistro, "%d-%m-%Y") AS fecha, c.rutaImagen, concat_ws(" ", u.nombre, u.apellidos) AS nombreCompleto FROM tblcurso c JOIN tblusuario u ON u.cveUsuario = c.cveUsuario', (err, cursosdata) => {
            if (err) {
                res.render(err)
            } else {
                res.render("inicio/inicio", { cursos: cursosdata, sesion: req.token.user })
            }

        });
    });
}

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

function misCursos(req, res) {
    req.getConnection((err, conn) => {
        conn.query('SELECT c.nombre, c.descripcion, c.estatus, date_format(c.fechaRegistro, "%d-%m-%Y") AS fecha, c.rutaImagen FROM tblcurso c JOIN tblusuario u ON u.cveUsuario = c.cveUsuario WHERE u.cveUsuario = ?', [req.session.cveUsuario], (err, miscursosdata) => {
            if (err) {
                res.render(err)
            } else {
                res.render("inicio/misCursos", { miscursos: miscursosdata, sesion: req.session })
            }

        });
    });
}

function aprendiendo(req, res) {
    req.getConnection((err, conn) => {
        conn.query('SELECT c.nombre, ec.avanceCurso, c.descripcion, c.estatus, date_format(c.fechaRegistro, "%d-%m-%Y") AS fecha, c.rutaImagen, concat_ws(" ", u.nombre, u.apellidos) AS nombreCompleto FROM tblcurso c JOIN tblestudiantecurso ec ON ec.cveCurso = c.cveCurso JOIN tblusuario u ON u.cveUsuario = ec.cveUsuario WHERE (ec.avanceCurso < 100 or ec.avanceCurso >= 0) and u.cveUsuario = ?', [req.session.cveUsuario], (err, aprendiendodata) => {
            conn.query('SELECT c.nombre, ec.avanceCurso, c.descripcion, c.estatus, date_format(c.fechaRegistro, "%d-%m-%Y") AS fecha, c.rutaImagen, concat_ws(" ", u.nombre, u.apellidos) AS nombreCompleto FROM tblcurso c JOIN tblestudiantecurso ec ON ec.cveCurso = c.cveCurso JOIN tblusuario u ON u.cveUsuario = ec.cveUsuario WHERE ec.avanceCurso = 100 and u.cveUsuario = ?', [req.session.cveUsuario], (err, terminadosdata) => {
                if (err) {
                    res.render(err)
                } else {
                    res.render("inicio/aprendiendo", { aprendiendo: aprendiendodata, terminados: terminadosdata, sesion: req.session })
                }

            });
        });
    });
}


function verCurso(req, res) {
    res.render("inicio/verCurso");
}

function seguirCurso(req, res) {
    res.render("inicio/seguirCurso");
}


function listarUsuarios(req, res) {
    req.getConnection((err, conn) => {
        conn.query('SELECT cveUsuario, concat_ws(" ", nombre, apellidos) AS nombreCompleto, email, date_format(fechaRegistro, "%d-%m-%Y") AS fechaIngreso, CASE WHEN cveRol = 1 THEN "Instructor" WHEN cveRol = 2 THEN "Estudiante" ELSE "Admin" END as rol FROM tblusuario', (err, usuariosdata) => {
            if (err) {
                res.render(err)
            } else {
                res.render("inicio/usuarios", { sesion: req.session, usuarios: usuariosdata });
            }

        });
    });

}



module.exports = {

    inicio,
    misCursos,
    aprendiendo,
    verCurso,
    seguirCurso,
    listarUsuarios,
    verifytoken

}
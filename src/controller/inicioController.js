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
        conn.query('SELECT c.cveCurso, c.nombre, c.descripcion, c.estatus, date_format(c.fechaRegistro, "%d-%m-%Y") AS fecha, c.rutaImagen FROM tblcurso c JOIN tblusuario u ON u.cveUsuario = c.cveUsuario WHERE u.cveUsuario = ?', [req.token.user.cveUsuario], (err, miscursosdata) => {
            if (err) {
                res.render(err)
            } else {
                res.render("inicio/misCursos", { miscursos: miscursosdata, sesion: req.token.user })
            }

        });
    });
}

function aprendiendo(req, res) {
    req.getConnection((err, conn) => {
        conn.query('SELECT c.nombre, ec.avanceCurso, c.descripcion, c.estatus, date_format(c.fechaRegistro, "%d-%m-%Y") AS fecha, c.rutaImagen, concat_ws(" ", u.nombre, u.apellidos) AS nombreCompleto FROM tblcurso c JOIN tblestudiantecurso ec ON ec.cveCurso = c.cveCurso JOIN tblusuario u ON u.cveUsuario = ec.cveUsuario WHERE (ec.avanceCurso BETWEEN 0 AND 99) and u.cveUsuario = ?', [req.token.user.cveUsuario], (err, aprendiendodata) => {
            conn.query('SELECT c.nombre, ec.avanceCurso, c.descripcion, c.estatus, date_format(c.fechaRegistro, "%d-%m-%Y") AS fecha, c.rutaImagen, concat_ws(" ", u.nombre, u.apellidos) AS nombreCompleto FROM tblcurso c JOIN tblestudiantecurso ec ON ec.cveCurso = c.cveCurso JOIN tblusuario u ON u.cveUsuario = ec.cveUsuario WHERE ec.avanceCurso = 100 and u.cveUsuario = ?', [req.token.user.cveUsuario], (err, terminadosdata) => {
                if (err) {
                    res.render(err)
                } else {
                    res.render("inicio/aprendiendo", { aprendiendo: aprendiendodata, terminados: terminadosdata, sesion: req.token.user })
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
    const cveUsuario = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('SELECT cveUsuario, concat_ws(" ", nombre, apellidos) AS nombreCompleto, email, date_format(fechaRegistro, "%d-%m-%Y") AS fechaIngreso, CASE WHEN cveRol = 1 THEN "Instructor" WHEN cveRol = 2 THEN "Alumno" ELSE "Admin" END as rol FROM tblusuario WHERE cveUsuario <> ?', [cveUsuario], (err, usuariosdata) => {
            if (err) {
                res.render(err)
            } else {
                res.render("inicio/usuarios", { sesion: req.token.user, usuarios: usuariosdata, flash: req.flash('message') });
            }

        });
    });

}

function mostrarUsuario(req, res) {
    const cveUsuario = req.params.id;
    console.log(cveUsuario);
    req.getConnection((err, conn) => {
        conn.query('SELECT cveUsuario, nombre, apellidos, matricula, email, cveRol FROM tblusuario WHERE cveUsuario = ?', [cveUsuario], (err, usuariodata) => {
            if (usuariodata.length > 0) {
                res.render('inicio/editarUsuario', { usuario: usuariodata, sesion: req.token.user });
                console.log(JSON.parse(JSON.stringify(usuariodata)));
            } else {
                res.render('inicio/editarUsuario', { error: 'Error: No se pudieron obtener los datos de usuario.', sesion: req.token.user });
            }
        });
    });
}

function editarUsuario(req, res) {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query(`UPDATE tblusuario SET cveRol = ${data.cveRol} WHERE cveUsuario = ?`, [data.cveUsuario], (err, usuariodata) => {
            if(err) {
                req.flash('message', "No se pudo editar el usuario.");
                res.redirect(`/inicio/usuarios/${req.token.user.cveUsuario}`);
            } else {
                req.flash('message', "Se editó el usuario correctamente.");
                res.redirect(`/inicio/usuarios/${req.token.user.cveUsuario}`);
            }
        });
    });
}

/*Al eliminar usuario si es instructor debe eliminar todos sus cursos, si es estudiante debe eliminar todos los cursos en los que está inscrito */
function eliminarUsuario(req, res) {
    const cveUsuario = req.params.id;

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM tblcurso WHERE cveUsuario = ?', [cveUsuario], (err, cursodata) => {
            conn.query('DELETE FROM tblestudiantecurso WHERE cveUsuario = ?', [cveUsuario], (err, usuariocursodata) => {
                conn.query('DELETE FROM tblusuario WHERE cveUsuario = ?', [cveUsuario], (err, usuariodata) => {
                    if (err) {
                        req.flash('message', 'No se pudo eliminar el usuario.');
                        res.redirect(`/inicio/usuarios/${req.token.user.cveUsuario}`);
                    } else {
                        req.flash('message', 'Se eliminó el usuario correctamente.');
                        res.redirect(`/inicio/usuarios/${req.token.user.cveUsuario}`);
                    }

                });
            });
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
    mostrarUsuario,
    editarUsuario,
    eliminarUsuario,
    verifytoken,

}
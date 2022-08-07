const { connect } = require("http2");
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
                res.render("inicio/misCursos", { miscursos: miscursosdata, sesion: req.token.user, flash: req.flash('message')  })
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


function verCurs(req, res) {
    var cveCurso = req.params.cveCurso;
    cveCurso = 21;
    req.getConnection ((err, conn)  => { 
        conn.query(`SELECT cveCurso, c.nombre, c.descripcion, c.estatus, date_format(c.fechaRegistro, "%d-%m-%Y") AS fecha, c.rutaImagen,  CONCAT(tu.nombre, ' ', tu.apellidos) as instructor from tblCurso c inner join tblUsuario tu on c.cveUsuario = tu.cveUsuario where cveCurso =  ${cveCurso}`, (error, cursodata) =>{
            if(!error){
                console.log(cursodata)
                conn.query (`select nombre, cveSeccion from tblseccion WHERE cveCurso = ${cveCurso}`, (error1, secciondata) => {
                    if(!error1){
                        conn.query(`SELECT tt.cveTema, tt.nombre, ts.cveSeccion FROM tblTema tt inner join tblseccion ts on tt.cveSeccion = ts.cveSeccion WHERE cveCurso = ${cveCurso}`,(error2, temadata)=>{
                            if(!error2){
                                res.render ("inicio/vercurso", {curso: cursodata,secciones:secciondata, temas: temadata, sesion: req.token.user, cveCurso: cveCurso})
                            }
                        })
    
                    }else {
                        
                res.render (error1)
                    }
                })
            } else{
                res.render (error)
            }
        
        });
        
    });
        
}
function verCurso(req, res) {
    idCurso = req.params.id;

    req.getConnection((err, conn) => {
        conn.query(`SELECT cur.cveCurso, cur.nombre as curnom, concat(day(cur.fechaRegistro),' ',mes(cur.fechaRegistro, 'es_ES'),' ', year(cur.fechaRegistro)) as fecha , cur.rutaImagen as ruta, cur.descripcion, CONCAT(usu.nombre, ' ', usu.apellidos) as instructor  FROM tblcurso as cur inner join tblusuario  as usu on usu.cveUsuario = cur.cveUsuario WHERE cur.cveCurso = ?`, [idCurso], (err, curso) => {
        conn.query('SELECT cveSeccion, nombre from tblseccion WHERE cveCurso = ?', [idCurso], (err, secciones) => {
        conn.query(`select tem.cveTema, tem.cveSeccion as secTem, tem.nombre as nam from tblseccion as sec  LEFT JOIN tbltema as tem on tem.cveSeccion = sec.cveSeccion  WHERE  sec.cveCurso = ?`, [idCurso], (err, temas) => {
        conn.query(`SELECT avanceCurso FROM tblestudiantecurso WHERE cveCurso = ${idCurso} and cveUsuario = ${req.token.user.cveUsuario}`, (err, existe) => {

            console.log("Existe"+existe)
            if(existe != null && existe != undefined && existe != "" ){
                res.render("inicio/verCurso",{ sesion: req.token.user, secciones:secciones, temas:temas, curso:curso, cveCurso: idCurso, idUsuario:req.token.user.cveUsuario, boton:false});
            }else{
                res.render("inicio/verCurso",{ sesion: req.token.user, secciones:secciones, temas:temas, curso:curso, cveCurso: idCurso, idUsuario:req.token.user.cveUsuario, boton:true});
            }
        })
    });
    });
    });
    });
    
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


function eliminarCurso(req, res) {
    const cveCurso = req.params.id;

    req.getConnection((err, conn) => {
        conn.query('DELETE FROM tblestudiantecurso WHERE cveCurso = ?', [cveCurso], (err, estudiantecursodata) => {
            conn.query('DELETE FROM tblseccion WHERE cveCurso  = ?', [cveCurso], (err, secciondata) => {
                conn.query('DELETE FROM tblcurso WHERE cveCurso = ?', [cveCurso], (err, cursodata) => {
                    if (err) {
                        req.flash('message', 'No se pudo eliminar el curso.');
                        res.redirect(`/inicio/usuarios`);
                    } else {
                        req.flash('message', 'Se eliminó el curso correctamente.');
                        res.redirect(`/inicio/misCursos`);
                    }

                });
            });
        });
    });
}

function asignarCurso(req, res){
    var cveCurso = req.body.cveCurso;
    var cveUsuario = req.body.cveUsuario;
    var ultimoTema = 1;
    var avanceCurso = 0;

    req.getConnection((err, conn) => {
        conn.query(`INSERT INTO tblestudiantecurso (cveUsuario, cveCurso, ultimoTema, avanceCurso) VALUES (${cveUsuario}, ${cveCurso}, ${ultimoTema}, ${avanceCurso})`, (error, rows) => {
            if(!error){
                conn.query(`SELECT cur.cveCurso, cur.nombre as curnom, concat(day(cur.fechaRegistro),' ',mes(cur.fechaRegistro, 'es_ES'),' ', year(cur.fechaRegistro)) as fecha , cur.rutaImagen as ruta, cur.descripcion, CONCAT(usu.nombre, ' ', usu.apellidos) as instructor  FROM tblcurso as cur inner join tblusuario  as usu on usu.cveUsuario = cur.cveUsuario WHERE cur.cveCurso = ?`, [idCurso], (err, curso) => {
                    conn.query('SELECT cveSeccion, nombre from tblseccion WHERE cveCurso = ?', [idCurso], (err, secciones) => {
                    conn.query(`select tem.cveTema, tem.cveSeccion as secTem, tem.nombre as nam from tblseccion as sec  LEFT JOIN tbltema as tem on tem.cveSeccion = sec.cveSeccion  WHERE  sec.cveCurso = ?`, [idCurso], (err, temas) => {
                    res.render("inicio/verCurso",{ sesion: req.token.user, secciones:secciones, temas:temas, curso:curso, cveCurso: idCurso, idUsuario:req.token.user.cveUsuario, asignar:true});
                });
                });
                });
            }
            else{
                res.render(error)
            }
        })
    })
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
    eliminarCurso,
    asignarCurso

}
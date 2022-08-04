const jwt = require("jsonwebtoken");
const { promisify } = require('util')

function inicio(req, res) {
    req.getConnection((err, conn) => {
        conn.query('SELECT c.nombre, c.descripcion, c.estatus, date_format(c.fechaRegistro, "%d-%m-%Y") AS fecha, c.rutaImagen, concat_ws(" ", u.nombre, u.apellidos) AS nombreCompleto FROM tblcurso c JOIN tblusuario u ON u.cveUsuario = c.cveUsuario', (err, cursosdata) => {
            console.log('Este es el rol '+req.token.user.cveRol);
            if (err) {
                res.render(err)
            } else {
                res.render("inicio/inicio", { cursos: cursosdata, sesion: req.token.user });
                        
            }
        });
    });
}

async function verifytoken(req, res, next) {

    if (req.cookies.jwt) {

        const decodificada = await promisify(jwt.verify)(req.cookies.jwt, 'secretkey')


        req.token = decodificada;

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
                if (req.token.user.cveRol != 1) { //Si no es instructor
                    console.log('el rol del usuario es '+req.token.user.cveRol);
                    res.render("error/error401");
                }else{
                    res.render("inicio/misCursos", { miscursos: miscursosdata, sesion: req.token.user, flash: req.flash('message')  });
                } 
                
            }

        });
    });
}

function aprendiendo(req, res) {
    req.getConnection((err, conn) => {
        conn.query('SELECT ec.ultimoTema , c.cveCurso ,c.nombre, ec.avanceCurso, c.descripcion, c.estatus, date_format(c.fechaRegistro, "%d-%m-%Y") AS fecha, c.rutaImagen, concat_ws(" ", u.nombre, u.apellidos) AS nombreCompleto FROM tblcurso c JOIN tblestudiantecurso ec ON ec.cveCurso = c.cveCurso JOIN tblusuario u ON u.cveUsuario = ec.cveUsuario WHERE (ec.avanceCurso BETWEEN 0 AND 99) and u.cveUsuario = ?', [req.token.user.cveUsuario], (err, aprendiendodata) => {
            conn.query('SELECT c.cveCurso, c.nombre, ec.avanceCurso, c.descripcion, c.estatus, date_format(c.fechaRegistro, "%d-%m-%Y") AS fecha, c.rutaImagen, concat_ws(" ", u.nombre, u.apellidos) AS nombreCompleto FROM tblcurso c JOIN tblestudiantecurso ec ON ec.cveCurso = c.cveCurso JOIN tblusuario u ON u.cveUsuario = ec.cveUsuario WHERE ec.avanceCurso = 100 and u.cveUsuario = ?', [req.token.user.cveUsuario], (err, terminadosdata) => {
                if (err) {
                    res.render(err)
                } else {
                    if (req.token.user.cveRol != 2) { //Si no es instructor
                        console.log('el rol del usuario es '+req.token.user.cveRol);
                        res.render("error/error401");
                    }else{
                        res.render("inicio/aprendiendo", { aprendiendo: aprendiendodata, terminados: terminadosdata, sesion: req.token.user });
                    }   
                }
            });
        });
    });
}


function verCurso(req, res) {

    res.render("inicio/verCurso");
}

function seguirCurso(req, res) {
    const idTema = req.params.idTema;
    const idCurso = req.params.id;


    req.getConnection((err, conn) => {
        conn.query(`select tbles.cveCurso  from tblestudiantecurso as tbles where tbles.cveCurso=${idCurso} and tbles.cveUsuario= ?`, [req.token.user.cveUsuario], (err, cursoInscrito) => {
            if (cursoInscrito.length > 0) {
                conn.query(`select us.cveUsuario, cur.cveCurso, tem.nombre, tem.cveTema,  avete.estado from tblusuario as us LEFT join tblestudiantecurso as estcur on estcur.cveUsuario = us.cveUsuario left join tblcurso as cur on cur.cveCurso = estcur.cveCurso left JOIN tblseccion as sec on sec.cveCurso= cur.cveCurso LEFT JOIN tbltema as tem on tem.cveSeccion = sec.cveSeccion LEFT JOIN tblavancetemas as avete on avete.cveTema = tem.cveTema and avete.cveUsuario= us.cveUsuario WHERE us.cveUsuario=  ${req.token.user.cveUsuario}  and avete.estado is null and cur.cveCurso = ?`, [idCurso], (err, existNullavanve) => {
                    if (existNullavanve.length > 0) {

                        existNullavanve.forEach(element => {

                            conn.query(`INSERT INTO tblavancetemas (cveTema, cveUsuario, estado) values ('${element.cveTema}', '${req.token.user.cveUsuario}', 0)`, (err2, rows) => {
                            });

                        });
                        res.redirect(`/inicio/seguirCurso/${idCurso}`);
                    } else {


                        conn.query('SELECT cveSeccion, nombre from tblseccion WHERE cveCurso = ?', [idCurso], (err, secciones) => {
                            conn.query(`select tem.cveSeccion as secid, cur.cveCurso, tem.nombre as name, tem.cveTema as cveTem,  avete.estado as estate from tblusuario as us LEFT join tblestudiantecurso as estcur on estcur.cveUsuario = us.cveUsuario left join tblcurso as cur on cur.cveCurso = estcur.cveCurso left JOIN tblseccion as sec on sec.cveCurso= cur.cveCurso LEFT JOIN tbltema as tem on tem.cveSeccion = sec.cveSeccion LEFT JOIN tblavancetemas as avete on avete.cveTema = tem.cveTema and avete.cveUsuario= us.cveUsuario WHERE us.cveUsuario=  ${req.token.user.cveUsuario}   and cur.cveCurso = ?`, [idCurso], (err, temas) => {
                                if (idTema == 'term') {
                                    console.log(temas)
                                    res.render("inicio/seguirCurso", { sesion: req.token.user, dataCurso: secciones, tema: temas, cursoid: idCurso, felicidades: { nombre: 'Felicidades has terminado este curso' }, bandera: { bandera: 'fin' } });
                                   
                                } else {
                                    conn.query(`select cvetema, nombre, descripcion, tema from tbltema WHERE cveTema =  ?   `, [idTema], (err, temaActualdatos) => {
                                      
                                        conn.query(`SELECT rutaMaterial, nombreMaterial FROM tblmaterial where cveTema = ? `, [idTema], (err, listaMaterial) => {
                                            

                                            res.render("inicio/seguirCurso", { sesion: req.token.user, dataCurso: secciones, tema: temas, cursoid: idCurso, temaActual: temaActualdatos, idTema: idTema, materiales: listaMaterial });
                                        });

                                    });
                                }

                            });
                        });
                    }
                });
            } else {
                res.send("No estas inscrito")
            }

        });
    });

}


function listarUsuarios(req, res) {
    const cveUsuario = req.params.id;
    req.getConnection((err, conn) => {
        conn.query('SELECT cveUsuario, concat_ws(" ", nombre, apellidos) AS nombreCompleto, email, date_format(fechaRegistro, "%d-%m-%Y") AS fechaIngreso, CASE WHEN cveRol = 1 THEN "Instructor" WHEN cveRol = 2 THEN "Alumno" ELSE "Admin" END as rol FROM tblusuario WHERE cveUsuario <> ?', [cveUsuario], (err, usuariosdata) => {
            if (err) {
                res.render(err)
            } else {
                if (req.token.user.cveRol != 3) { //Si no es admin
                    console.log('el rol del usuario es '+req.token.user.cveRol);
                    res.render("error/error401");
                }else{
                    res.render("inicio/usuarios", { sesion: req.token.user, usuarios: usuariosdata, flash: req.flash('message') });
                } 
                
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
            if (err) {
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


function updateTemaAvance(req, res) {
    id = req.params.id
    estado = req.params.estado
    idCurso = req.params.idCurso
    req.getConnection((err, conn) => {
        conn.query(`SELECT estado FROM tblavancetemas WHERE cveUsuario = ${req.token.user.cveUsuario} and cveTema = ?`, [id], (err, estadoAvance) => {
            if (estadoAvance.length > 0) {




                conn.query(`UPDATE tblavancetemas SET estado = ${estado} WHERE cveTema= ${id} and cveUsuario = ?`, [req.token.user.cveUsuario], (err, usuariodata) => {
                    conn.query(`select tem.cveSeccion as secid, cur.cveCurso, tem.nombre as name, tem.cveTema as cveTem,  avete.estado as estate from tblusuario as us LEFT join tblestudiantecurso as estcur on estcur.cveUsuario = us.cveUsuario left join tblcurso as cur on cur.cveCurso = estcur.cveCurso left JOIN tblseccion as sec on sec.cveCurso= cur.cveCurso LEFT JOIN tbltema as tem on tem.cveSeccion = sec.cveSeccion LEFT JOIN tblavancetemas as avete on avete.cveTema = tem.cveTema and avete.cveUsuario= us.cveUsuario WHERE us.cveUsuario=  ${req.token.user.cveUsuario}   and cur.cveCurso = ?`, [idCurso], (err, temas) => {



                        var terminados1 = 0
                        var ultimoTema = 0

                        temas.forEach(element => {
                            if (element.estate == 1) {
                                terminados1++
                            }
                            if (element.estate == 1) {
                                ultimoTema = element.cveTem

                            }

                        });
                        console.log("Si")
                        const temasjson = JSON.parse(JSON.stringify(temas))
                        porcentajeCurso = (100 / temasjson.length) * terminados1
                        porcentajeCurso = porcentajeCurso.toFixed(2)

                        conn.query(`update tblestudiantecurso set  avanceCurso=${porcentajeCurso}, ultimoTema=${ultimoTema} where cveUsuario = ${req.token.user.cveUsuario} and cveCurso=${idCurso}`, (err2, rows) => {
                            res.status(200).send('Se actualizo el estado correctamente');
                        });

                    });
                });
            } else {
                conn.query(`INSERT INTO tblavancetemas (cveTema, cveUsuario, estado) values ('${id}', '${req.token.user.cveUsuario}', '${estado}')`, (err2, rows) => {

                    res.status(200).send('Se inserto el estado');

                });
            }





        });
    });

}
function cargarComentarios(req, res) {
    idtema = req.params.idTema
    idCurso = req.params.idCurso
    req.getConnection((err, conn) => {
        conn.query(`SELECT com.cveComentario, com.comentario, concat(day(com.fechaRegistro),' ',mes(com.fechaRegistro, 'es_ES'),' ', year(com.fechaRegistro)) as fecha  , usu.nombre FROM tblcomentario as com INNER JOIN tbltema as tema on tema.cveTema = com.cveTema INNER JOIN tblseccion as sec on sec.cveSeccion = tema.cveSeccion INNER JOIN tblusuario as usu on usu.cveUsuario = com.cveUsuario where sec.cveCurso = ${idCurso} and tema.cveTema = ?`, [idtema], (err, comentarios) => {
         res.send(comentarios)
        });
    });

}

function cargarComentariosRespuestas(req, res) {
    idtema = req.params.idTema
    idCurso = req.params.idCurso
    req.getConnection((err, conn) => {
        conn.query(`SELECT comres.cveComentario, comres.respuesta, concat(day(comres.fechaRespuesta),' ',mes(comres.fechaRespuesta, 'es_ES'),' ', year(comres.fechaRespuesta)) as fecha, usu.nombre  FROM tblcomentariorespuestas as comres inner join tblcomentario as com on com.cveComentario = comres.cveComentario INNER join tbltema as tema on tema.cveTema = com.cveTema INNER join tblseccion as sec on sec.cveSeccion = tema.cveSeccion INNER join tblusuario as usu on usu.cveUsuario = comres.cveUsuario where sec.cveCurso = ${idCurso} and tema.cveTema=?`, [idtema], (err, respuestas) => {
         res.send(respuestas)
        });
    });

}
function insertarComentario(req, res){
idtema = req.params.idTema
idUsuario = req.params.idusuario
comentario =req.params.comentario

req.getConnection((err, conn) => {
    conn.query(`INSERT INTO tblcomentario ( comentario, fechaRegistro, cveUsuario, cveTema ) VALUES ("${comentario}", NOW(), ${idUsuario}, ${idtema})`,  (err, respuestas) => {
        if(err){
            console.log(err)
            res.status(500).send('Error en la carga de datos');
        }
        res.status(200).send('Se inserto el comentario');
    });
});
}

function insertarComentarioRespuesta(req, res){
    idcomentario = req.params.idcomentario
    idUsuario = req.params.idusuario
    comentario =req.params.comentario
    
    req.getConnection((err, conn) => {
        conn.query(`INSERT INTO tblcomentariorespuestas ( respuesta, fechaRespuesta, cveUsuario, cveComentario ) VALUES ("${comentario}", NOW(), ${idUsuario}, ${idcomentario})`,  (err, respuestas) => {
            if(err){
                console.log(err)
                res.status(500).send('Error en la carga de datos');
            }
            res.status(200).send('Se inserto el comentario');
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

    updateTemaAvance,
    cargarComentarios,
    cargarComentariosRespuestas,
    insertarComentario,
    insertarComentarioRespuesta,

    eliminarCurso,

}
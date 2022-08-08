const express = require('express');
const cors = require('cors');
const sharp = require('sharp');
const app= express();
const Swal = require('sweetalert2')
const jwt = require("jsonwebtoken");
const { promisify } = require('util')
var cveCurso = "";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

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

function crearCurso(req, res) {
    res.render("curso/crearCurso", {sesion: req.token.user});
}

function editarCurso(req, res) {
    var id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query(`SELECT nombre, descripcion, estatus, date_format(fechaRegistro, "%d-%m-%Y") AS fecha, rutaImagen, cveCurso FROM tblcurso WHERE cveCurso = ?`, [id], (err, cursodata) => {
            if(err){
                res.render(err)
            }else{
                conn.query(`SELECT nombre, descripcion, estatus, cveSeccion, date_format(fechaRegistro, "%d-%m-%Y") AS fecha, cveCurso FROM tblseccion WHERE cveCurso = ?`, [id], (err, seccionesdata) => {
                    if(err){
                        res.render(err)
                    }else{
                        res.render("curso/editarCurso", {secciones: seccionesdata, miscursos: cursodata, sesion: req.token.user, cveCurso:id})
                    }
                });
            }
        });
    });
}

function editarTema(req, res) {
    var cveTema = req.body.cveTema;
    req.getConnection((err, conn) => {
        conn.query(`SELECT tt.cveTema, tt.nombre, tt.descripcion, tt.teoria, tt.rutaImagen, tc.cveCurso, ts.cveSeccion FROM tblTema tt INNER JOIN tblSeccion ts ON tt.cveSeccion = ts.cveSeccion INNER JOIN tblCurso tc ON ts.cveCurso = tc.cveCurso WHERE cveTema = ${cveTema}`, (error, temaData) => {
            if(!error){
                req.getConnection((err, conn) => {
                    conn.query(`SELECT cveMaterial, rutaMaterial, cveTema, nombreMaterial FROM tblMaterial WHERE cveTema = ${cveTema}`, (error, materialData) => {
                        if(!err){
                            res.render('curso/editarTema',{temas:temaData, material:materialData, sesion: req.token.user})
                            console.log(materialData)
                        }else{
                            console.log(error);
                        }
                    });
                });
            }else{
                console.log(error);
            }
        });
    });
}

function upload(req, res) {
    var nombreImagen = "";
    
     if(req.file != null || require.file != undefined) {
        nombreImagen = req.file.filename;
     }
    usuario = req.token.user.cveUsuario;
    req.getConnection((err, conn) => {
        conn.query(`INSERT INTO tblcurso (nombre, descripcion, estatus, fechaRegistro, cantidadUsuarios, rutaImagen,cveUsuario) 
        values ('${req.body.nameCurso}', '${req.body.descripcion}', 1, CURDATE(), 0, '${nombreImagen}',${usuario} )`, (err2, rows) => {
            
                console.log(usuario);
                res.render('curso/crearCurso',{alert:true, sesion: req.token.user});
                console.log(usuario);

        });
    });
}

function modificarCurso(req, res) {
    var nombreImagen = "";
    
     if(req.file != null || require.file != undefined) {
        nombreImagen = req.file.filename;
     }
    
    req.getConnection((err, conn) => {
        conn.query(`Update tblcurso set nombre = '${req.body.nameCurso}', descripcion = '${req.body.descripcion}', rutaImagen = '${nombreImagen}' where cveCurso = '${req.body.cveCurso}'`, (error, resultado) => {
            if (!error) {
                usuario = req.session.cveUsuario;
                console.log(resultado);
                console.log(error);
                res.render('curso/editarCurso',{curso:true, sesion: req.token.user, cveCurso:req.body.cveCurso});
            }else{
                res.render('curso/editarCurso',{error_seccion:true, sesion: req.token.user, cveCurso:req.body.cveCurso});
            }
        });
        
    });
    console.log(req.session.cveUsuario);
    console.log(req.token.user.cveUsuario);
}

function agregarSeccion(req, res) {
    var nombre = req.body.nombreSeccion;
    var cveCurso = req.body.cveCurso;
    var estatus = 1;

    req.getConnection((err, conn) => {
        conn.query(`INSERT INTO tblseccion (nombre, estatus, fechaRegistro, cveCurso) 
        values ('${nombre}', ${estatus}, CURDATE(), '${cveCurso}')`, (error, rows) => {
            if(!error){
                usuario = req.session.cveUsuario;
                res.render('curso/editarCurso',{seccion:true, sesion: req.token.user, cveCurso: cveCurso});
            }else{
                usuario = req.session.cveUsuario;
                res.render('curso/editarCurso',{error_seccion:true, sesion: req.token.user, cveCurso: cveCurso});
            }
        });
    });
}

function filtrarTemas(req, res) {
    var cveCurso = req.body.cveCurso;
    req.getConnection((err, conn) => {
        conn.query(`SELECT nombre, descripcion, estatus, date_format(fechaRegistro, "%d-%m-%Y") AS fecha, rutaImagen, cveCurso FROM tblcurso WHERE cveCurso = ${cveCurso}`, (err, cursodata) => {
            if(err){
                res.render(err)
            }else{
                req.getConnection((err, conn) => {
                    conn.query(`SELECT nombre, descripcion, estatus, cveSeccion, date_format(fechaRegistro, "%d-%m-%Y") AS fecha, cveCurso FROM tblseccion WHERE cveCurso = '${cveCurso}'`, (err, seccionesdata) => {
                        if(err){
                            res.render(err)
                        }else{
                            req.getConnection((err, conn) => {
                                conn.query(`SELECT cveTema, nombre as  nombreTema, descripcion, estatus, rutaImagen,cveSeccion, date_format(fechaRegistro, "%d-%m-%Y") AS fecha FROM tbltema WHERE cveSeccion ='${req.body.idSeccion} '`, (err, temasdata) => {
                                    if(err){
                                        res.render(err)
                                    }else{
                                        res.render("curso/editarCurso", {secciones: seccionesdata, miscursos: cursodata, temasdata: temasdata, cveSeccion: req.body.idSeccion, sesion: req.token.user, cveCurso:cveCurso, cveSeccion:req.body.idSeccion})
                                        console.log(temasdata);
                                        console.log(seccionesdata[1]);
                                    }
                                });
                            });
                        }
                    });
                });
            }
   
        });
    });
}

function agregarTema(req, res) {
    var cveCurso = req.body.cveCurso;
    var nombre = req.body.nombreTema;
    var estatus = 1;
    var cveSeccion = req.body.cveSeccion;

    console.log("Clave de sección:"+cveSeccion)
    console.log("Otra clave de seccion"+req.body.cveSeccion)

    req.getConnection((err, conn) => {
        conn.query(`INSERT INTO tbltema (nombre, estatus, fechaRegistro, cveSeccion) 
        values ('${nombre}', ${estatus}, CURDATE(), '${cveSeccion}')`, (error, rows) => {
            if(!error){
                req.getConnection((err, conn) => {
                    conn.query(`SELECT nombre, descripcion, estatus, date_format(fechaRegistro, "%d-%m-%Y") AS fecha, rutaImagen, cveCurso FROM tblcurso WHERE cveCurso = ${cveCurso}`, (error, cursodata) => {
                        if(!err){
                            req.getConnection((err, conn) => {
                                conn.query(`SELECT nombre, descripcion, estatus, cveSeccion, date_format(fechaRegistro, "%d-%m-%Y") AS fecha, cveCurso FROM tblseccion WHERE cveCurso = ${cveCurso}`, (error, seccionesdata) => {
                                    if(!err){
                                        req.getConnection((err, conn) => {
                                            conn.query(`SELECT cveTema, nombre as  nombreTema, descripcion, estatus, rutaImagen,cveSeccion, date_format(fechaRegistro, "%d-%m-%Y") AS fecha FROM tbltema WHERE cveSeccion = ${cveSeccion}`, (error, temasdata) => {
                                                if(!err){
                                                    usuario = req.session.cveUsuario;
                                                    res.render('curso/editarCurso',{tema:true, sesion: req.token.user, cveCurso: cveCurso, cveSeccion: cveSeccion, secciones: seccionesdata, miscursos: cursodata, temasdata: temasdata});
                                                    console.log("Clave de sección final: " + cveSeccion);
                                                }else{
                                                    console.log(error);
                                                }
                                            });
                                        }); 
                                    }else{
                                        console.log(error);
                                    }
                                });
                            }); 
                        }else{
                            console.log(error);
                        }
                    });
                }); 
                
            }else{
                usuario = req.session.cveUsuario;
                res.render('curso/editarCurso',{error_seccion:true, sesion: req.token.user, idCurso:id, cveCurso: cveCurso, cveSeccion: cveSeccion});
                console.log("Clave de sección final: "+cveSeccion);
            }
        });
    });
}

function eliminarSeccion(req, res) {
    var cveCurso = req.body.cveCurso;
    req.getConnection((err, conn) => {
        conn.query(`SELECT nombre, descripcion, estatus, date_format(fechaRegistro, "%d-%m-%Y") AS fecha, rutaImagen, cveCurso FROM tblcurso WHERE cveCurso = ${cveCurso}`, (err, cursodata) => {
            if(err){
                res.render(err)
            }else{
                req.getConnection((err, conn) => {
                    conn.query(`SELECT nombre, descripcion, estatus, cveSeccion, date_format(fechaRegistro, "%d-%m-%Y") AS fecha, cveCurso FROM tblseccion WHERE cveCurso = ${cveCurso}`, (err, seccionesdata) => {
                        if(err){
                            res.render(err)
                        }else{
                            res.render("curso/editarCurso", {secciones: seccionesdata, miscursos: cursodata,eliminarSeccion:true, cveSeccion:req.body.cveSeccionEliminar, sesion: req.token.user, cveCurso: cveCurso})
                        }
                    });
                });
            }
   
        });
    });
}

function borrarSeccion(req, res) {
    var id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query(`SELECT tc.cveCurso, ts.cveSeccion FROM tblSeccion ts inner join tblCurso tc on ts.cveCurso = tc.cveCurso WHERE cveSeccion = ${id}`, (err, data) => {
            if(err){
                res.render(err)
            }else{
                data.forEach(element => {
                    cveCurso = element.cveCurso;

                    req.getConnection((err, conn) => {
                        conn.query(`SELECT cveTema FROM tblTema WHERE cveSeccion = ${id}`, (error, rows) => {
                            if(!error){
                                rows.forEach(element => {
                                    req.getConnection((err, conn) => {
                                        conn.query(`DELETE FROM tblMaterial WHERE cveTema = ${element.cveTema}`, (error2, rows) => {
                                            if(!error2){
                                                console.log("Se elimino el material correctamente.");
                                                req.getConnection((err, conn) => {
                                                    conn.query(`DELETE FROM tblTema WHERE cveTema = ${element.cveTema}`, (error, rows) => {
                                                        if(!err){
                                                            console.log("Se elimino el tema correctamente correctamente.");
                                                        }else{
                                                            console.log("Este es el error de tema:"+error);
                                                        }
                                                    });
                                                });
                                            }else{
                                                console.log("Este es el error de material:"+error);
                                            }
                                        });
                                    });
                                    console.log(element.cveTema);
                                });
                                req.getConnection((err, conn) => {
                                    conn.query(`DELETE FROM tblSeccion WHERE cveSeccion = ${id}`, (error, rows) => {
                                        if(!err){
                                            console.log("Se elimino la sección correctamente.");
                                        }else{
                                            console.log(error);
                                        }
                                    });
                                });  
                            }else{
                                console.log(error);
                            }
                        });
                    });

                })
                console.log(data);
                req.getConnection((err, conn) => {
                    conn.query(`SELECT nombre, descripcion, estatus, date_format(fechaRegistro, "%d-%m-%Y") AS fecha, rutaImagen, cveCurso FROM tblcurso WHERE cveCurso = ${cveCurso}`, (error, cursodata) => {
                        if(!error){
                            req.getConnection((err, conn) => {
                                conn.query(`SELECT nombre, descripcion, estatus, cveSeccion, date_format(fechaRegistro, "%d-%m-%Y") AS fecha, cveCurso FROM tblseccion WHERE cveCurso = ${cveCurso}`, (error, seccionesdata) => {
                                    if(!err){
                                        res.render("curso/editarCurso", {secciones: seccionesdata, miscursos: cursodata, sesion: req.token.user, cveCurso:cveCurso})
                                    }else{
                                        console.log(error);
                                    }
                                });
                            }); 
                        }else{
                            console.log(error);
                        }
                    });
                }); 
            }
   
        });
    });
    
}

function eliminarTema (req, res) {
    req.getConnection((err, conn) => {
        conn.query(`SELECT cveCurso from tblSeccion WHERE cveSeccion = ${req.body.cveSeccion}`, (err, Curso) => {
            if(err){
                res.render(err)
            }else{
                Curso.forEach(element => {
                    console.log("Mi curso"+element.cveCurso);
                    req.getConnection((err, conn) => {
                        conn.query(`SELECT nombre, descripcion, estatus, date_format(fechaRegistro, "%d-%m-%Y") AS fecha, rutaImagen, cveCurso FROM tblcurso WHERE cveCurso = ${element.cveCurso}`, (err, cursodata) => {
                            if(err){
                                res.render(err)
                            }else{
                                req.getConnection((err, conn) => {
                                    conn.query(`SELECT nombre, descripcion, estatus, cveSeccion, date_format(fechaRegistro, "%d-%m-%Y") AS fecha, cveCurso FROM tblseccion WHERE cveCurso = ${element.cveCurso}`, (err, seccionesdata) => {
                                        if(err){
                                            res.render(err)
                                        }else{
                                            res.render("curso/editarCurso", {secciones: seccionesdata, miscursos: cursodata,eliminarTema:true, cveTema:req.body.cveTema, sesion: req.token.user, cveCurso:element.cveCurso})
                                        }
                                    });
                                });
                            }
                   
                        });
                    });
                });
                
            }
        });
    });
    
}

function borrarTema (req, res) {
    var id = req.params.id;

    req.getConnection((err, conn) => {
        conn.query(`SELECT tc.cveCurso, ts.cveSeccion FROM tblTema tt inner join tblSeccion ts on tt.cveSeccion = ts.cveSeccion inner join tblCurso tc on ts.cveCurso = tc.cveCurso WHERE cveTema = = ${id}`, (error, rows) => {
            if(!err){
                console.log("Se elimino la sección correctamente.");
            }else{
                console.log(error);
            }
        });
    }); 

    req.getConnection((err, conn) => {
        conn.query(`DELETE FROM tblMaterial WHERE cveTema = ${id}`, (error, rows) => {
            if(!error){
                req.getConnection((err, conn) => {
                    conn.query(`DELETE FROM tblTema WHERE cveTema = ${id}`, (error, rows) => {
                        if(!error){
                            console.log("Se elimino el tema correctamente.");
                        }else{
                            console.log(error);
                        }
                    });
                });
            }else{
                console.log(error);
            }
        });
    });
}

function modificarTema(req, res){
  var cveTema = req.body.cveTema;
  var nombre = req.body.nombre;
  req.getConnection((err, conn) => {
    conn.query(`UPDATE tblTema SET nombre = '${nombre}' WHERE cveTema = ?`, [cveTema], (error, rows) => {
        if(!error){
            req.getConnection((err, conn) => {
                conn.query(`SELECT tt.cveTema, tt.nombre, tt.descripcion, tt.teoria, tt.rutaImagen, tc.cveCurso, ts.cveSeccion FROM tblTema tt INNER JOIN tblSeccion ts ON tt.cveSeccion = ts.cveSeccion INNER JOIN tblCurso tc ON ts.cveCurso = tc.cveCurso WHERE cveTema =  ${cveTema}`, (error, temaData) => {
                    if(!error){
                        req.getConnection((err, conn) => {
                            conn.query(`SELECT cveMaterial, rutaMaterial, cveTema, nombreMaterial FROM tblMaterial WHERE cveTema = ${cveTema}`, (error, materialData) => {
                                if(!error){
                                    console.log("Se elimino el tema correctamente.");
                                    res.render('curso/editarTema',{cambioTema:true, temas:temaData, material:materialData, sesion: req.token.user})
                                    console.log(materialData)
                                }else{
                                    console.log(error);
                                }
                            });
                        });
                    }else{
                        console.log(error);
                    }
                });
            });
            console.log("Se actualizo el nombre de manera correcta.");
            
        }else{
            console.log(error);
        }
      });
    });
}

function agregarMaterial(req, res){
    var nombreArchivo = "";
    
     if(req.file != null || require.file != undefined) {
        nombreArchivo = req.file.filename;
     }
     var cveTema = req.body.cveTema;
     var titulo = req.body.nombre;
    console.log(nombreArchivo+ "Tema" + cveTema);
    req.getConnection((err, conn) => {
        conn.query(`INSERT INTO tblMaterial (rutaMaterial, fechaRegistro, cveTema, nombreMaterial) 
        values ('${nombreArchivo}', CURDATE(), ${cveTema}, '${titulo}')`, (err, rows) => {
            if(!err){
                req.getConnection((err, conn) => {
                    conn.query(`SELECT tt.cveTema, tt.nombre, tt.descripcion, tt.teoria, tt.rutaImagen, tc.cveCurso, ts.cveSeccion FROM tblTema tt INNER JOIN tblSeccion ts ON tt.cveSeccion = ts.cveSeccion INNER JOIN tblCurso tc ON ts.cveCurso = tc.cveCurso WHERE cveTema = ${cveTema}`, (error, temaData) => {
                        if(!err){
                            req.getConnection((err, conn) => {
                                conn.query(`SELECT cveMaterial, rutaMaterial, nombreMaterial, cveTema FROM tblMaterial WHERE cveTema = ${cveTema}`, (error, materialData) => {
                                    if(!err){
                                        console.log("Se agrego el material de manera correcta.");
                                        res.render('curso/editarTema',{agregarMaterial:true, temas:temaData, material:materialData, sesion: req.token.user})
                                    }else{
                                        console.log(err);
                                    }
                                });
                            });
                        }else{
                            console.log(err);
                        }
                    });
                });
                console.log("Se actualizo el nombre de manera correcta.");
                
            }else{
                console.log(err);
            }
        });
    });
}

function eliminarMaterial(req, res){
    var cveMaterial = req.body.cveMaterial;
    var cveTema = req.body.cveTema;
    req.getConnection((err, conn) => {
        conn.query(`SELECT tt.cveTema, tt.nombre, tt.descripcion, tt.teoria, tt.rutaImagen, tc.cveCurso, ts.cveSeccion FROM tblTema tt INNER JOIN tblSeccion ts ON tt.cveSeccion = ts.cveSeccion INNER JOIN tblCurso tc ON ts.cveCurso = tc.cveCurso WHERE cveTema =  ${cveTema}`, (err, temaData) => {
            if(err){
                res.render(err)
            }else{
                temaData.forEach(element => {
                    req.getConnection((err, conn) => {
                        conn.query(`SELECT cveMaterial, rutaMaterial, cveTema, nombreMaterial FROM tblMaterial WHERE cveTema = ${cveTema}`, (err, materialData) => {
                            if(err){
                                res.render(err)
                            }else{
                                res.render("curso/editarTema", {material:materialData, temas:temaData,eliminarMaterial:true, cveTema:cveTema, cveMaterial:cveMaterial, sesion: req.token.user})
                            }
                   
                        });
                    });
                });
                
            }
        });
    });
}

function borrarMaterial(req, res){
    var id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query(`SELECT tt.cveTema as cveTema, tt.nombre, tt.descripcion, tt.teoria, tt.rutaImagen, tc.cveCurso, ts.cveSeccion FROM tblMaterial tm INNER JOIN tblTema tt ON tm.cveTema = tt.cveTema INNER JOIN tblSeccion ts ON tt.cveSeccion = ts.cveSeccion INNER JOIN tblCurso tc ON ts.cveCurso = tc.cveCurso WHERE cveMaterial =  ${id}`, (err, temaData) => {
            if(err){
                console.log(err)
            }else{
                req.getConnection((err, conn) => {
                    conn.query(`DELETE FROM tblMaterial WHERE cveMaterial = ${id}`, (error, rows) => {
                        if(!err){ 
                        }else{
                            console.log(error);
                        }
                    });
                });
                temaData.forEach(element => {
                    req.getConnection((err, conn) => {
                        conn.query(`SELECT cveMaterial, rutaMaterial, cveTema, nombreMaterial FROM tblMaterial WHERE cveTema = ${element.cveTema}`, (err, materialData) => {
                            console.log(element.cveTema)
                            console.log(materialData)
                            if(err){
                                res.render(err)
                            }else{
                                res.render("curso/editarTema", {material:materialData, temas:temaData,cveTema:element.cveTema, sesion: req.token.user})
                            }
                        });
                    });
                });
                
            }
        });
    });
    
}

function agregarTeoria(req, res){
    var cveTema = req.body.cveTema;
    var Teoria = req.body.teoria;

    req.getConnection((err, conn) => {
        conn.query(`UPDATE tblTema SET teoria = '${Teoria}' WHERE cveTema = ${cveTema}`, (err, rows) => {
            if(err){
                res.render(err)
            }else{
                req.getConnection((err, conn) => {
                    conn.query(`SELECT cveMaterial, rutaMaterial, cveTema, nombreMaterial FROM tblMaterial WHERE cveTema = ${cveTema}`, (err, materialData) => {
                        if(err){
                            res.render(err)
                        }else{
                            req.getConnection((err, conn) => {
                                conn.query(`SELECT tt.cveTema, tt.nombre, tt.descripcion, tt.teoria, tt.rutaImagen, tc.cveCurso, ts.cveSeccion FROM tblTema tt INNER JOIN tblSeccion ts ON tt.cveSeccion = ts.cveSeccion INNER JOIN tblCurso tc ON ts.cveCurso = tc.cveCurso WHERE cveTema =  ${cveTema}`, (err, temaData) => {
                                    if(err){
                                        res.render(err)
                                    }else{
                                        res.render("curso/editarTema", {material:materialData, temas:temaData,cveTema:cveTema, sesion: req.token.user})
                                    }
                                });
                            });
                        }
                    });
                });
            }
        });
    });
}

module.exports = {
    crearCurso,
    editarTema,
    editarCurso,
    upload,
    agregarSeccion,
    modificarCurso,
    filtrarTemas,
    agregarTema,
    eliminarSeccion,
    borrarSeccion,
    eliminarTema,
    borrarTema,
    modificarTema,
    agregarMaterial,
    eliminarMaterial,
    borrarMaterial,
    agregarTeoria,
    verifytoken
}
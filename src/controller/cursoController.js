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
    var id = req.params.id;
    req.getConnection((err, conn) => {
        conn.query(`SELECT nombre, descripcion, estatus, date_format(fechaRegistro, "%d-%m-%Y") AS fecha, rutaImagen, cveCurso FROM tblcurso WHERE cveCurso = 21`, (err, cursodata) => {
            if(err){
                res.render(err)
            }else{
                req.getConnection((err, conn) => {
                    conn.query('SELECT nombre, descripcion, estatus, cveSeccion, date_format(fechaRegistro, "%d-%m-%Y") AS fecha, cveCurso FROM tblseccion WHERE cveCurso = 21', (err, seccionesdata) => {
                        if(err){
                            res.render(err)
                        }else{
                            req.getConnection((err, conn) => {
                                conn.query('SELECT cveTema, nombre as  nombreTema, descripcion, estatus, rutaImagen,cveSeccion, date_format(fechaRegistro, "%d-%m-%Y") AS fecha FROM tbltema WHERE cveSeccion = 1', (err, temasdata) => {
                                    if(err){
                                        res.render(err)
                                    }else{
                                        
                                        res.render("curso/editarCurso", {secciones: seccionesdata, miscursos: cursodata, temasdata: temasdata})
                                        console.log(temasdata);
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

function editarTema(req, res) {
    var cveTema = req.body.cveTema;
    req.getConnection((err, conn) => {
        conn.query(`SELECT cveTema, nombre, descripcion, teoria, rutaImagen FROM tblTema WHERE cveTema = ${cveTema}`, (error, temaData) => {
            if(!error){
                req.getConnection((err, conn) => {
                    conn.query(`SELECT cveMaterial, rutaMaterial, cveTema FROM tblMaterial WHERE cveTema = ${cveTema}`, (error, materialData) => {
                        if(!error){
                            console.log("Se elimino el tema correctamente.");
                            res.render('curso/editarTema',{temas:temaData, material:materialData})
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
                res.render('curso/editarCurso',{seccion:true});
            }else{
                res.render('curso/editarCurso',{error_seccion:true});
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
                res.render('curso/editarCurso',{seccion:true});
            }else{
                usuario = req.session.cveUsuario;
                res.render('curso/editarCurso',{error_seccion:true});
            }
        });
    });
}

function filtrarTemas(req, res) {
    console.log(req.body);
    req.getConnection((err, conn) => {
        conn.query('SELECT nombre, descripcion, estatus, date_format(fechaRegistro, "%d-%m-%Y") AS fecha, rutaImagen, cveCurso FROM tblcurso WHERE cveCurso = 21', (err, cursodata) => {
            if(err){
                res.render(err)
            }else{
                req.getConnection((err, conn) => {
                    conn.query(`SELECT nombre, descripcion, estatus, cveSeccion, date_format(fechaRegistro, "%d-%m-%Y") AS fecha, cveCurso FROM tblseccion WHERE cveCurso = '${req.body.idCurso}'`, (err, seccionesdata) => {
                        if(err){
                            res.render(err)
                        }else{
                            req.getConnection((err, conn) => {
                                conn.query(`SELECT cveTema, nombre as  nombreTema, descripcion, estatus, rutaImagen,cveSeccion, date_format(fechaRegistro, "%d-%m-%Y") AS fecha FROM tbltema WHERE cveSeccion ='${req.body.idSeccion} '`, (err, temasdata) => {
                                    if(err){
                                        res.render(err)
                                    }else{
                                        res.render("curso/editarCurso", {secciones: seccionesdata, miscursos: cursodata, temasdata: temasdata, cveSeccion: req.body.idSeccion})
                                        console.log(temasdata);
                                        console.log(req.body.idSeccion);
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
    var nombre = req.body.nombreTema;
    var estatus = 1;
    var cveSeccion = req.body.cveSeccion;

    req.getConnection((err, conn) => {
        conn.query(`INSERT INTO tbltema (nombre, estatus, fechaRegistro, cveSeccion) 
        values ('${nombre}', ${estatus}, CURDATE(), '${cveSeccion}')`, (error, rows) => {
            if(!error){
                usuario = req.session.cveUsuario;
                res.render('curso/editarCurso',{seccion:true});
            }else{
                usuario = req.session.cveUsuario;
                res.render('curso/editarCurso',{error_seccion:true});
            }
        });
    });
}

function eliminarSeccion(req, res) {
    req.getConnection((err, conn) => {
        conn.query(`SELECT nombre, descripcion, estatus, date_format(fechaRegistro, "%d-%m-%Y") AS fecha, rutaImagen, cveCurso FROM tblcurso WHERE cveCurso = ${req.body.cveCurso}`, (err, cursodata) => {
            if(err){
                res.render(err)
            }else{
                req.getConnection((err, conn) => {
                    conn.query(`SELECT nombre, descripcion, estatus, cveSeccion, date_format(fechaRegistro, "%d-%m-%Y") AS fecha, cveCurso FROM tblseccion WHERE cveCurso = ${req.body.cveCurso}`, (err, seccionesdata) => {
                        if(err){
                            res.render(err)
                        }else{
                            res.render("curso/editarCurso", {secciones: seccionesdata, miscursos: cursodata,eliminarSeccion:true, cveSeccion:req.body.cveSeccionEliminar})
                        }
                    });
                });
            }
   
        });
    });
}

function borrarSeccion(req, res) {
    var id = req.params.id;
    console.log("Mi id:"+req.params.id);
    req.getConnection((err, conn) => {
        conn.query(`SELECT cveTema FROM tblTema WHERE cveSeccion = ${id}`, (error, rows) => {
            if(!error){
                rows.forEach(element => {
                    console.log(element.cveTema);
                    req.getConnection((err, conn) => {
                        conn.query(`DELETE FROM tblTema WHERE cveTema = ${element.cveTema}`, (error, rows) => {
                            if(!error){
                                console.log("Se elimino correctamente.");
                            }else{
                                console.log(error);
                            }
                        });
                    });
                });
            }else{
                console.log(error);
            }
        });
    });

    req.getConnection((err, conn) => {
        conn.query(`DELETE FROM tblSeccion WHERE cveSeccion = ${id}`, (error, rows) => {
            if(!error){
                console.log("Se elimino la sección correctamente.");
            }else{
                console.log(error);
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
                                            res.render("curso/editarCurso", {secciones: seccionesdata, miscursos: cursodata,eliminarTema:true, cveTema:req.body.cveTema})
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
    conn.query(`UPDATE tblTema SET nombre = '${nombre}' WHERE cveTema = ${cveTema}`, (error, rows) => {
        if(!error){
            req.getConnection((err, conn) => {
                conn.query(`SELECT cveTema, nombre, descripcion, teoria, rutaImagen FROM tblTema WHERE cveTema = ${cveTema}`, (error, temaData) => {
                    if(!error){
                        req.getConnection((err, conn) => {
                            conn.query(`SELECT cveMaterial, rutaMaterial, cveTema FROM tblMaterial WHERE cveTema = ${cveTema}`, (error, materialData) => {
                                if(!error){
                                    console.log("Se elimino el tema correctamente.");
                                    res.render('curso/editarTema',{cambioTema:true, temas:temaData, material:materialData})
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
    console.log(nombreArchivo+ "Tema" + cveTema);
    req.getConnection((err, conn) => {
        conn.query(`INSERT INTO tblMaterial (rutaMaterial, fechaRegistro, cveTema) 
        values ('${nombreArchivo}', CURDATE(), ${cveTema})`, (err, rows) => {
            if(!err){
                req.getConnection((err, conn) => {
                    conn.query(`SELECT cveTema, nombre, descripcion, teoria, rutaImagen FROM tblTema WHERE cveTema = ${cveTema}`, (error, temaData) => {
                        if(!err){
                            req.getConnection((err, conn) => {
                                conn.query(`SELECT cveMaterial, rutaMaterial, cveTema FROM tblMaterial WHERE cveTema = ${cveTema}`, (error, materialData) => {
                                    if(!err){
                                        console.log("Se agrego el material de manera correcta.");
                                        res.render('curso/editarTema',{agregarMaterial:true, temas:temaData, material:materialData})
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
        conn.query(`SELECT cveTema, nombre, descripcion, teoria, rutaImagen FROM tblTema WHERE cveTema = ${cveTema}`, (err, temaData) => {
            if(err){
                res.render(err)
            }else{
                temaData.forEach(element => {
                    req.getConnection((err, conn) => {
                        conn.query(`SELECT cveMaterial, rutaMaterial, cveTema FROM tblMaterial WHERE cveTema = ${cveTema}`, (err, materialData) => {
                            if(err){
                                res.render(err)
                            }else{
                                res.render("curso/editarTema", {material:materialData, temas:temaData,eliminarMaterial:true, cveTema:cveTema, cveMaterial:cveMaterial})
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
        conn.query(`SELECT tm.cveTema, tt.nombre, tt.teoria FROM tblMaterial tm inner join tblTema tt On tm.cveTema = tt.cveTema WHERE cveMaterial = ${id}`, (err, temaData) => {
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
                        conn.query(`SELECT cveMaterial, rutaMaterial, cveTema FROM tblMaterial WHERE cveTema = ${element.cveTema}`, (err, materialData) => {
                            if(err){
                                res.render(err)
                            }else{
                                res.render("curso/editarTema", {material:materialData, temas:temaData,cveTema:element.cveTema})
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
                    conn.query(`SELECT cveMaterial, rutaMaterial, cveTema FROM tblMaterial WHERE cveTema = ${cveTema}`, (err, materialData) => {
                        if(err){
                            res.render(err)
                        }else{
                            req.getConnection((err, conn) => {
                                conn.query(`SELECT cveTema, nombre, teoria FROM tblTema WHERE cveTema = ${cveTema}`, (err, temaData) => {
                                    if(err){
                                        res.render(err)
                                    }else{
                                        res.render("curso/editarTema", {material:materialData, temas:temaData,cveTema:cveTema})
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
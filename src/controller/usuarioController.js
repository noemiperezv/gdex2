const express = require('express');
const cors = require('cors');
const sharp = require('sharp');
const app = express();
const Swal = require('sweetalert2')
const jwt = require("jsonwebtoken");
const { promisify } = require('util')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());


function editarPerfil(req, res) {
    const cveUsuario = req.params.id;
    console.log(cveUsuario);
    req.getConnection((err, conn) => {
        conn.query('SELECT cveUsuario, nombre, apellidos, matricula, email FROM tblusuario WHERE cveUsuario = ?', [cveUsuario], (err, usuariodata) => {
            if (usuariodata.length > 0) {
                res.render("usuario/editarPerfil", { usuario: usuariodata, sesion: req.session, flash: req.flash('message') });
                console.log(JSON.parse(JSON.stringify(usuariodata)));
            } else {
                res.render('usuario/editarPerfil', { error: 'Error: No se pudieron obtener los datos de usuario.', sesion: req.session });
            }
        });
    });
}

function modificarUsuario(req, res) {
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query(`UPDATE tblusuario set nombre = '${data.name}', apellidos = '${data.lastname}', matricula = '${data.matricula}', email = '${data.email}' WHERE cveUsuario = ?`, [data.cveUsuario], (err, usuariodata) => {

                conn.query('SELECT cveUsuario, nombre, apellidos, matricula FROM tblusuario WHERE cveUsuario = ?', [data.cveUsuario], (err, usuariomodificadodata) => {
                    if (err) {
                        req.flash('message', 'No se pudieron modificar los datos');
                        res.redirect(`/usuario/editarPerfil/${data.cveUsuario}`);
                    } else {
                        req.flash('message', 'Se modificaron los datos correctamente');
                        res.redirect(`/usuario/editarPerfil/${data.cveUsuario}`);
                    }
                });

        });
    });
}

function cambiarPassword(req, res) {
    const idUsuario = req.params.id;
    res.render("usuario/cambiarPassword", {sesion: req.session, cveUsuario: idUsuario});
}

function modificarPassword(req, res) {
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query(`UPDATE tblusuario set nombre = '${data.name}', apellidos = '${data.lastname}', matricula = '${data.matricula}', email = '${data.email}' WHERE cveUsuario = ?`, [data.cveUsuario], (err, usuariodata) => {

                conn.query('SELECT cveUsuario, nombre, apellidos, matricula FROM tblusuario WHERE cveUsuario = ?', [data.cveUsuario], (err, usuariomodificadodata) => {
                    if (usuariomodificadodata.length > 0) {
                        //res.render(`/usuario/editarPerfil/${data.cveUsuario}`, { usuario: usuariomodificadodata, sesion: req.session });
                        req.flash('message', '1');
                        res.redirect(`/usuario/editarPerfil/${data.cveUsuario}`);
                    } else {
                        //res.render('usuario/editarPerfil', { error: 'Error: No se pudieron obtener los datos del usuario.', sesion: req.session });
                        req.flash('message', '0');
                        res.redirect(`/usuario/editarPerfil/${data.cveUsuario}`);
                    }
                });

        });
    });
}

module.exports = {
    editarPerfil,
    modificarUsuario,
    cambiarPassword,
    modificarPassword,
}
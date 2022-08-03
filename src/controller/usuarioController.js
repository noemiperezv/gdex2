const express = require('express');
const cors = require('cors');
const sharp = require('sharp');
const app = express();
const Swal = require('sweetalert2')
const jwt = require("jsonwebtoken");
const { promisify } = require('util')
const { hash } = require('bcrypt');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

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

function editarPerfil(req, res) {
    const cveUsuario = req.params.id;
    console.log(cveUsuario);
    req.getConnection((err, conn) => {
        conn.query('SELECT cveUsuario, nombre, apellidos, matricula, email FROM tblusuario WHERE cveUsuario = ?', [cveUsuario], (err, usuariodata) => {
            if (usuariodata.length > 0) {
                res.render("usuario/editarPerfil", { usuario: usuariodata, sesion: req.token.user, flash: req.flash('message') });
                console.log(JSON.parse(JSON.stringify(usuariodata)));
            } else {
                res.render('usuario/editarPerfil', { error: 'Error: No se pudieron obtener los datos de usuario.', sesion: req.token.user });
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
    res.render("usuario/cambiarPassword", { sesion: req.token.user, cveUsuario: idUsuario });
}

function modificarPassword(req, res) {
    const data = req.body;
    if (data.password === data.confirmpassword) { //Verifica si la contraseña actual es igual a la confirmacion
        if (data.newpassword === data.confirmnewpassword) {
            bcrypt.hash(data.newpassword, 12).then(hash => { //Crea el hash de la nueva contraseña
                data.newpassword = hash; //Asigna el hash de la nueva contraseña

                req.getConnection((err, conn) => {
                    conn.query('SELECT cveUsuario, password FROM tblusuario WHERE cveUsuario = ?', [req.token.user.cveUsuario], (err, userdata) => { //Consulta la contraseña actual del usuario en bd
                        if (userdata.length > 0) {
                            const element = JSON.parse(JSON.stringify(userdata))

                            bcrypt.compare(data.password, element[0].password, (err, isMatch) => { //Verifica que la contraseña actual introducida sea la misma que en bd
                                if (!isMatch) {
                                    res.render('usuario/cambiarPassword', { error: 'Error: Contraseña actual incorrecta.' });
                                } else {
                                    conn.query(`UPDATE tblusuario SET password = '${data.newpassword}' WHERE cveUsuario = ?`, [req.token.user.cveUsuario], (err, passwords) => { //Actualiza en bd la nueva contraseña
                                        if (err) {
                                            res.render('usuario/cambiarPassword', { error: 'No se pudo cambiar la contraseña.', sesion: req.token.user });
                                        } else {
                                            res.render('usuario/cambiarPassword', { success: 'Se cambió la contraseña.', sesion: req.token.user });
                                        }
                                    });

                                }
                            });
                        } else {
                            res.render('usuario/cambiarPassword', { error: 'Error: No se pudieron consultar los datos.', sesion: req.token.user });
                        }
                    });
                });
            });

        } else {
            res.render('usuario/cambiarPassword', { error: 'Error: Nuevas contraseñas no coinciden.', sesion: req.token.user });
        }

    } else {
        res.render('usuario/cambiarPassword', { error: 'Error: Contraseñas actuales no coinciden.', sesion: req.token.user });
    }


}

module.exports = {
    editarPerfil,
    modificarUsuario,
    cambiarPassword,
    modificarPassword,
    verifytoken,
}
const { hash } = require('bcrypt');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { promisify } = require('util')
const { validationResult } = require('express-validator');


function login(req, res) {
    if (req.session.loggedin != true) {
        //res.render('auth/index', {flash: req.flash('message')});
        res.render('auth/index');
    } else {
        res.redirect('/inicio');
    }

}

function registrar(req, res) {
    if (req.session.loggedin != true) {
        res.render('auth/registrar');
    } else {
        res.redirect('/inicio');
    }
}


//Método para logearse
function auth(req, res) {
    const data = req.body;
    const errors = validationResult(req);
    console.log(errors);

    if (!errors.isEmpty()) {
        const validaciones = errors.array();
        res.render('auth/index', { validaciones: validaciones, valores: data });
        //return res.status(422).json({ errors: errors.array() });
    }
    else {
        req.getConnection((err, conn) => {
            conn.query('SELECT cveUsuario, nombre, apellidos, matricula, email, password, fechaRegistro, cveRol FROM tblusuario WHERE email = ?', [data.email], (err, userdata) => {
                if (userdata.length > 0) {
                    const element = JSON.parse(JSON.stringify(userdata))

                    bcrypt.compare(data.password, element[0].password, (err, isMatch) => {
                        if (!isMatch) {
                            res.render('auth/index', { error: 'Error: Contraseña incorrecta.', valores: data });
                        } else {
                            req.session.loggedin = true;
                            req.session.cveUsuario = element.cveUsuario;
                            req.session.nombre = element.nombre;
                            req.session.apellidos = element.apellidos;
                            req.session.matricula = element.matricula;
                            req.session.email = element.email;
                            req.session.fechaRegistro = element.fechaRegistro;
                            req.session.cveRol = element.cveRol;
                            const token = jwt.sign({ user: element[0] }, 'secretkey', { expiresIn: '1h' })

                            const cookiesOptions = {
                                expires: new Date(Date.now() + 50000),
                                httpOnly: true
                            }
                            res.cookie('jwt', token, cookiesOptions)

                            res.redirect('/inicio');
                        }
                    });
                } else {
                    res.render('auth/index', { validaciones: errors, valores: data, error: 'Error: Usuario no existe.' });
                }
            });
        });
    }
}

function logout(req, res) {
    res.clearCookie('jwt');
    if (req.session.loggedin == true) {
        req.session.destroy();

    }
    //req.flash('message', 'Has cerrado sesión correctamente.');
    res.redirect('/');
}

function regUser(req, res) {
    const data = req.body;
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
        const validaciones = errors.array();
        res.render('auth/registrar', { validaciones: validaciones, valores: data });
        //return res.status(422).json({ errors: errors.array() });
    }
    else {

        req.getConnection((err, conn) => {
            conn.query('SELECT nombre FROM tblusuario WHERE email = ?', [data.email], (err, userdata) => {

                if (userdata.length > 0) {
                    res.render('auth/registrar', { error: 'Error: El usuario ya existe.' });
                } else {
                    if (data.password === data.confirmarpassword) {
                        bcrypt.hash(data.password, 12).then(hash => {
                            data.password = hash;

                            req.getConnection((err, conn) => {
                                conn.query(`INSERT INTO tblusuario (nombre, apellidos, matricula, email, password, fechaRegistro, cveRol) values ('${data.name}', '${data.lastname}', '${data.matricula}', '${data.email}', '${data.password}', CURDATE() , '${data.rol}')`, (err2, rows) => {

                                    conn.query('SELECT cveUsuario, nombre, apellidos, matricula, email, password, fechaRegistro, cveRol FROM tblusuario WHERE email = ?', [data.email], (err, emails) => {
                                        req.session.loggedin = true;
                                        emails.forEach(datos => {
                                            req.session.cveUsuario = datos.cveUsuario;
                                            req.session.nombre = datos.nombre;
                                            req.session.apellidos = datos.apellidos;
                                            req.session.matricula = datos.matricula;
                                            req.session.email = datos.email;
                                            req.session.fechaRegistro = datos.fechaRegistro;
                                            req.session.cveRol = datos.cveRol;

                                        });

                                        res.redirect('/inicio');
                                    });
                                });
                            });
                        });
                    } else {
                        res.render('auth/registrar', { error: 'Error: Contraseñas no coinciden.', valores: data });

                    }

                }
            });
        });
    }
}

module.exports = {
    login,
    registrar,
    logout,
    regUser,
    auth
}

const express = require('express');
const path = require('path');
const myconnection = require('express-myconnection');
const mysql = require('mysql');
const session = require('express-session');
const loginRoutes = require('./routes/login');
const signupRoutes = require('./routes/signup');
const indexRoutes = require('./routes/index');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const bcryptsjs = require('bcryptjs');
const {body, validationResult} = require('express-validator');
const connection = require('express-myconnection');

const app= express();

//Configuración 
app.set('port',3000);

//Asignación de puerto
app.listen(app.get('port'), ()=>{
    console.log("Corriendo en puerto: http://localhost:"+app.get('port'));
});

//se usaran archivos tipo hbs para las vistas y se asigna la carpeta vistas para obtener las vistas de esa carpeta
//motor de plantilla


app.set('views', __dirname + '/views');
app.engine('.hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main', 
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
}));
app.set('view engine', 'hbs');

//bodyparser sera usado para acceder a informacion del cuerpo de las peticiones
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


//morgan sera usado para ver todas las peticiones que se hagan al servidor
app.use(morgan('dev'))

//base de datos
app.use(myconnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306',
    database: 'gdex'
}));


//routes

//Ruta login
app.use('/login', loginRoutes);

app.get('/',(req,res)=>{
    res.send("Bienvenidos");
});

app.use('/index', indexRoutes);

app.get('/index',(req,res)=>{
    res.send('/index');
});

app.use('/signup', signupRoutes);


//Método para registrar
app.post('/signup',[
    body('nombre', '')
    .exists()
    .withMessage('')
    .isLength({min:3},{max:350})
    .withMessage('El nombre es un campo requerido y debe contener al menos tres carácteres'),
    body('apellidos', '')
    .exists()
    .withMessage('Los apellidos son un campo requerido y deben tener un mínimo de 3 carácteres.')
    .isLength({min:3})
    .withMessage('Los apellidos deben tener un mínimo de 3 carácteres.'),
    body('correo','ug')
    .exists()
    .isLength({min:3},{max:450})
    .withMessage('El correo es un campo requerido.')
    .isEmail()
    .withMessage('Ingrese un correo válido.'),
    body('matricula','La matrícula es un campo requerido.')
    .exists()
    .isNumeric()
    .isLength({min:10},{max:10})
    .withMessage('La matrícula debe estar formada por 10 números.'),
    body('rol', 'Selecciona un rol.')
    .exists()
    .custom((value) => {
        if(value != 1 && value != 2){
            throw new Error('Seleccione un rol.')
        }
        return true;
    }),
    body('contraseña', 'La contraseña debe tener mínimo 8 carácteres.')
    .exists()
    .isLength({min:8}),
    body('contraseña2', 'Confirma la contraseña.')
    .exists()
    .custom((value,{req}) =>{
        if(value != req.body.contraseña){
            throw new Error('Las contraseñas no coinciden.')
        }
        return true;
    })
], 
async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(req.body)
        const valores = req.body
        const validaciones = errors.array()
        res.render('auth/signup', {errores:true, validaciones: validaciones, valores:valores})
        console.log('Hasta aquí llega')
    }else{
        console.log('Hasta aquí llega')
        const nombre = req.body.nombre;
        const apellidos = req.body.apellidos;
        const matricula = req.body.matricula;
        const correo = req.body.correo;
        const rol = req.body.rol;
        const contraseña = req.body.contraseña;
        const fecha = new Date();
        let passwordHash = await bcryptsjs.hash(contraseña,8);
        req.getConnection((err, conn) => {
            conn.query("Select * from tblusuario Where email = " + "'"+correo + "'",
            (error, results)=>{
                console.log('Hasta aquí llega cf'+error)
                if(results.length >= 0) {
                    res.render('auth/signup',{
                        correo:true
                    });   
            }else{
                console.log('error')
                conn.query("Insert into tblusuario (nombre, apellidos, matricula, email, cveRol, password, fechaRegistro) values ( ?" + "'"+nombre+"' , '"+apellidos+"' ,'"+matricula+"' ,'"+
                correo+"' ,"+rol+", '"+passwordHash+"', '"+fecha+"')",{},
                    async(error, results)=>{
                        if (error){
                            console.log(error);
                        }else{
                            res.render('auth/signup',{
                                alert:true
                            })
                        }
                    });   
            }
        })
    });
    }
    
    
})
//se asigna la ruta /static para poder hacer uso de archivos css,js, img, videos , etc.
app.use('/static', express.static('src/views/public'));


//Al acceder a cualquier ruta no existente mandara a una página de error
app.get('*', (req, res) => {
    res.render('error/');
});

//Variable para session
app.use(session({
    secret:'secret',
    resave: true,
    saveUninitialized: true
}));

//Uso de sesiones
app.get('/', (req, res) => {
    req.session.usuario = 'Julietta';
    req.session.rol = 'rol';
    req.session.visitas = req.session.visitas ? ++req.session.visitas : 1;
    res.send(`El usuario: ${req.session.usuario} ha visitado esta página ${req.session.visitas}`)
})

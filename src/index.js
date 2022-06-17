
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


//se asigna la ruta /static para poder hacer uso de archivos css,js, img, videos , etc.
app.use('/static', express.static('src/views/public'));


//Al acceder a cualquier ruta no existente mandara a una página de error
app.get('*', (req, res) => {
    res.render('error/');
});
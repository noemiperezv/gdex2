
const express = require('express');
const path = require('path');
const myconnection = require('express-myconnection');
const mysql = require('mysql');
const session = require('express-session');
const loginRoutes = require('./routes/loginRoutes');
const inicioRoutes = require('./routes/inicioRoutes');
const cursoRoutes = require('./routes/cursoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const flash = require('connect-flash');
const cookieParser = require('cookie-parser');


const app = express();

//Configuración 
app.set('port', 3000);
app.use(cookieParser())

var port = process.env.PORT || 3000;
app.set('port', port);

//Asignación de puerto
app.listen(app.get('port'), () => {
    console.log("Corriendo en puerto: http://localhost:" + app.get('port'));
});

app.use(flash());

//se usaran archivos tipo hbs para las vistas y se asigna la carpeta vistas para obtener las vistas de esa carpeta
//motor de plantilla


app.set('views', __dirname + '/views');
app.engine('.hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/',
    helpers: require('./config/handlebars-helpers') //only need this
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
    database: 'gdex2'
}));
//Uso de sesiones
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000,
        sameSite: false,
        path: '/',
        secure: false,
        httpOnly: true,
    }
}));

//routes

//Ruta login
app.use('/', loginRoutes);
app.use('/inicio', inicioRoutes);
app.use('/curso', cursoRoutes);
app.use('/usuario', usuarioRoutes);

//se asigna la ruta /static para poder hacer uso de archivos css,js, img, videos , etc.
app.use('/static', express.static('src/views/public'));

//Al acceder a cualquier ruta no existente mandara a una página de error
app.get('*', (req, res) => {
    res.render('error/');
});

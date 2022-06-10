
const express = require('express');
const path = require('path');
const myconnection = require('express-myconnection');
const mysql = require('mysql');
const session = require('express-session');
const loginRoutes = require('./routes/login');
const { engine } = require('express-handlebars');
const bodyParser = require('body-parser');

const app= express();

//Configuración 
app.set('port',3000);

//Asignación de puerto
app.listen(app.get('port'), ()=>{
    console.log("Corriendo en puerto: http://localhost:"+app.get('port'));
});

//se usaran archivos tipo hbs para las vistas y se asigna la carpeta vistas para obtener las vistas de esa carpeta
//motor de plantilla


app.set('views', __dirname + '/vistas');
app.engine('.hbs', engine({
    extname: '.hbs',
    defaultLayout: 'main', 
    layoutsDir: __dirname + '/vistas/layouts/',
    partialsDir: __dirname + '/vistas/partials/'
}));
app.set('view engine', 'hbs');


//base de datos
app.use(myconnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3309',
    database: 'gdex'
}));


//routes

//Ruta login
app.use('/login', loginRoutes);

app.get('/',(req,res)=>{
    res.send("Bienvenidos");
});

//se asigna la ruta /static para poder hacer uso de archivos css,js, img, videos , etc.
app.use('/static', express.static('src/public'));




const express = require('express');
const app = express();
function signup(req, res) {
    
    res.render("auth/signup")

}
function consulta(req, res) {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM usuario WHERE email = ?', ['ramirot629@gmail.com'], (err, userdata) => {
            if(err){
                res.render(err)
            }else{
                res.send(userdata)
            }
   
        });
    });
}

//Método para registrar
app.post('/signup', async(req,res)=>{
    const nombre = req.body.nombre;
    const apellidos = req.body.apellidos;
    const matricula = req.body.matricula;
    const correo = req.body.correo;
    const rol = req.body.rol;
    const contraseña = '12345678';
    let passwordHash = await bcryptsjs.hash(contraseña,8);
    conn.query('Select * from tblusuario', {nombre:nombre,apellidos:apellidos,matricula:matricula,
        correo:correo,rol:rol,contraseña:passwordHash},
        async(error, results)=>{
            if (error){
                console.log(error);
            }else{
                res.send('Alta exitosa.')
            }
        });
})


module.exports = {
    signup,
    consulta
}
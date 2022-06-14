
function index(req, res) {
    req.getConnection((err, conn) => {
        conn.query('SELECT c.nombre, c.descripcion, c.estatus, date_format(c.fechaRegistro, "%d-%m-%Y") as fecha, c.rutaImagen, concat_ws(" ", u.nombre, u.apellidos) as nombreCompleto FROM tblcurso c join tblusuario u on u.cveUsuario = c.cveUsuario', (err, userdata) => {
            if(err){
                res.render(err)
            }else{
                res.render("index", {cursos: userdata})
            }
   
        });
    });


}

module.exports = {
    index,
}
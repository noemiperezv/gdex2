function inicio(req, res) {
    req.getConnection((err, conn) => {
        conn.query('SELECT c.nombre, c.descripcion, c.estatus, date_format(c.fechaRegistro, "%d-%m-%Y") AS fecha, c.rutaImagen, concat_ws(" ", u.nombre, u.apellidos) AS nombreCompleto FROM tblcurso c JOIN tblusuario u ON u.cveUsuario = c.cveUsuario', (err, cursosdata) => {
            if(err){
                res.render(err)
            }else{
                res.render("inicio/index", {cursos: cursosdata})
            }
   
        });
    });
  
}
function aprendiendo(req, res) {
    req.getConnection((err, conn) => {
        conn.query('SELECT c.nombre, ec.avanceCurso, c.descripcion, c.estatus, date_format(c.fechaRegistro, "%d-%m-%Y") AS fecha, c.rutaImagen, concat_ws(" ", u.nombre, u.apellidos) AS nombreCompleto FROM tblcurso c JOIN tblusuario u ON u.cveUsuario = c.cveUsuario JOIN tblestudiantecurso ec ON ec.cveUsuario = u.cveUsuario AND ec.cveCurso = c.cveCurso WHERE u.cveUsuario = 1', (err, aprendiendodata) => {
            if(err){
                res.render(err)
            }else{
                res.render("inicio/aprendiendo", {aprendiendo: aprendiendodata})
            }
   
        });
    });
   
}
function datosCurso(req, res) {
    res.render("inicio/datosCurso");
}
function seguirCurso(req, res) {
    res.render("inicio/seguirCurso");
}

module.exports = {
    seguirCurso,
    inicio,
    aprendiendo,
    datosCurso

}
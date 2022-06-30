function crearCurso(req, res) {
    res.render("curso/crearCurso");
}
function editarCurso(req, res) {
    res.render("curso/editarCurso");
}
function editarTema(req, res) {
    res.render("curso/editarTema");
}
function misCursos(req, res) {
    req.getConnection((err, conn) => {
        conn.query('SELECT c.nombre, c.descripcion, c.estatus, date_format(c.fechaRegistro, "%d-%m-%Y") AS fecha, c.rutaImagen FROM tblcurso c JOIN tblusuario u ON u.cveUsuario = c.cveUsuario WHERE u.cveUsuario = 1', (err, miscursosdata) => {
            if(err){
                res.render(err)
            }else{
                res.render("curso/miscursos", {miscursos: miscursosdata})
            }
   
        });
    });
  
}
module.exports = {
    crearCurso,
    misCursos,
    editarTema,
    editarCurso
}
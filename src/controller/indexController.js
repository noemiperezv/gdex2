
function index(req, res) {
    req.getConnection((err, conn) => {
        conn.query('SELECT c.nombre, c.descripcion, c.estatus, date_format(c.fechaRegistro, "%d-%m-%Y") AS fecha, c.rutaImagen, concat_ws(" ", u.nombre, u.apellidos) AS nombreCompleto FROM tblcurso c JOIN tblusuario u ON u.cveUsuario = c.cveUsuario', (err, cursosdata) => {
            if(err){
                res.render(err)
            }else{
                res.render("index", {cursos: cursosdata})
            }
   
        });
    });
}

function misCursos(req, res) {
    req.getConnection((err, conn) => {
        conn.query('SELECT c.nombre, c.descripcion, c.estatus, date_format(c.fechaRegistro, "%d-%m-%Y") AS fecha, c.rutaImagen FROM tblcurso c JOIN tblusuario u ON u.cveUsuario = c.cveUsuario WHERE u.cveUsuario = 1', (err, miscursosdata) => {
            if(err){
                res.render(err)
            }else{
                res.render("miscursos", {miscursos: miscursosdata})
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
                res.render("aprendiendo", {aprendiendo: aprendiendodata})
            }
   
        });
    });
}

module.exports = {
    index,
    misCursos,
    aprendiendo
}
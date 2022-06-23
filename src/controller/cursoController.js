function crearCurso(req, res) {
    res.render("curso/crearCurso");
}
function editarCurso(req, res) {
    res.render("curso/editarCurso");
}
function editarTema(req, res) {
    res.render("curso/editarTema");
}
function misCursosCreados(req, res) {
    res.render("curso/miscursosCreados");
}
module.exports = {
    crearCurso,
    misCursosCreados,
    editarTema,
    editarCurso
}
function inicio(req, res) {
    res.render("inicio/inicio");
}
function misCursos(req, res) {
    res.render("inicio/misCursos");
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
    misCursos,
    datosCurso

}
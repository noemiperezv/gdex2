
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
module.exports = {
    signup,
    consulta
}
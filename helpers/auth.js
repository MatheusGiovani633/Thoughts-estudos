module.exports.checkAuth = function(req,res,next){ // Valida se usuário está logado e evita entrar em paginas privadas para usuarios logados
    const userid = req.session.userid

    if(!userid){
        res.redirect('/login')
    }
    next()
}

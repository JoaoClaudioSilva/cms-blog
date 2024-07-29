module.exports = {
    isLogged: (req, res, next) => {
        if(req.session.user != null && req.session.user != undefined){
            next();
        }

        return res.json({ msg: 'Voce não está logado' });
    },

    isAdmin: (req, res, next) => {
        if(req.session.isAdmin){
            next();
        }
        else{
            return res.json({ msg: 'Você precisa ser administrador para acessar esse recurso' });
        }
    }
}
module.exports = {
    /**
     * Testa se o usuário está logado.
     * 
     * @param {object} req           Requisição HTTP contendo a sessão em req.session.
     * @param {object} res           Objeto de resposta HTTP.
     * @param {function} next        Próximo middleware na cadeia.
     * @returns {undefined | object} Retorna undefined se o usuário estiver logado, caso contrário, retorna um objeto JSON com uma mensagem de erro.
     */
    isLogged: (req, res, next) => {
        if(req.session.user != null && req.session.user != undefined){
            next();
        }
        else{        
            return req.flash('Erro', 'Você não está logado', '/usuario/login' );
        }
    },


    /**
     * Testa se o usuário é admin.
     * 
     * @param {object} req           Requisição HTTP contendo a sessão em req.session.
     * @param {object} res           Objeto de resposta HTTP.
     * @param {function} next        Próximo middleware na cadeia.
     * @returns {undefined | object} Retorna undefined se o usuário for admin, caso contrário, retorna um objeto JSON com uma mensagem de erro.
     */    
    isAdmin: (req, res, next) => {
        if(req.session.isAdmin){
            next();
        }
        else{
            return req.flash('Erro', 'Você precisa ser administrador para acessar esse recurso', '/artigos');
        }
    },
}

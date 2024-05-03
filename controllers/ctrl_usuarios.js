// Módulo que acessa as configurações definidas no .env do projeto
require('dotenv').config();
module.exports = {

    /**
     * Realiza o login do usuário.
     * 
     * @param {object} req Requisição HTTP contendo o usuário e senha em req.body.usuario e req.body.senha e a sessão em req.session.
     * @param {object} res Objeto de resposta HTTP.
     * @returns            Resposta TEMPORÁRIA
     */
    entrarUsuario: async (req, res) => {

        const { usuario, senha } = req.body;

        if(usuario == process.env.USUARIO && senha == process.env.SENHA){
            req.session.user = 'admin';
            req.session.isAdmin = true;

            return req.flash('Sucesso', 'Login bem-sucedido!', '/artigos');
        }

        return req.flash('Erro', 'Erro ao fazer login', true);
    },


    /**
     * Realiza o logout do usuário.
     * 
     * @param {object} req Requisição HTTP contendo o usuário e senha em req.body.usuario e req.body.senha e a sessão em req.session.
     * @param {object} res Objeto de resposta HTTP.
     * @returns            Resposta de redirecionamento para a página de login.
     */
    sairUsuario: (req, res) => {
        req.session.destroy(function(err) {
            if(err) {
                console.log(err);
            }
        });

        return res.redirect('/usuario/login');  
    }
}

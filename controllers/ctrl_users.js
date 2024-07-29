const bcrypt = require('bcrypt');
const model_db = require('../models/model_db');


module.exports = {

    enviarPagina: (req, res) => {
        return res.status(200).render(req.params.action, { session: req.session });
    },

    criarUsuario: async (req, res) => {
        
        const {nome, email, senha} = req.body

        const hashedSenha = await bcrypt.hash(senha, await bcrypt.genSalt(10))

        let answer = await model_db.insere_collection('users', {
            full_name: nome, 
            email: email, 
            password: hashedSenha,
            isAdmin: false
        });

        if(!answer.success){
            switch (answer.err.code){
                case 11000:
                    errMsg = 'Email já existe em outra conta';
                    break;

                default:
                    errMsg = err.errmsg;
            }
            return res.status(409).render('signup', { msg: errMsg });
        }

        return res.status(200).redirect('/login');
    },
    
    entrarUsuario: async (req, res) => {

        const { email, senha } = req.body;
        let answer = await model_db.consulta_collection('users', { email: email });

        if(!answer.success){
            return res.status(401).render('login', { errMsg: 'Email não existe no banco de dados'});
        }
        
        const senhaCorreta = await bcrypt.compare(senha, answer.data[0].password) || false;

        if(!senhaCorreta) return res.status(401).render('login', { msg: 'Credenciais inválidas' });

        req.session.user = answer.data[0].full_name;
        req.session.isAdmin = answer.data[0].isAdmin;

        return res.status(200).json({ msg: 'Logado' });
    },

    sairUsuario: (req, res) => {
        req.session.destroy(function(err) {
            if(err) {
                console.log(err);
            }
        });
    }
}
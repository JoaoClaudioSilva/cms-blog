const helper_access = require("../helpers/helper_access");
const model_db = require("../models/model_db");


module.exports = {
    enviarArtigos: async (req, res) => {
        let answer = await model_db.consulta_collection('articles');
        
        return res.status(200).render('artigos', { arts: answer.data, isAdmin: req.session.isAdmin  });
    },

    buscarArtigo: async (req, res) => {

        let id = req.params.id;
        let answer = await model_db.consulta_collection('articles', id);

        return res.status(200).render('artigo', { artigo: answer.data });
    },

    cmsEditor: (req, res) => {
        return res.status(200).render('editar', { artigo: {acao: 'Criando'}});
    },

    cmsSalvar: async (req, res) => {
        const date = new Date();



        let newContent = { title: req.body.title, content: req.body.content, author: req.session.user, category: req.body.category, date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` };

        let answer = await model_db.insere_collection('articles', newContent);

        if(!answer.success){
            return res.status(401).json({ msg: 'Erro ao incluir artigo no banco de dados'});
        }

        return res.status(200).json({ msg: 'Salvo com sucesso' });
    }
}
const model_db = require('../models/model_db');


module.exports = {
    excluirArtigo: async (req, res) => {
        let id = req.params.id;
        await model_db.exclui_collection('articles', id);
    
        return res.redirect('/artigos')
    },

    editorArtigo: async (req, res) => {

        let id = req.params.id;
        let answer = await model_db.consulta_collection('articles', id);

        return res.status(200).render('editar', { artigo: answer.data }) 
    },

    editarArtigo: async (req, res) => {
        
        let id = req.params.id;

        let newContent = { title: req.body.title, content: req.body.content, category: req.params.category };


        await model_db.edita_collection('articles', id, newContent);
    
        return res.redirect('/artigos');
    }
}
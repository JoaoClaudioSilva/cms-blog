// Módulo com funções de manipulação do arquivo que contém os artigos
const model_artigos = require('../models/model_artigos');     

module.exports = {

    /**
     * Remove um artigo.
     * 
     * @param {object} req Requisição HTTP contendo o título do artigo a ser removido em req.params.titulo.
     * @param {object} res Objeto de resposta HTTP.
     * @returns            Resposta de redirecionamento para a página que lista todos os artigos.
     */
    excluirArtigo: async (req, res) => {
        let titulo = req.params.titulo.replace(/-/g, " ");
        await model_artigos.exclui_artigo(titulo);
    
        return res.redirect('/artigos');
    },


    /**
     * Abre o editor de artigos. 
     * 
     * @param {object} req Requisição HTTP contendo o título do artigo a ser editado em req.params.titulo.
     * @param {object} res Objeto de resposta HTTP.
     * @returns            Resposta com a renderização da página que edita artigos, com o artigo desejado carregado.
     */
    editorArtigo: async (req, res) => {

        let titulo = req.params.titulo.replace(/-/g, " ");
        let answer = await model_artigos.consulta_artigo(titulo);

        return res.status(200).render('editar', { artigo: answer.artigos });
    },


    /**
     * Realiza a alteração do artigo editado. 
     * 
     * @param {object} req Requisição HTTP contendo o título do artigo que será editado em req.params.titulo e o conteúdo editado em req.params.conteudo.
     * @param {object} res Objeto de resposta HTTP.
     * @returns            Resposta de redirecionamento para a página que lista todos os artigos.
     */
    editarArtigo: async (req, res) => {
        
        let titulo = req.params.titulo.replace(/-/g, " ");
        let novoArtigo = { titulo: req.body.titulo, conteudo: req.body.conteudo, categoria: req.body.categoria };

        let answer = await model_artigos.edita_artigo(titulo, novoArtigo);

        if(!answer.success){
            console.log(answer)
            return req.flash('Erro', 'Erro ao editar artigo. ' + answer.error.message, '/artigos')
        }

        return req.flash('Sucesso', 'Editado com sucesso', '/artigos')

    

    }
}

// Módulo com funções de manipulação do arquivo que contém os artigos
const model_artigos = require("../models/model_artigos");

module.exports = {

    /**
     * Carrega todos os atigos.
     * 
     * @param {object} req Requisição HTTP.
     * @param {object} res Objeto de resposta HTTP.
     * @returns            Resposta com a renderização da página que lista todos os artigos.
     */
    enviarArtigos: async(req, res) => {
        let answer = await model_artigos.consulta_artigo();

        return res.status(200).render('artigos', { artigos: answer.artigos, isAdmin: req.session.isAdmin });
    },


    /**
     * Busca um artigo.
     * 
     * @param {object} req Requisição HTTP contendo o título do artigo a ser buscado em req.params.titulo.
     * @param {object} res Objeto de resposta HTTP.
     * @returns            Resposta com a renderização da página do artigo.
     */
    buscarArtigo: async (req, res) => {
        let titulo = req.params.titulo.replace(/-/g, " ");
        let answer = await model_artigos.consulta_artigo(titulo);

        console.log(answer)
        return res.status(200).render('artigo', { artigo: answer.artigos });
    },


    /**
     * Abre o editor em branco para um novo artigo.
     * 
     * @param {object} req Requisição HTTP.
     * @param {object} res Objeto de resposta HTTP.
     * @returns            Resposta com a renderização da página do editor.
     */
    cmsEditor: (req, res) => {
        return res.status(200).render('editar', { artigo: {acao: 'NOVO ARTIGO'}});
    },


    /**
     * Salva um artigo.
     * 
     * @param {object} req Requisição HTTP contendo os dados dos artigo a ser incluído em req.body.
     * @param {object} res Objeto de resposta HTTP.
     * @returns            Resposta com json apresentando o sucesso da inclusão.
     */ 
    cmsSalvar: async (req, res) => {
        const data = new Date()

        const dia = String(data.getDate());
        const mes = String(data.getMonth() + 1);
        const ano = data.getFullYear();

        let novoArtigo = { titulo: req.body.titulo, conteudo: req.body.conteudo, categoria: req.body.categoria, data: `${dia}/${mes}/${ano}` };

        let answer = await model_artigos.insere_artigo(novoArtigo);

        if(!answer.success){
            console.log(answer)
            return req.flash('Erro', 'Erro ao salvar artigo. ' + answer.error.message, '/artigos')
        }

        return req.flash('Sucesso', 'Salvo com sucesso', '/artigos')
    }
}

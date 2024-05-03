module.exports = {

    /**
     * Abre a página solicitada.
     * 
     * @param {object} req Requisição HTTP contendo o nome da página em req.params.action.
     * @param {object} res Objeto de resposta HTTP.
     * @returns            Resposta com a renderização da página solicitada.
     */
    enviarArquivo: (req, res) => {

        return res.status(200).render(`${req.params.action}`, {});
    },
}

module.exports = {
    enviarArquivo: (req, res) => {
        return res.status(200).render(`${req.params.action}`, {});
    },
}
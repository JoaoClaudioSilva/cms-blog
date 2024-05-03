// Importações
const express = require('express');
const router = express.Router();
const helper_acesso = require('../helpers/helper_acesso');
const ctrl_artigos = require('../controllers/ctrl_artigos');


// Rotas relativas a apresentação e manipulação de artigos (criação e edição)
router.get('/cms', helper_acesso.isAdmin, ctrl_artigos.cmsEditor);
router.get('/', ctrl_artigos.enviarArtigos);
router.get('/ler/:titulo', ctrl_artigos.buscarArtigo);

router.post('/cms', helper_acesso.isAdmin, ctrl_artigos.cmsSalvar);


// Exportação
module.exports = router;

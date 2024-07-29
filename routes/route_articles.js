const ctrl_articles = require('../controllers/ctrl_articles');

const express = require('express');
const helper_access = require('../helpers/helper_access');
const router = express.Router();

router.get('/cms', helper_access.isAdmin, ctrl_articles.cmsEditor);
router.get('/', ctrl_articles.enviarArtigos);
router.get('/ler/:id', ctrl_articles.buscarArtigo);

router.post('/cms', helper_access.isAdmin, ctrl_articles.cmsSalvar);

module.exports = router;
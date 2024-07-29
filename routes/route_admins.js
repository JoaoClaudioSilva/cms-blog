const express = require('express');
const router = express.Router();
const helper_access = require('../helpers/helper_access');
const ctrl_admins = require('../controllers/ctrl_admins');

router.get('/excluir/:id', helper_access.isAdmin, ctrl_admins.excluirArtigo);
router.get('/editar/:id', helper_access.isAdmin, ctrl_admins.editorArtigo);
router.post('/editar/:id', helper_access.isAdmin, ctrl_admins.editarArtigo)

module.exports = router;
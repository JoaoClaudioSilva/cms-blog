// Importações
const express = require('express');
const router = express.Router();
const helper_acesso = require('../helpers/helper_acesso');
const ctrl_admins = require('../controllers/ctrl_admins');


// Rotas permitidas apenas a sessões com permissão de administrador (isAdmin)
router.get('/excluir/:titulo', helper_acesso.isAdmin, ctrl_admins.excluirArtigo);
router.get('/editar/:titulo', helper_acesso.isAdmin, ctrl_admins.editorArtigo);

router.post('/editar/:titulo', helper_acesso.isAdmin, ctrl_admins.editarArtigo);


// Exportação
module.exports = router;

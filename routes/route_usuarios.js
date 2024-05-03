//Importação
const express = require('express');
const router = express.Router();
const helper_acesso = require('../helpers/helper_acesso');
const ctrl_usuarios = require('../controllers/ctrl_usuarios');
const ctrl_paginas = require('../controllers/ctrl_paginas');


// Rotas para interação com usuário
router.post('/login', ctrl_usuarios.entrarUsuario);
router.get('/logout', helper_acesso.isLogged, ctrl_usuarios.sairUsuario);
router.get('/:action', ctrl_paginas.enviarArquivo);


// Exportação
module.exports = router;

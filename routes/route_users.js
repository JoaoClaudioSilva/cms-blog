const ctrl_users = require('../controllers/ctrl_users');
const helper_access = require('../helpers/helper_access');
const valid_user = require('../validations/valid_users');

const express = require('express');
const router = express.Router();

router.post('/login', valid_user.validar, ctrl_users.entrarUsuario);
router.post('/signup', valid_user.validar, ctrl_users.criarUsuario);
router.get('/logout', helper_access.isLogged, ctrl_users.sairUsuario);
router.get('/:action', ctrl_users.enviarPagina);

module.exports = router;

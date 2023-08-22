const { Router } = require('express');
const { check } = require('express-validator');
const validarCampos = require('../middleware/validarCampos');
const { login, loginGoogle } = require('../controllers/auth');

const routerAuth = Router();

routerAuth.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login)

routerAuth.post('/google', [
    check('id_token', 'El token es obligatorio').not().isEmpty(),
    validarCampos
], loginGoogle)

module.exports = routerAuth
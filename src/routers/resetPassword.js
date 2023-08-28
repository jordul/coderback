const { Router } = require('express');
const { check, query } = require('express-validator');
const validarCampos = require('../middleware/validarCampos');
const sendEmail = require('../middleware/resetPassword');
const { resetPassword, validarLink, newPassword } = require('../controllers/resetpassword');

const router = Router();

router.post('/reset', [
    check('email','El correo no es valido').isEmail(),
    validarCampos
], resetPassword)

router.get('/',[
    query('token', 'es necesario el token').not().isEmpty(),
    validarCampos
],validarLink)

router.get('/link', ( req, res ) => {
    res.status(400).send('vista para generar nuevamente el correo de restablecimiento')
})

router.get('/vistaNewPassword/:id',     ( req, res ) => {
    res.status(200).send('vista para realizar el cambio de contraseña')
})

router.put('/newpassword/:id', [
    check('id', 'El id es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
],newPassword)

module.exports = router
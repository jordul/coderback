const { Router } = require('express');
const { usuariosGet,usuariosPut,usuariosPost,usuariosDelete } = require('../controllers/usuarios');
const { check, query } = require('express-validator');
const validarCampos = require('../middleware/validarCampos');
const validarJWT = require('../middleware/validarJwt');
const validarRol = require('../middleware/validar-rol');
const { RolValidate, emailExist, usuarioIdExist,isNumber } = require('../DAO/helpers/validators');

const router = Router();

router.get('/', [
    query('limite').custom(isNumber),
    query('desde').custom(isNumber),
    validarCampos
],usuariosGet)

router.put('/:id',[
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(usuarioIdExist),
    validarCampos
], usuariosPut)

router.post('/', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe ser igual o mayor a 6 caracteres').isLength({ min: 6 }),
    check('correo','El correo no es valido').isEmail().custom( emailExist ),
    check('rol').custom( RolValidate ),
    validarCampos
],usuariosPost)

router.delete('/:id', [
    validarJWT,
    validarRol("ADMIN_ROLE","NOSE_ROLE"), 
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(usuarioIdExist),
    validarCampos
], usuariosDelete)

module.exports = router;
const { Router, response } = require('express')
const { check, query } = require('express-validator');
const {validarJWT} = require('../middleware/validarJwt');
const validarCampos = require('../middleware/validarCampos');
const { crearCategoria, categoriaPaginado, categoriaById, updateCategoria, deleteCategoria } = require('../controllers/categoria');
const { isNumber, categoriaIdExist } = require('../DAO/helpers/validators');
const validarRol = require('../middleware/validar-rol');

const router =  Router();   

//Obtener todos las categorias - publico
router.get('/', [
    query('limite').custom(isNumber),
    query('desde').custom(isNumber),
    validarCampos
],categoriaPaginado)
//Obtener las categoria mediante id - publico
router.get('/:id', [
    check('id', 'El id del producto es necesario').not().isEmpty(),
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(categoriaIdExist),
    validarCampos
], categoriaById)
//Crear categorias - privado token
router.post('/', [
    validarJWT,
    check('nombre', 'Nombre es obligatoria').not().isEmpty(),
    validarCampos
], crearCategoria)
//Actualizar categorias - privado toke
router.put('/:id', [
    validarJWT,
    validarRol("ADMIN_ROLE"),
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(categoriaIdExist),
    validarCampos
], updateCategoria)
// Eliminar categoria mediante id - privado token
router.delete('/:id', [
    validarJWT,
    validarRol("ADMIN_ROLE"),
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(categoriaIdExist),
], deleteCategoria)


module.exports = router
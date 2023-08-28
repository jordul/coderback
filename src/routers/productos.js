const { Router } = require("express");
const {validarJWT} = require("../middleware/validarJwt");
const { check, query } = require("express-validator");
const { isNumber, productoIdExist } = require("../DAO/helpers/validators");
const validarCampos = require("../middleware/validarCampos");
const { crearProducto, productoPaginado, productoById, actualizarProducto, deleteProducto } = require("../controllers/productos");
const validarRol = require("../middleware/validar-rol");

const router = Router();

router.get( "/",
  [
    query("limite").custom(isNumber),
    query("desde").custom(isNumber),
    validarCampos,
  ],
  productoPaginado
);

router.get( "/:id",
  [
    check('id', 'El id del Producto es necesario').not().isEmpty(),
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(productoIdExist),
    validarCampos
  ],
  productoById
);

//Crear categorias - privado token
router.post(
  "/",
  [
    validarJWT,
    check("title", "El nombre del producto es Obligatorio").not().isEmpty(),
    check("price").custom(isNumber),
    check("description", "La descripcion del producto es Obligatorio")
      .not()
      .isEmpty(),
    check("categoria", "No es ID correcto").isMongoId(),
    check("categoria", "La categoria del producto es Obligatorio")
      .not()
      .isEmpty(),
    validarCampos,
  ],
  crearProducto
);

//Actualizar categorias - privado toke
router.put('/:id',[
  validarJWT,
  check('id', 'El id del producto es necesario').not().isEmpty(),
  check('id', 'No es un ID correcto').isMongoId(),
  validarRol("ADMIN_ROLE"),
  check('id').custom(productoIdExist),
  validarCampos
], actualizarProducto)

// Eliminar categoria mediante id - privado token
router.delete('/:id',[
  validarJWT,
  check('id', 'El id del producto es necesario').not().isEmpty(),
  check('id', 'No es un ID correcto').isMongoId(),
  validarRol("ADMIN_ROLE"),
  check('id').custom(productoIdExist),
  validarCampos
], deleteProducto)


module.exports = router;

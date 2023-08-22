const { Router } = require("express");
const validarJWT = require("../middleware/validarJwt");
const { check } = require("express-validator");
const { isNumber, cartsIdExist, productoIdExist,  } = require("../DAO/helpers/validators");
const validarCampos = require("../middleware/validarCampos");
const validarRol = require("../middleware/validar-rol");
const { cartsById, crearCarts, actualizarCarts } = require("../controllers/carts");

const router = Router();

router.get( "/:id",
  [
    check('id', 'El id del Producto es necesario').not().isEmpty(),
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(cartsIdExist),
    validarCampos
  ],
  cartsById
);

//Crear categorias - privado token
router.post(
  "/",
  [
    check('id', 'El id del Producto es necesario').not().isEmpty(),
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(productoIdExist),
    check('quantity').custom(isNumber),
    validarCampos,
  ],
  crearCarts
);

//Actualizar categorias - privado toke
router.put('/:cid',[
  check('id', 'El id del producto es necesario').not().isEmpty(),
  check('id', 'No es un ID correcto').isMongoId(),
  check('id').custom(productoIdExist),
  check('cid', 'El id del producto es necesario').not().isEmpty(),
  check('cid', 'No es un ID correcto').isMongoId(),
  check('cid').custom(cartsIdExist),
  check('quantity').custom(isNumber),
  validarCampos
], actualizarCarts)

module.exports = router;

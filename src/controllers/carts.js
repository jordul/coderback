const { request, response } = require("express");
const { Carts } = require("../DAO/models/index");

// obtenerCategorias - populate {}
const cartsById = async (req = request, res = response) => {
  const producto = req.producto;

  res.status(200).json({ producto });
};

const crearCarts = async (req = request, res = response) => {
  const arrayProductos = [];
  const productos = req.body;
  arrayProductos.push(productos);

  try {
    const newCarts = new Carts({ products: arrayProductos });
    await newCarts.save();
    res.status(201).json(newCarts);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en la creacion del producto",
      err: error,
    });
  }
};

const actualizarCarts = async (req = request, res = response) => {
  const carts = req.producto;
  try {
    const index = carts.products.findIndex(product=> product.id._id.toString() === req.body.id);
    console.log(typeof index, index != -1)
    if(index != -1){
        carts.products[index].quantity += Number(req.body.quantity)
        carts.products[index].id = req.body.id

        await Carts.findByIdAndUpdate(req.producto._id, carts)
        return res.status(201).json({ msg: 'Producto Acctualizado' })
    }else{
        carts.products.push(req.body);
        await carts.save();
        res.status(201).json({ msg: 'Producto Acctualizado' })
    };
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en la actualizacion del producto",
      err: error
    });
  }

};

module.exports = {
  cartsById,
  crearCarts,
  actualizarCarts,
};

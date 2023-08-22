const { request, response } = require("express");
const { Categoria, Producto } = require("../DAO/models/index");

// obtenerCategorias - paginado - total - populate
const productoPaginado = async( req = request, res = response ) => {
  const { limite, desde = 0 } = req.query

  try {
    const [totalProductos, productos] = await Promise.all([
      Producto.countDocuments({ status: true }),
      Producto.find({ status: true })
      .limit(limite)
      .skip(desde)
      .populate({path: 'usuario', options: {strictPopulate: false}, select: [ 'nombre', 'correo' ]})
      .populate({path: 'categoria', options: {strictPopulate: false}, select: [ 'nombre' ]})
    ])

    res.status(200).json({ totalProductos,productos })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: `${error}, comuniquese con el administrados`
    })
  }
}
// obtenerCategorias - populate {}
const productoById = async( req = request, res = response ) => {
  const producto = req.producto
  
  res.status(200).json({ producto })
}

const crearProducto = async (req = request, res = response) => {
  const title = req.body.title.toUpperCase()
  const { price, description, categoria } = req.body;

  try {
    const vdCategoria = await Categoria.findById(categoria);
    const vdProducto = await Producto.findOne({ title });

    if (!vdCategoria) {
      return res.status(401).json({
        msg: "Categoria no existe en la BD",
      });
    }

    //verificar si la uid tiene el estado true
    if (!vdCategoria.estado) {
      return res.status(401).json({
        msg: "Categoria no existe en la BD, Eliminada",
      });
    }

    if(vdProducto){
      return res.status(401).json({
        msg: "Producto existe en la BD"
      })
    }

    const data = {
      title: title,
      usuario: req.usuario._id,
      price: price ,
      categoria: vdCategoria._id,
      description: description,
    };

    const newProducto = new Producto(data);
    await newProducto.save();
    console.log('hola')
    res.status(200).json(newProducto)
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en la creacion del producto",
      err: error
    });
  }
};

 // actualizarCategoria
 const actualizarProducto = async( req = request, res = response ) => {
  const updateProducto = req.body
  updateProducto.usuario = req.usuario._id
  try {
    await Producto.findByIdAndUpdate(req.producto._id, updateProducto)
    res.status(201).json({ msg: 'Producto Acctualizado' })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en la actualizacion del producto",
      err: error
    });
  }
}
// borrarCategoria - estado: false
const deleteProducto = async( req = request, res = response ) => {

  try {
    await Producto.findByIdAndUpdate(req.producto._id, { status: false })
    res.status(201).json({ msg: 'Producto Eliminado' })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en la eliminacion del producto",
      err: error
    });
  }

}


module.exports = {
  crearProducto,
  productoPaginado,
  productoById,
  actualizarProducto,
  deleteProducto
}

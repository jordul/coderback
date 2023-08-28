const { response, request } = require("express");
const {Categoria} = require("../DAO/models/index");

// obtenerCategorias - paginado - total - populate
const categoriaPaginado = async( req = request, res = response ) => {
  const { limite, desde = 0 } = req.query;
  
  try {
    const [ total,categoria ] = await Promise.all([
      Categoria.countDocuments({ estado: true }),
      Categoria.find({ estado: true })
      .limit( Number(limite) )
      .skip( Number(desde) )
      .populate({path: 'usuario', options: {strictPopulate: false}, select: [ 'nombre', 'correo' ]})
    ])

    res.status(200).json({ total, categoria })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: `${error}, comuniquese con el administrados`
    })
  }

}
// obtenerCategorias - populate {}
const categoriaById = async( req = request, res = response ) => {
  const categoria = req.producto
  res.status(200).json(categoria)
}

const crearCategoria = async (req = request, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  const {stock} = req.body;

  console.log(nombre)
  try {
    const producto = await Categoria.findOne({ nombre });

    if (producto) {
      return res.status(400).json({
        msg: `La categoria ${producto.nombre} ya existe`,
      });
    }

    const data = {
      nombre: nombre,
      stock: stock,
      usuario: req.usuario._id,
    };

    const categoria = new Categoria(data);
    await categoria.save();
    res.status(201).json(categoria);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en la creacion de la tarea",
      err: error
    });
  }
};

// actualizarCategoria
const updateCategoria = async( req = request, res = response ) => {
  const id = req.params.id
  const stock = req.body
  try {
    await Categoria.findByIdAndUpdate( id, stock )
    res.status(200).json({msg: 'Producto actualizado'})
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en la actualizacion de la categoria",
      err: error
    });
  }
}

// borrarCategoria - estado: false
const deleteCategoria = async( req = request, res = response ) => {
  const id = req.params.id
  try {
    await Categoria.findByIdAndUpdate( id, {estado: false} )
    res.status(200).json({msg: 'Producto eliminado'})
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Error en la eliminacion de la categoria",
      err: error
    });
  }
}

module.exports = {
  crearCategoria,
  categoriaPaginado,
  categoriaById,
  updateCategoria,
  deleteCategoria
};

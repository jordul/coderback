const Role = require("../models/rol");
const { Usuarios, Producto, Categoria, Carts } = require("../models/index");
const { request } = require("express");

const RolValidate = async (rol = "") => {
  const existRol = await Role.findOne({ rol });
  if (!existRol) {
    throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
  }
};
//Verifiacar si el correo existe
const emailExist = async (correo = "") => {
  const existCorreo = await Usuarios.findOne({ correo });
  if (existCorreo) {
    throw new Error(`El correo ya existe`);
  }
};

const usuarioIdExist = async (id = "") => {
  const existId = await Usuarios.findById(id);
  validarId(existId);
};

const validarId = (existId, req = request) => {
  
  if (!existId) {
    throw new Error(`El id no existe`);
  }

  if (!existId.status) {
    throw new Error(`El id no existe`);
  }

  req.producto = existId;
};

const categoriaIdExist = async (id = "") => {
  const existId = await Categoria
    .findById(id)
    .populate({ path: "usuario", select: ["nombre", "correo"] });

  validarId(existId);
};

const productoIdExist = async (id = "") => {

  const existId = await Producto.findById(id)
    .populate({
      path: "usuario",
      options: { strictPopulate: false },
      select: ["nombre", "correo"],
    })
    .populate({
      path: "categoria",
      options: { strictPopulate: false },
      select: ["nombre"],
    });
  validarId(existId);
};

const cartsIdExist = async (id = "") => {

  const existId = await Carts.findById(id)
    .populate({
      path: 'products.id',
      select: 'title price'  // Especifica los campos que quieres obtener de la colección referenciada.
  });
  validarId(existId);
};

const isNumber = async (number) => {
  if (number === "0" || number === "") {
    return (number = 0);
  } else {
    const num = parseInt(number);
    if (!num) {
      throw new Error(`por favor ingrese un numero`);
    }
  }
};

module.exports = {
  RolValidate,
  emailExist,
  usuarioIdExist,
  categoriaIdExist,
  isNumber,
  productoIdExist,
  cartsIdExist
};

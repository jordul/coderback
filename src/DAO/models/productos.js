const { Schema, model } = require("mongoose");

const Producto = new Schema({
    title: {
      type: String,
      required: [true, "El title es obligatorio"],
      unique: true
    },
    status: {
      type: Boolean,
      default: true,
      required: true
    },
    usuario: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario'
    },
    code: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      default: 0
    },
    categoria: {
      type: Schema.Types.ObjectId,
      ref: 'Categoria'
    },
    description: { 
      type: String 
    },
    disponible: { 
      type: Boolean, 
      default: true 
    },
    stock: { 
      type: Number, 
      default: 0 
    },
    thumbnails: { 
      type: [String] 
    }
  });

Producto.methods.toJSON = function () {
  const { __v, _id, estado, ...data } = this.toObject();
  return data;
};

module.exports = model("Producto", Producto);

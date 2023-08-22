const { Schema, model } = require("mongoose");

const Categoria = Schema({
  nombre: {
    type: String,
    require: [true, "El nombre es obligatorio"],
    unique: true
  },
  estado: {
    type: Boolean,
    default: true,
    require: true
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'Usuario'
  }
});

module.exports = model("Categoria", Categoria);
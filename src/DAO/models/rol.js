const { Schema, model } = require("mongoose");

const Role = Schema({
  rol: {
    type: String,
    require: [true, "El rol es obligatorio"],
  },
});

module.exports = model("Role", Role);

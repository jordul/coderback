const { Schema, model } = require("mongoose");

const productSchema = {
    id: {
        type: Schema.Types.ObjectId,
        ref: 'Producto'
    },
    quantity: Number
  };
  
  const Carts = new Schema({
    products: [productSchema],
    status: {
      type: Boolean,
      default: true,
      required: true
    }
  });

Carts.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject();
  return data;
};

module.exports = model("Cart", Carts);

const mongoose = require("mongoose");

let productSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  title: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  _id: false,
});

const CartSchema = new mongoose.Schema({
  products: [productSchema],
  totalPrice: {
    type: Number,
    default: 0,
    min: 0,
  },
});

module.exports = mongoose.model("Cart", CartSchema);

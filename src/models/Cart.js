const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  product: {
    type: [
      {
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
      },
    ],
  },
  totalPrice: {
    type: Number,
  },
});

module.exports = mongoose.model("Cart", CartSchema);

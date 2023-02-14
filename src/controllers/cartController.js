const Cart = require("../models/Cart");
const { NotFoundError, BadRequestError } = require("../utils/error");

exports.createCart = async (req, res) => {
  try {
    await Cart.deleteMany();
    const newCart = await Cart.create({});

    return res
      .setHeader(
        "Location",
        `http://localhost:${process.env.PORT}/api/v1/cart/${newCart._id}`
      )
      .status(201)
      .json(newCart);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.find();
    return res.json({
      data: cart,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.deleteCart = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const cartToDelete = await Cart.findById(cartId);

    if (!cartToDelete) {
      return res.sendStatus(404);
    }

    await cartToDelete.delete(cartId);

    return res.send(`Varukorgen har tagits bort`);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

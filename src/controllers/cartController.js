const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { NotFoundError } = require("../utils/error");

exports.createCart = async (req, res) => {
  try {
    await Cart.deleteMany();
    const newCart = await Cart.create({
      products: [],
      totalPrice: 0,
    });

    return res
      .setHeader(
        "Location",
        `http://localhost:${process.env.PORT}/api/v1/carts/${newCart._id}`
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
    const cartId = req.params.cartId;
    const cart = await Cart.findById(cartId);
    if (!cart) throw new NotFoundError("This cart does not exist");
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

exports.deleteCart = async (req, res, next) => {
  try {
    const cartId = req.params.cartId;

    const cartToDelete = await Cart.findById(cartId);

    if (!cartToDelete) throw new NotFoundError("This cart does not exist");

    await cartToDelete.delete();

    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.addProductToCart = async (req, res, next) => {
  try {
    const cartId = req.params.cartId;
    const productId = req.body.productId;

    const cart = await Cart.findById(cartId);
    if (!cart) throw new NotFoundError("This cart does not exist");

    const product = await Product.findById(productId);
    if (!product) throw new NotFoundError("This product does not exist");

    const productToCart = cart.products;

    const productSpec = {
      productId: productId,
      title: product.title,
      brand: product.brand,
      color: product.color,
      price: product.price,
    };

    productToCart.push(productSpec);

    cart.totalPrice += productSpec.price;

    const updatedCart = await cart.save();

    res.send(`Varukorg med id: ${cartId} har uppdaterats`);
    return res.json(updatedCart);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.removeProductFromCart = async (req, res, next) => {
  try {
    const cartId = req.params.cartId;
    const productId = req.body.productId;

    const cart = await Cart.findById(cartId);
    if (!cart) throw new NotFoundError("This cart does not exist");

    const product = await Product.findById(productId);
    if (!product) throw new NotFoundError("This product does not exist");

    const productFromCart = cart.products;

    const foundProduct = productFromCart.find(
      (product) => product.productId == productId
    );

    if (foundProduct) {
      let index = cart.products.indexOf(foundProduct);
      cart.totalPrice -= foundProduct.price;
      cart.products.splice(index, 1);
    }

    const updatedCart = await cart.save();

    res.send(`Varukorg med id: ${cartId} har uppdaterats`);
    return res.json(updatedCart);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

const Product = require("../models/Product");
const { NotFoundError } = require("../utils/error");

exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) throw new NotFoundError("This product does not exist");
    return res.json({
      data: product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) throw new NotFoundError("No products found");
    return res.json({
      data: products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
    });
  }
};

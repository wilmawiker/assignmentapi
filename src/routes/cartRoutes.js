const express = require("express");
const router = express.Router();
const {
  createCart,
  getCart,
  deleteCart,
  addProductToCart,
  removeProductFromCart,
} = require("../controllers/cartController");

router.post("/", createCart);
router.get("/:cartId", getCart);
router.delete("/:cartId", deleteCart);
router.post("/:cartId", addProductToCart);
router.put("/:cartId", removeProductFromCart);

module.exports = router;

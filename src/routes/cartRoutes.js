const express = require("express");
const router = express.Router();
const {
  createCart,
  deleteCart,
  getCart,
} = require("../controllers/cartController");

router.post("/", createCart);
router.delete("/:cartId", deleteCart);
router.get("/", getCart);

module.exports = router;

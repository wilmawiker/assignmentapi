const express = require("express");
const router = express.Router();
const {
  getProductById,
  getAllProducts,
} = require("../controllers/productController");

router.get("/:productId", getProductById);
router.get("/", getAllProducts);

module.exports = router;

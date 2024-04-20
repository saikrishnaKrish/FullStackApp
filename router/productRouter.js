const express = require("express");
const {
  getAllProducts,
  getProductsById,
  createProducts,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getProductsById);
productRouter.post("/", createProducts);
productRouter.patch("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

module.exports = productRouter;

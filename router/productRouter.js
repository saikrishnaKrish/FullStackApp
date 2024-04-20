const express = require("express");
const {
  getAllProducts,
  getProductsById,
  createProducts,
  updateProduct,
  deleteProduct,
  getBigBillionDayProducts,
} = require("../controller/productController");
const { checkInput } = require("../utils/CRUDfacotry");

const productRouter = express.Router();

productRouter.get("/",getBigBillionDayProducts, getAllProducts);
productRouter.get("/:id", getProductsById);
productRouter.post("/", checkInput,createProducts);
productRouter.patch("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

module.exports = productRouter;

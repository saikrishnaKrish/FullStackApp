const express = require("express");
const {
  getAllProducts,
  getProductsById,
  createProducts,
  updateProduct,
  deleteProduct,
  getBigBillionDayProducts,
  getProductCategories
} = require("../controller/productController");
const { checkInput } = require("../utils/CRUDfacotry");

const productRouter = express.Router();

productRouter.get("/", getAllProducts);
productRouter.get("/bigBillionDay",getBigBillionDayProducts, getAllProducts);
productRouter.post("/", checkInput,createProducts);
productRouter.get("/:id", getProductsById);
productRouter.patch("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);
productRouter.get('/categories',getProductCategories);
module.exports = productRouter;

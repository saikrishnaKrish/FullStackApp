const productModel =require("../models/productModel");

const {
  checkInput,
  getAllFactory,
  getElementByIdFactory,
  createFactory,
  deleteElementByIdHandler,
  updateElementByIdFactory
}=require("../utils/CRUDfacotry")

const getAllProducts = getAllFactory(productModel);
const getProductsById=getElementByIdFactory(productModel);
const createProducts  = createFactory(productModel);
const deleteProduct = deleteElementByIdHandler(productModel);
const updateProduct = updateElementByIdFactory(productModel);

module.exports={
  getAllFactory,
  getProductsById,
  createProducts,
  deleteProduct,
  updateProduct,
  getAllProducts
}
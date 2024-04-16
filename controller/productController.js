const productModel = require("../models/productModel");

const checkInput = async (req, res, next) => {
  try {
    const keys = Object.keys(req.body);
    if (keys.length == 0) {
      res.status(400).send("product details can't be empty");
    }
  } catch (err) {
    next(err);
  }
};

const createProductHandler = async (req, res) => {
  try {
    const productDetails = await productModel.create(req.body);

    res.status(201).send({
      message: "success",
      data: productDetails,
    });
  } catch (err) {
    res.status(500).send({
      message: "Unable to create product!!",
      data: err.message,
    });
  }
};
const getAllProductsHandler = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).send({
      status: "success",
      data: products,
    });
  } catch (err) {
    res.status(500).send("Internal Server Error!!");
  }
};

const getProductsByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const productDetails = await productModel.findById(id);
    console.log(productDetails);
    if (!productDetails) {
      res.status(200).send({
        message: "product details not available",
      });
    } else {
      res.status(200).send({
        data: productDetails,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Internal Server Error",
      data: null,
    });
  }
};
const deleteProductsByIdHandler = async (req, res) => {
  const { id } = req.params;
  const deleteproduct = await productModel.findByIdAndDelete(id);
  if (!deleteproduct) {
    res.status(200).send({
      message: "product item not available",
      data: "null",
    });
  } else {
    res.status(200).send({
      message: "product deleted",
      data: deleteproduct,
    });
  }
};
const updateProductsByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    console.log(id);
    const updateproduct = await productModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    console.log(updateproduct);

    if (!updateproduct) {
      console.log("response");
      res.status(200).status({
        message: "product not available!!!",
      });
    } else {
      res.status(200).send({
        message: "product details updated",
        data: updateproduct,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: "Internal Server Error",
      data: null,
    });
  }
};

module.exports = {
  createProductHandler,
  getAllProductsHandler,
  getProductsByIdHandler,
  deleteProductsByIdHandler,
  updateProductsByIdHandler,
};

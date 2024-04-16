const express = require("express");
const {
  checkInput,
  createUserHandler,
  getAllUsersHandler,
  getUserHandler,
} = require("./controller/userController");
const app = express();
const mongoose = require("mongoose");
const {
  getAllProductsHandler,
  createProductHandler,
  deleteProductsByIdHandler,
  updateProductsByIdHandler,
  getProductsByIdHandler,
} = require("./controller/productController");
require("dotenv").config();
const PORT = process.env.PORT;
const DB_URL = process.env.CONNECTION_STRING;

app.use(express.json());

//connectionString for mongodb
mongoose
  .connect(DB_URL)
  .then((connection) => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log("unable to connect", err);
  });

//Routes
//user Routes
app.post("/createUser", checkInput, createUserHandler);
app.get("/getAllUsers", getAllUsersHandler);
app.post("/getuserdetails/:id", getUserHandler);

//product Routes
app.get("/products", getAllProductsHandler);
app.get("/products/:id", getProductsByIdHandler);
app.post("/addproduct", createProductHandler);
app.delete("/products/:id", deleteProductsByIdHandler);
app.patch("/products/:id", updateProductsByIdHandler);

app.get("/", (req, res) => res.status(200).send("Hi Dude!!!"));

app.listen(PORT, () => console.log("server is running", PORT));

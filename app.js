const express = require("express");
// const {
//   checkInput,
//   createUserHandler,
//   getUserHandler,
//   getUserByIdHandlder,
//   updateUserByIdHandler,
//   deleteUserByIdHandler
// } = require("./controller/userController");
const app = express();
const mongoose = require("mongoose");
// const {
//   getAllProductsHandler,
//   createProductHandler,
//   deleteProductsByIdHandler,
//   updateProductsByIdHandler,
//   getProductsByIdHandler,
// } = require("./controller/productController");
const userRouter = require("./router/userRouter");
const productRouter = require("./router/productRouter");
const authRouter = require("./router/authRouter");
const { protectedRoute } = require("./controller/authController");
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
// app.post("/createUser", checkInput, createUserHandler);
// app.get("/getAllUsers", getUserHandler);
// app.get("/getuserdetails/:id", getUserByIdHandlder);
// app.patch("/updateUser/:id",updateUserByIdHandler);
// app.delete("/deleteuser/:id",deleteUserByIdHandler);

app.use("/api/auth",authRouter)

app.use("/api/users",userRouter)


// //product Routes
// app.get("/products", getAllProductsHandler);
// app.get("/products/:id", getProductsByIdHandler);
// app.post("/addproduct", createProductHandler);
// app.delete("/products/:id", deleteProductsByIdHandler);
// app.patch("/products/:id", updateProductsByIdHandler);
app.use("/api/products",productRouter)


app.get("/", (req, res) => res.status(200).send("Hi Dude!!!"));

app.listen(PORT, () => console.log("server is running", PORT));

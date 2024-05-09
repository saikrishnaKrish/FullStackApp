  // const {
  //   checkInput,
  //   createUserHandler,
  //   getUserHandler,
  //   getUserByIdHandlder,
  //   updateUserByIdHandler,
  //   deleteUserByIdHandler
  // } = require("./controller/userController");
  // const {
    //   getAllProductsHandler,
    //   createProductHandler,
    //   deleteProductsByIdHandler,
    //   updateProductsByIdHandler,
    //   getProductsByIdHandler,
    // } = require("./controller/productController");
    
const express = require("express");
const app = express();

require("dotenv").config();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { protectedRoute } = require("./controller/authController");
const loggerMiddleware = require("./utils/logger");
const cors = require('cors');


const DB_URL = process.env.CONNECTION_STRING;
const PORT = process.env.PORT;


//connectionString for mongodb
mongoose
.connect(DB_URL)
.then((connection) => {
  console.log("connected to DB");
})
.catch((err) => {
  console.log("unable to connect", err);
});

app.use(loggerMiddleware)

const authRouter = require("./router/authRouter");
const userRouter = require("./router/userRouter");
const productRouter = require("./router/productRouter");
const bookingRouter = require("./router/bookingRouter");
const reviewRouter = require("./router/reviewRouter");

const corsConfig = {
  origin: true,
  credentials: true,
};

app.use(express.json());
app.use(cookieParser());
app.use(cors(corsConfig))


// this is allowing all the requests
app.use(cors(corsConfig)); 
app.options('*', cors(corsConfig));


//Routes
//user Routes
// app.post("/createUser", checkInput, createUserHandler);
// app.get("/getAllUsers", getUserHandler);
// app.get("/getuserdetails/:id", getUserByIdHandlder);
// app.patch("/updateUser/:id",updateUserByIdHandler);
// app.delete("/deleteuser/:id",deleteUserByIdHandler);
// //product Routes
// app.get("/products", getAllProductsHandler);
// app.get("/products/:id", getProductsByIdHandler);
// app.post("/addproduct", createProductHandler);
// app.delete("/products/:id", deleteProductsByIdHandler);
// app.patch("/products/:id", updateProductsByIdHandler);

app.use("/api/auth", authRouter);

app.use("/api/users", protectedRoute, userRouter);
app.use("/api/products", productRouter);
app.use("/api/bookings",bookingRouter);
app.use("/api/reviews",reviewRouter);
app.get("/", (req, res) => res.status(200).send("Hi Dude!!!"));

app.listen(PORT, () => console.log("server is running", PORT));

const express = require("express");
const Razorpay = require("razorpay");
const app = express();
const dotenv = require("dotenv")
let result = dotenv.config();
const cors = require('cors');
const shortId = require('shortid');
const crypto = require('crypto');

if(!result){
    console.error("Error loading .env file",result.error)
}
// middlewares
app.use(express.json({ extended: false }));
app.use(cors())

// const router = express.Router();
app.post("/checkout", async (req, res) => {
  try {
  
    const instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    // console.log(instance);
    const options= {
            amount:50000,
            currency:"INR",
            receipt:shortId.generate()
    }

    const order = await instance.orders.create(options);
    if(!order){
        return res.status(500).send("some error occurred!");
    }

    return res.json({
      message: "Order created successfully",
      order: order,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.post("/verify",(req,res)=>{
      console.log("webhook called")
      return res.status(200).send("suckcess")
      try{

         
      }
      catch(err){
          console.log(err);
      }
})

app.listen(5000, () => console.log(`Port is running at 5000`));

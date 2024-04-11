//connected to Mongodb
//handling post request


const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const PORT=process.env.PORT;
const DB_URL=process.env.CONNECTION_STRING;




app.use(express.json())

mongoose.connect(DB_URL)
.then((connection)=>{
    console.log("connected to DB")
})
.catch((err)=>{
    console.log("unable to connect",err)
})
const userSchema= new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    confirmPwd:String
})

const User= mongoose.model("User",userSchema);

app.post("/createUser",async (req,res)=>{
    const data=req.body;
    console.log(data)
    const userDetails=await User.create(data)
    res.status(200).json({
        message:"successfully user got created!",
        data:userDetails
    })

    
})




app.get('/',()=>console.log("request recieved!!!"))

app.listen(PORT,()=>console.log("server is running",PORT))
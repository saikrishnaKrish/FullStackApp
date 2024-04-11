const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const PORT=process.env.PORT;
const DB_URL=process.env.CONNECTION_STRING;


app.use(express.json())


//connectionString for mongodb
mongoose.connect(DB_URL)
.then((connection)=>{
    console.log("connected to DB")
})
.catch((err)=>{
    console.log("unable to connect",err)
})

//models
const userModel= require("./models/userModel")


//controllers
const  createUserHandler= async (req,res)=>{
    try{
        const data=req.body;
        console.log(data)
        const userDetails=await userModel.create(data)
        res.status(200).json({
            message:"successfully user got created!",
            data:userDetails
        })
    }
    catch(err){
        // console.log("error occurred",err)
        res.status(500).json({
            message:"unable to create user!",
            data:err.message
        })
    }
  
}


const getAllUsersHandler=async(req,res)=>{
    try{
     const usersList = await userModel.find();
        if(usersList.length==0){
            res.status(200).send("No users available!!!")
        }
        res.status(200).send({
            data:usersList
        })
    }catch(err){
        res.status(500).send("unable to fetch the users list")
    }
    
}
const checkInput = async(req,res)=>{
    const keys = Object.keys(req.body);

    if(keys.length==0){
        res.status(400).send("user fields can't be empty")
    }else{
        next()
    }
}


//Routes

app.post("/createUser",checkInput,createUserHandler)

app.get("/getAllUsers",getAllUsersHandler)


app.get('/',()=>console.log("request recieved!!!"))

app.listen(PORT,()=>console.log("server is running",PORT))
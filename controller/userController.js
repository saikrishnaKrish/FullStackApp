const userModel= require("../models/userModel")

//controllers
const checkInput = async(req,res,next)=>{
    const keys = Object.keys(req.body);

    if(keys.length==0){
        res.status(400).send("user fields can't be empty")
    }else{
        next()
    }
}


const  createUserHandler= async (req,res)=>{
    try{
        const data=req.body;
        console.log(data)
        // console.log(data['phone'].length)
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


module.exports={
    checkInput,
    createUserHandler,
    getAllUsersHandler
}
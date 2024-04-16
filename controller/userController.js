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

const getUserHandler = async(req,res)=>{
    try{
        const {id}=req.params;
        console.log("userId",id)
        const userDetails= await userModel.findById(id);
        if(!userDetails){
            // console.warn("error not occured userDetails",userDetails)

            res.status(200).send({
                message:"user details not available"
            })
        }else{
            res.status(200).send({
                status:"success",
                data:userDetails
            })
        }
            
    
    }
    catch(err){
        res.status(400).send({
            message:"error occurred while fetching the data!!!"
        })
    }
}


module.exports={
    checkInput,
    createUserHandler,
    getAllUsersHandler,
    getUserHandler
}
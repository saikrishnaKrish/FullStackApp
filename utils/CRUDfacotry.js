const checkInput = (req,res,next)=>{
    const details=req.body;
    const isEmpty=Object.keys(details);
    if(!isEmpty){
        res.status(400).json({
            message:"error",
            data:"Input fields cannot be empty"
        })
    }else{
        next()
    }
}

const getAllFactory=(elementModel)=>async(req,res,next)=>{

    try{
        const data = await elementModel.find();
        if(data.length==0){
            throw new Error("No data found!!!")
        } else{
            res.status(200).json({
                message:"success",
                data:data
            })
        }     
    }
    catch(err){
        res.status(500).json({
            message:"error",
            data:err.message
        })  
    }

}


const createFactory=(elementModel)=>async(req,res)=>{
    try{
        const details=req.body;
        const data=await elementModel.create(details);
        res.status(200).json({
            message:"success",
            data:data
        })

    }catch(err){
        res.status(500).json({
            message:"error",
            data:err.message
        })
    }
}

const getElementByIdFactory=(elementModel)=>async(req,res)=>{
    try{
        const {id}=req.params;
        const data=elementModel.findById(id);
        if(!data){
            res.status(404).json({
                message:"error",
                data:`No ${elementModel.modelName} found` 
            })
        }else{
            res.status(200).json({
                message:"success",
                data:data
            })
        }
    }
    catch(err){
        res.status(500).json({
            message:"error",
            data:err.message
        })
    }
}

const updateElementByIdFactory=async(elementModel)=>async(req,res)=>{
try{
    const {id}= req.params;
    const details = req.body;
    const updatedData = await elementModel.findByIdandUpdate(id,{$set:details,$inc:{__v:1}},{new:true});
    if(!updatedData){
        throw new Error("user not found!")
    }else{
        res.status(200).json({
            message:"data was updated successfully",
            data:updatedData
        })
    }
}
catch(err){
    res.status(500).json({
        message:"error",
        data:err.message
    })
}
}

const deleteElementByIdHandler= async (elementModel)=>{
  try{
    const {id}=req.params;
    const deletedData=await elementModel.findByIdAndDelete(id);
    if(!deletedData){
        throw new Error("no data found!")
    }else{
        res.status(200).json({
            message:"data was deleted successfully!!!",
            data:deletedData
        })
    }
  }
  catch(err){
    res.status(500).json({
        message:"error",
        data:err.message
    })
  }
}


module.exports={
    getAllFactory,
    getElementByIdFactory,
    createFactory,
    updateElementByIdFactory,
    deleteElementByIdHandler,
    checkInput
}
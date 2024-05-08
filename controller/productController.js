const productModel = require("../models/productModel");

const {
  getAllFactory,
  getElementByIdFactory,
  createFactory,
  deleteElementByIdHandler,
  updateElementByIdFactory
} = require("../utils/CRUDfacotry");

// const getAllProductsFactory = getAllFactory(productModel);
const getProductsById = getElementByIdFactory(productModel);
const createProducts = createFactory(productModel);
const deleteProduct = deleteElementByIdHandler(productModel);
const updateProduct = updateElementByIdFactory(productModel);

const getAllProducts =async (req, res) => {
  const { sort,select,page,limit,filter} = req.query;
  let queryPromise =productModel.find()
  // console.log(queryPromise)
  if (sort) {
    const [sortParam, order] = sort.split(" ");
    queryPromise = order === "asc" ? queryPromise.sort(sortParam) : queryPromise.sort(`-${sortParam}`);
  }

  if(select){
    queryPromise=queryPromise.select(select);
  }

  if(page && limit){
    const pageNum =page || 1;
    const limitNum =limit ||2;
    const skip =(pageNum-1)*limitNum;
    console.log(skip);
    queryPromise=queryPromise.skip(skip).limit(limitNum);
  }

  if(filter){
    try{
      // console.log("filter",filter);
      const filterObj = JSON.parse(filter);
      // console.log("filterObj",filterObj);
      const filterObjStr  = JSON.stringify(filterObj).replace( 
        // loop over the keys in the object and replace the key with $key
        /\b(gt|gte|lt|lte)\b/g,
      (match)=>`$${match}`);

      // console.log("filterObjStr",filterObjStr);
      queryPromise=queryPromise.find(JSON.parse(filterObjStr))
    }catch(err){
      console.log(err.message)
    }
  }

  try {
    const result = await queryPromise;
    res.status(200).json({
      message: "success",
      data: result
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      error: err.message
    });
  }
};

async function getBigBillionDayProducts(req,res,next){
  console.log("getBigBillionDayProducts");
  req.query.filter=JSON.stringify({price:{lte:400}});
  next();
}

const getProductCategories = async (req,res)=>{
  res.json({
    message:"success",
    data:["electronics","men's clothing","women's clothing","jewelery"]
  })
}
module.exports = {
  getAllFactory,
  getProductsById,
  createProducts,
  deleteProduct,
  updateProduct,
  getAllProducts,
  getBigBillionDayProducts,
  getProductCategories
};

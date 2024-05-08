const productModel = require("../models/productModel");
const reviewModel = require("../models/reviewModel");


const createReview = async (req,res)=>{
     /**
   * get the product id from params
   * get the user id from req.userId
   * get the review from req.body
   * update the average rating of the product
   * create a review
   * produt model update the review
   */
    try{
            const userId = req.userId;
            const {productId} = req.params;
            console.log("productId",productId)
            const {review,rating} = req.body;

            const reviewObj = await reviewModel.create({
                review,
                rating,
                user:userId,
                product:productId
            })
            
            /** update the product reviews */
            const productObj = await productModel.findOne({_id:productId});
            if(!productObj){
                return res.status(404).json({message:"Product not found"})
            }
            
            console.log(productObj)
            const averageRating = productObj.averageRating;
            if(averageRating){
                       /** update the rating by considering the new rating */
                       const sum = averageRating * productObj.reviews.length;
                        const finalRating = (sum + rating) / (productObj.reviews.length + 1) 
                        productObj.averageRating = finalRating;
                         } else{
                        productObj.averageRating=rating;
                        }        
                        
                        console.log(productObj)
                        await productObj.save();
                        return res.status(200).json({
                            message:"review created successfully",
                            reviewObj:reviewObj
                        });
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message:err.message
        })
    }
}


module.exports= {
    createReview
}
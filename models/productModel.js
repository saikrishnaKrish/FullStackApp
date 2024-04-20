const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name must be required"],
  },
  price: {
    type: Number,
    unique: true,
    required: [true, "A product must have a price"],
    validate: {
      validator: (v) => {
        return v > 0;
      },
      message: "price must be greater than zero",
    },
  },
  categories: {
    type: [String],
    required: [true, "A product category is required"],
  },
  images: {
    type: [String],
  },
  description: {
    type: String,
    required: [true, "A product must have a description"],
  },
  discount: {
    type: Number,
    validate: {
      validator: function (v) {
        return v < this.price;
      },
      message: "discount must less than the price",
    },
  },
});

const validCategoires=["electronics","Stationary","furniture","clothing"]
productSchema.pre("save",function(next){
  const inValidCategories =this.categories.filter((category)=>!validCategoires.includes(category.toLocaleLowerCase()))
  if(inValidCategories.length>0){
    throw new Error(`"Invalid categories ",${inValidCategories.join(",")}`)
   }
   else{
    next()
   }
})

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;

const mongoose = require("mongoose");
//creer un schema
const productSchema = new mongoose.Schema(
    {
        name:String,
        price:Number,
        quantity:Number,
        image:String,
        category:{
            type:mongoose.Types.ObjectId,
            ref:"Category"
        }
    }
);

const Product = mongoose.model("Product",productSchema);
module.exports = Product;

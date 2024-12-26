import {Product} from "../models/product.models.js"
import asyncHandler from "../utils/asyncHandler.js"
import apiResponse from "../utils/apiResponse.js"
import apiError from "../utils/apiError.js"

export const addProduct = asyncHandler(async (req,res)=>{
    const {productName,productPrice}= req.body
    if(!productName || !productPrice){
        throw new apiError("Both fields are required",400)
    }

    const registerProduct = await Product.create({
        productName:this.productName,
        productPrice:this.productPrice
    })

    if(!registerProduct){
        throw new apiError("Error occured while registering the product",400)
    }

    const product= await Product.findOne(registerProduct)
    if(!product){
        throw new apiError("No product exists",400)
    }
    return res
    .status(200)
    .json(new apiResponse("Product successfully registered",200,product))
})
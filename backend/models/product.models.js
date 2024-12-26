import mongoose,{Schema} from "mongoose"

const productSchema = new Schema({
    productName:{
        type:String,
        required:true
    },
    productPrice:{
        type :String,
        required:true
    }
})
export const Product = mongoose.model("Product", productSchema)
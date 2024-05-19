//product schema

const mongoose=require('mongoose')

const productSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:Number,
    id:{
        type:String,
        unique:true
    },
    discription:String,
    gender:String,
    qty:Number,
    category:String,
    image:String

})

const productModel =mongoose.model('product',productSchema)

module.exports =productModel
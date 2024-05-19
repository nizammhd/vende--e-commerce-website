const  Product = require('../models/productModel')


const getAllProducts = async (req,res) => {
    try{
        const products = await Product.find()
        res.json(products)
    }catch(err){

        res.status(500).json({error:err.message})
    }
}

const addProduct = async (req,res) =>{
    
    try{
        const {name,price,category,discription,qty,id,image}=req.body
        const product = new Product({name,price,category,discription,qty,id,image})
        await product.save()
        res.json({message:'product added successfully'})
    }
    catch (err) {
        res.status(400).json({ error: err.message });

      }
}
const updateProduct = async (req,res)=>{
    try{
        const { id }=req.params
        const {name,price,category,discription,qty,image}=req.body
        const product= await Product.findByIdAndUpdate(id,{name,price,category,discription,qty,id,image})
        res.json(product)
        console.log('product',product)

    }catch(err){
        res.status(400).json({ error: err.message });

    }
}
const deleteProduct = async (req,res) =>{
    try{
        const {id} = req.params
        await Product.findByIdAndDelete({_id:id})
        res.json({ message: 'Product deleted successfully' })
        console.log("delete successfull")

    }catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
    getAllProducts,
    deleteProduct,
    addProduct,
    updateProduct
}
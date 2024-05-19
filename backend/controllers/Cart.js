//cartControllers

const jwt = require('jsonwebtoken')
const userdb = require('../models/usermodel')
const productdb=require('../models/productModel');
const UserSchem = require('../models/usermodel');


exports.addToCart = async (req, res) => {
    try {
        const { _id } = req.body;
        const userEmail = req.user.email;

        const user = await userdb.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).send('User not found');
        }

        const existingProductIndex = user.cart.findIndex(item => item._id.toString() === _id.toString());
        if (existingProductIndex !== -1) {
            return res.send("Product already added to cart");
        } else {
            const product = await productdb.findById(_id);
            if (product) {
                user.cart.push({
                    _id: product._id.toString(),
                    productName: product.name,
                    image: product.image,
                    quantity: 1,
                    price: product.price
                });
                await user.save();
                return res.send('Product added to cart');
            } else {
                return res.status(404).send('Product not found');
            }
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Error adding product to cart');
    }
};


exports.addToWishlist = async (req, res) => {
    try {
        const { _id } = req.body;
        const UserEmail = req.user.email;
        console.log(_id, "id from params");
        const user = await userdb.findOne({ email: UserEmail });
        console.log(user);
        if (!user) {
            return res.status(404).send('user not found');
        }
        const existingProductIndex = user.wishlist.findIndex((item) => {
            console.log(item)
            return item._id.toString() === _id;
            
        });
        if (existingProductIndex !== -1) {
            return res.send("product already added to wishlist");
        } else {
            const product = await productdb.findById(_id);
            if (product) {
                console.log(product);
                user.wishlist.push(product);
                await user.save();
                return res.send('product added to wishlist');
            } else {
                return res.status(404).send('product not found');
            }
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send('Error adding product to wishlist');
    }
};
exports.Cartdelete =async (req,res) =>{
    try{
        let _id = req.params.id;
        let userEmail = req.user.email;
        
        const user = await userdb.findOne({ email: userEmail });
        
   //finding product to be deleted from user.wishlist array
       let index =  await user.cart.findIndex((item)=>item._id === _id);
       
       //deleting from array 
       await user.cart.splice(index,1)
        
       await user.save()
        res.status(200).json({
            status:"success",
            message:"deleted successfully"
        });
    }catch(err){
        console.log(err.message)
        res.send(err)

    }
    
    

}
exports.wishdelete =async (req,res) =>{
    try{
        let _id = req.params.id;
        let userEmail = req.user.email;
        
        const user = await userdb.findOne({ email: userEmail });
        
   //finding product to be deleted from user.wishlist array
       let index =  await user.wishlist.findIndex((item)=>item._id === _id);
       
       //deleting from array 
       await user.wishlist.splice(index,1)
        
       await user.save()
        res.status(200).json({
            status:"success",
            message:"deleted successfully"
        });
    }catch(err){
        console.log(err.message)
        res.send(err)

    }


}
exports.cartUpdate = async (req, res) => {
    try {
        const _id = req.params.id;
        const userEmail = req.user.email;

        const user = await userdb.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const cartItemIndex = user.cart.findIndex(item => item._id.toString() === _id.toString());
        if (cartItemIndex !== -1) {
            user.cart[cartItemIndex].quantity += 1;
        } else {
            return res.status(404).json({ message: "Cart item not found" });
        }

        await user.save(); // Save the updated user

        res.status(200).json({ message: "Cart item quantity updated successfully", data: user.cart[cartItemIndex] });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
};
exports.cartDelete=async (req,res)=>{
    try{
        let _id = req.params.id;
        let userEmail = req.user.email;
        
        const user = await userdb.findOne({ email: userEmail });
        
   
       let index =  await user.wishlist.findIndex((item)=>item._id.toString() === _id.toString());
       
       await user.wishlist.splice(index,1)
        
       await user.save()
        res.status(200).json({
            status:"success",
            message:"deleted successfully"
        });
    }catch(err){
        console.log(err.message)
        res.send(err.message)

    }
}
exports.getCart= async (req,res)=>{
    let _id = req.params.id;
    let userEmail = req.user.email;
    
    const user = await userdb.findOne({ email: userEmail });
    console.log(user.cart)
    res.send(user.cart)
}
exports.cartDecrease = async (req, res) => {
    try {
        const _id = req.params.id;
        const userEmail = req.user.email;

        const user = await userdb.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const cartItemIndex = user.cart.findIndex(item => item._id.toString() === _id.toString());
        if (cartItemIndex !== -1) {
            user.cart[cartItemIndex].quantity -= 1;
        } else {
            return res.status(404).json({ message: "Cart item not found" });
        }

        await user.save(); // Save the updated user

        res.status(200).json({ message: "Cart item quantity updated successfully", data: user.cart[cartItemIndex] });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: err.message });
    }
};
exports.getWishlist= async (req,res)=>{
    
    let userEmail = req.user.email;
    
    const user = await userdb.findOne({ email: userEmail });
    console.log(user.wishlist)
    res.send(user.wishlist)
}
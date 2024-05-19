//cartRoute

const express =require('express')

const router=express.Router()

const{addToCart, addToWishlist} = require('../controllers/Cart')
const userMiddleware = require('../middleware/userMiddleware')

// router.post('/addToCart',userMiddleware,addToCart)
// router.post('/wishlist',userMiddleware,addToWishlist)
module.exports=router


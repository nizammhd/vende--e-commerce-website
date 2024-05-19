const express= require('express')
const cookieParser=require('cookie-parser')
const routers=express.Router()
 
const app=express()

const userController=require('../controllers/userControle')
const wishlistcon=require("../controllers/Cart")
const userMiddleware = require('../middleware/userMiddleware')
const bodyParser = require('body-parser')

routers.use(bodyParser.json())
routers.use(bodyParser.urlencoded({extended : true}))
routers.use(cookieParser())

routers.post('/signup',userController.userRegister)
routers.post('/login',userController.userLogin,userMiddleware)
routers.post('/wishlist',userMiddleware,wishlistcon.addToWishlist);



module.exports=routers
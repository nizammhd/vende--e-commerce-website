const mongoose = require('mongoose');
const Product = require('./productModel');

const cartItemSchema = new mongoose.Schema({
    _id: {
        type: String,
        required: true // Changed from productid to product
    },
    productName: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    quantity: {
        type: Number,
        default: 1
    },
    price:{
        type:Number,
    }
});

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cart: [cartItemSchema],
    wishlist: [] // Modified to match the actual structure
});

const User = mongoose.model('User', userSchema);
module.exports = User;

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const port = process.env.PORT || 5000;

const productRoutes = require('./routes/productRoutes');
const userRoute = require('./routes/userRoutes');
const adminRouter = require('./routes/adminRoutes');
const cartRoutes = require('./routes/cartRoutes');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userMiddleware = require('./middleware/userMiddleware');
const { addToWishlist, addToCart, Cartdelete, wishdelete, cartUpdate, cartDelete, getCart, cartDecrease, getWishlist } = require('./controllers/Cart');
const { userDelete, userLogout, getUsers } = require('./controllers/userControle');

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: 'POST,PATCH,GET,PUT,DELETE'
}));

// Use bodyParser only once
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

connectDB();

app.use('/api/products', productRoutes);
app.use('/users', userRoute);
app.use('/admin', adminRouter);
app.post('/wishlist',userMiddleware,addToWishlist);
app.post('/cart',userMiddleware,addToCart);
app.delete('/cart/:id',userMiddleware,Cartdelete)
app.delete('/wishlist/:id',userMiddleware,wishdelete)
app.patch('/cart/:id',userMiddleware,cartUpdate)
app.patch('/cart/decrease/:id',userMiddleware,cartDecrease)
app.delete('/cart/:id',userMiddleware,cartDelete)
app.delete('users/:id',userDelete)
app.post('/users/logout',userLogout)
app.get('/cart',userMiddleware,getCart)
app.get('/wishlist/',userMiddleware,getWishlist)
app.delete('/wishlist/:id',userMiddleware,wishdelete)
app.delete('/users/:id',userDelete)
app.get('/users',getUsers)
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

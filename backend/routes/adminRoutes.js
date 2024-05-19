const express=require('express')

const router=express.Router()

const AdminControle=require('../controllers/productControllers')


router.post('/add',AdminControle.addProduct)
router.patch('/:id',AdminControle.updateProduct)
router.delete('/:id',AdminControle.deleteProduct)



module.exports =router
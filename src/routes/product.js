import express from 'express'
import productController from '../controllers/product.js'

const route = express.Router();



route.get('/detail/:productID', productController.getProductByID)
route.get('/featured-product', productController.getFeaturedProducts);
route.get('/buy-one-get-one', productController.getBOGOProducts);
route.post('/insert-product', productController.insertProduct)

export default route;
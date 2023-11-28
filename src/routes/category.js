import express from 'express'
import CategoryController from '../controllers/category.js'

const route = express.Router();
route.get('/', CategoryController.getCategories)
route.get('/name/:categoryName', CategoryController.getCategoryByName)
route.get('/id/:categoryID', CategoryController.getCategoryByID)
route.post('/', CategoryController.insertCategories)




export default route;

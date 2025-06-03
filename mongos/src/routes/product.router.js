import express from 'express';
import productController from '../controllers/product.controller.js';


const productsRouter = express.Router()

productsRouter.get('/', productController.getAll)
productsRouter.post('/', productController.create)




export default productsRouter
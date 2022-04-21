import {Router} from 'express';
import {validateObjectDataCreate,
        validateObjectDataUpdate,
        validateId 
       } from '../validators/products.validators.js';
import {customHeader} from '../middlewares/customHeader.js';
import {authMiddleware} from '../middlewares/session.js';
import {checkRole} from '../middlewares/roleUser.js';
import { 
  getProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct
       } from '../controllers/products.controllers.js';



const router = Router();

// baseURL/products => Get All Products
router.get('/products', authMiddleware,getProducts);

// baseURL/products => Create Product
router.post('/products', authMiddleware, checkRole(["admin"]),validateObjectDataCreate, customHeader, createProduct);

// baseURL/products/:id => Deatil Product
router.get('/products/:id', authMiddleware,validateId, getProduct);

// baseURL/products/:id => Update Put Product
router.put('/products/:id', authMiddleware,validateId, validateObjectDataUpdate, updateProduct);

// baseURL/products/:id => Delete Product
router.delete('/products/:id', authMiddleware,validateId, deleteProduct);


export default router;
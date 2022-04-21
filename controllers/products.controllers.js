import Product from "../models/nosql/product.model.js";
import {handleHttpError} from "../utils/handleError.js";
import {matchedData} from "express-validator";


/*================== All Products ===========================*/
export const getProducts = async (req, res ) => {
  try{
    const user = req.user // user injected by authMiddleware
    const dataCount = await Product.countDocuments();
    const data = await Product.find();
    res.status(200).json(
      [ 
        {success: true,
        dataCount,
        user: user.email,
        results: data
        }
      ]);
  }catch(e){
    handleHttpError(res, 'ERROR_GET_ITEMS');
  }
}
/*=================== Create Product =======================*/
export const createProduct = async (req,res) => {
  try{
    const user = req.user // user injected by authMiddleware
    const body = matchedData(req);
    const data = await Product.create(body);
    res.status(201).json([ 
      {success: true,
       message: 'Created Product Successfully',
       user: user.email,
       results: data
      }
    ]);
  }catch(e){
    handleHttpError(res, 'ERROR_CREATE_ITEM');
  }
}
/*================== Detail Product =======================*/
export const getProduct = async (req, res) => {
  try{
    const user = req.user // user injected by authMiddleware
    req = matchedData(req);
    const id = req.id;
    const data = await Product.findById(id);
    if (!data) return res.status(404).json({message: 'Product does not exists'});
    res.status(200).json([ 
      {success: true,
       message: 'Product Found Successfully',
       user: user.email,
       results: data}
    ]);
  }catch(e){
    handleHttpError(res, 'ERROR_DETAIL_ITEM');
  }
};
/*================== Update Product ====================*/
export const updateProduct = async  (req,res) => {
  try{
    const user = req.user // user injected by authMiddleware
    const { id, ...body } = matchedData(req);
    const dataFile = await Product.findById(id);
    if (!dataFile) return res.status(404).json({message: 'Product does not exists'});
    
    const data = await Product.findByIdAndUpdate(id, body, {new:true});
    res.status(200).json([ 
        {success: true,
         message: 'Product Update Successfully',
         user: user.email,
         results: data
        }
      ])
  }catch(e){
    handleHttpError(res, 'ERROR_UPDATE_ITEM');
  }
};
/*================== Delete Product =====================*/
export const deleteProduct = async(req,res,next) => {
  try{
    const user = req.user // user injected by authMiddleware
    req = matchedData(req);
    const id = req.id;
    //const data = await Product.findByIdAndDelete(id);
    const data = await Product.delete({_id:id});
    if (!data) return res.status(404).json({message: 'Product does not exists'});
    res.status(200).json([ 
      {success: true,
       message: 'Product Deleted Successfully',
       user: user.email,
       results: data
      }
    ]);
  }catch(e){
    handleHttpError(res, 'ERROR_DELETE_ITEM');
  }
};
/*===============================================================*/
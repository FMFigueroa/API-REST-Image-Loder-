import Storage from '../models/nosql/storage.model.js';
import {assetLoader, assetDelete} from '../utils/cloudinary.js';
import fs from 'fs-extra';
import {handleHttpError} from "../utils/handleError.js";
import {matchedData} from "express-validator";


/*==================== All Assets ===============================*/
export const getItems= async (req, res ) => {
  try{
    const dataCount = await Storage.countDocuments();
    const data = await Storage.find();
    res.status(200).json(
      [ 
        {success: true,
        dataCount,
        results: data
        }
      ]);
  }catch(e){
    handleHttpError(res, 'ERROR_GET_ITEMS');
  }
};
/*=================== Create Asset ===========================*/
export const createItem= async (req, res ) => {
  
    if (!req.files?.asset) return res.status(404).json({message: 'asset is required'});
    try{
      const asset = await assetLoader(req.files.asset.tempFilePath);
      //console.log(asset)
      const body = {
        url: asset.secure_url,
        filename: asset.public_id,
      };
      await fs.unlink(req.files.asset.tempFilePath);
    
      const storage = await Storage.create(body) ;
      res.json(
      [
        {success: true,
        results: storage,
        }
      ]);
    }catch(e){
    handleHttpError(res, 'ERROR_DELETE_ITEM');
  }
}
/*===================== Detail Asset ===============================*/
export const getItem= async (req, res ) => {
    try{
    req = matchedData(req);
    const id = req.id;
    const data = await Storage.findById(id);
    if (!data) return res.status(404).json({message: 'Asset does not exist'});
    res.status(200).json([ 
      {success: true,
       message: 'Asset Found Successfully',
       results: data}
    ]);
  }catch(e){
    handleHttpError(res, 'ERROR_DETAIL_ITEM');
  }
};
/*====================== Delete Asset ==========================*/
export const deleteItem= async (req, res ) => {
    try{
    req = matchedData(req);
    const id = req.id;
    /* ====================  Soft Delete ======================== */
    const data = await Storage.delete({_id:id});
    /* ================== Permanent Delete ======================= */
    //const dataFile = await Storage.findById(id);
    //await assetDelete(dataFile.filename);
    //const data = await Storage.findByIdAndDelete(id);
    /*==============================================================*/
    if (!data) return res.status(404).json({message: 'Asset does not exists'});
    res.status(200).json([ 
      {success: true,
       message: 'Asset Deleted Successfully',
       results: data
      }
    ]);
  }catch(e){
    handleHttpError(res, 'ERROR_DELETE_ITEM');
  }
};
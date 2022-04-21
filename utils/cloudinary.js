import { v2 as cloudinary } from 'cloudinary';
import {
  CLOUDINARY_NAME,
  CLOUDINARY_KEY,
  CLOUDINARY_SECRET
} from '../config.js';



cloudinary.config({ 
  cloud_name: CLOUDINARY_NAME, 
  api_key: CLOUDINARY_KEY, 
  api_secret: CLOUDINARY_SECRET,
  secure: true
});

export async function assetLoader(assetPath) {
  return await cloudinary.uploader.upload(assetPath,{
    folder:'/Api-Rest/storage'
  });
}

export async function assetDelete(public_id) {
  return await cloudinary.uploader.destroy(public_id);
}
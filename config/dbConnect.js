import  mongoose from 'mongoose';
import {MONGODB_URI} from '../config.js';

export default async function dbConnect() {
  try{
    await mongoose.connect(MONGODB_URI)
    console.log('Connected to Mongodb 🚀 Successfully')
  }catch(error){
    console.error(error, 'Error of Connection 🔥')
  }
}
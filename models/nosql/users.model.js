import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete'

const userScheme = new mongoose.Schema(
  {
    name: {
      type:String
    },
    email:{
      type:String,
      unique:true
    },
    password:{
      type:String,
      select:false
    },
    role:{
      type:["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps:true, //createdAT & updatesAT
    versionKey: false,
  }
);
userScheme.plugin(mongooseDelete, { overrideMethods:'all' } ); //Soft Delete
export default mongoose.model("Users", userScheme);
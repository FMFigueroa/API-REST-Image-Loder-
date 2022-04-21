import mongoose from "mongoose";
import mongooseDelete from 'mongoose-delete';

const storageScheme = new mongoose.Schema(
  {
    url: {
      type: String
    },
    filename: {
        type: String
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
storageScheme.plugin(mongooseDelete, { overrideMethods:'all' } ); //Soft Delete
export default  mongoose.model("Storage", storageScheme);
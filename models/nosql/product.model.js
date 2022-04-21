import mongoose from "mongoose";
import mongooseDelete from 'mongoose-delete';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true
    },
    album: {
      type: String,
      trim: true,
    },
    cover: {
      type: String,
      validate: {
        validator: (req) => {
          return true;
        },
        message: "ERROR_URL",
      },
    },
    owner: {
      name: {
        type: String,
      },
      nickname: {
        type: String,
      },
      nationality: {
        type: String,
      },
    },
    price: {
      type: Number,
      default: 0,
    },
    assetId: {
      type: mongoose.Types.ObjectId,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
productSchema.plugin(mongooseDelete, { overrideMethods:'all' } ); //Soft Delete
export default mongoose.model("Product", productSchema);
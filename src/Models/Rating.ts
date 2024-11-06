
import mongoose from "mongoose";

import Product from "./Product";
import User from "./User";

const { Schema } = mongoose;


const ratingSchem = new Schema(
  {
    publicId: { type: String, required: true, unique: true },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Product,
      required: true,
    },

    approveUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },

    tagLine: { type: String, require: true },

    totalRating: { type: Number, require: true },

    rateMaxScore: { type: Number, require: true },

    rateMinScore: { type: Number, require: true },

    rateAvrScore: { type: Number, require: true },

    rateItemsCount: { type: Number, require: true },

    avgRatProduct: { type: Number, require: true },
  },
  { timestamps: true }
);

const Rating = mongoose.models.Rating || mongoose.model("Rating", ratingSchem);
export default Rating;

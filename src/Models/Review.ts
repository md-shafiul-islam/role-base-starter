import mongoose   from "mongoose";
import User from "./User";
import Product from "./Product";

const { Schema } = mongoose;


const reviewSchema = new Schema(
  {
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

    content: { type: String, required: true },
  },
  { timestamps: true }
);

const Review = mongoose.models.Review || mongoose.model("Review", reviewSchema);

export default Review;

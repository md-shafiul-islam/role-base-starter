import mongoose from "mongoose";
import Brand from "./Brand";
import Category from "./Category";
import User from "./User";

const { Schema } = mongoose;


const newsSchema = new Schema(
  {
    publicId: { type: String, require: true, unique: true },
    aliasName: { type: String, require: true },
    title: { type: String, require: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    metaDatas: [{ name: String, content: String }],
    content: { type: String, require: true },
    images: [{ url: { type: String, required: true }, alt: String }],
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Brand,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Category,
      required: true,
    },
  },
  { timestamps: true }
);

const News = mongoose.models.News || mongoose.model("News", newsSchema);

export default News;

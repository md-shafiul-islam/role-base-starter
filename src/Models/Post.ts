import { randomUUID } from "crypto";
import mongoose   from "mongoose";
import User from "./User";
import Brand from "./Brand";
import Category from "./Category";

const { Schema } = mongoose;


const postSchema = new Schema(
  {
    publicId: { type: String, required: true, unique: true },
    aliasName: { type: String, require: true },
    title: { type: String, require: true },
    content: { type: String, require: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    images: [{ url: { type: String, require: true }, alt: String }],
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    metaDatas: [
      {
        data: {
          type: mongoose.Schema.Types.ObjectId,
          ref: User,
          required: true,
        },
      },
    ],

    brand: { type: mongoose.Schema.Types.ObjectId, ref: Brand, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Category,
      required: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;

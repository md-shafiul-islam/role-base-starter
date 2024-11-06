import mongoose   from "mongoose";
import Product from "./Product";


const { Schema } = mongoose;


const commentSchema = new Schema(
  {
    content: { type: String, require: true },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Product,
      required: true,
    },

    children: [this],
  },
  { timestamps: true }
);

const Comment =
  mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;

import mongoose from "mongoose";

const { Schema } = mongoose;


const categorySchema = new Schema({
  id: { type: String, require: true, unique: true },
  name: { type: String, require: true },
  description: { type: String, require: true },
  key: { type: String, require: true, unique: true },
  actionUrl: { type: String, require: true },
  slug: { type: String, required: true, unique: true },
  isSub: { type: Boolean, require: true, default: false },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null
  },
});


const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);
export default Category;

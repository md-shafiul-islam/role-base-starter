import mongoose from "mongoose";

const { Schema } = mongoose;

const brandSchema = new Schema(
  {
    id: { type: String, require: true, unique: true },
    name: { type: String, require: true },
    phoneNo: { type: String },
    description: { type: String },
    tagLine: { type: String },
    logoUrl: { type: String },
    website: { type: String },
  },
  { timestamps: true }
);

const Brand = mongoose.models.Brand || mongoose.model("Brand", brandSchema);
export default Brand;

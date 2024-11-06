import mongoose from "mongoose";
import User from "@/src/Models/User";
import Category from "@/src/Models/Category";
import Unit from "@/src/Models/Unit";
import Address from "@/src/Models/Address";
import Organization from "@/src/Models/Organization";

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    aliasName: { type: String, required: true, unique: true },
    barCode: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    quantity: { type: Number, required: true },
    imageUrl: { type: String },
    videoUrl: { type: String },
    price: { type: Number, required: true },
    flatDiscount: { type: Number, default: 0.0 },
    clientDiscount: { type: Number, required: true },
    agentDiscount: { type: Number, required: true },
    agentCharge: { type: Number },
    isUpcoming: { type: Boolean, default: false },
    description: { type: String },
    isAnywhere: { type: Boolean, require: true, default: false },
    isActive: { type: Boolean, require: true, default: false },
    images: [
      {
        title: { type: String },
        url: { type: String, require: true },
        alt: { type: String },
      },
    ],
    metaDatas: [
      {
        name: { type: String, require: true },
        content: { type: String, require: true },
      },
    ],

    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Organization,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Category,
      required: true,
    },
    locations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Address,
        default: null,
      },
    ],
    unit: { type: mongoose.Schema.Types.ObjectId, ref: Unit, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },

    specifications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Specification",
        required: true,
      },
    ],

    avgRating: { type: Number, required: true, default: 0.0 },
    ratingScale: { type: Number, required: true, default: 0.0 },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;

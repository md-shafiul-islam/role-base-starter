import mongoose from "mongoose";
import User from "@/src/Models/User";
import StakeType from "@/src/Models/StakeType";

const { Schema } = mongoose;

const stakeholderSchema = new Schema(
  {
    id: { type: String, require: true, unique: true },
    firstName: { type: String, require: true },
    lastName: { type: String },
    gender: { type: String, require: true },
    address1: { type: String, require: true },
    address2: { type: String },
    refCode: { type: String },
    description: { type: String },
    phoneNo: { type: String, require: true },
    genId: { type: String, require: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
      default: null,
    },
    stakeType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: StakeType,
      required: true,
    },
    nid: { type: String, require: true },
    signature: { type: String, require: true },
  },
  { timestamps: true }
);

const Stakeholder =
  mongoose.models.Stakeholder ||
  mongoose.model("Stakeholder", stakeholderSchema);

export default Stakeholder;

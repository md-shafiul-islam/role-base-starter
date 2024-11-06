import mongoose from "mongoose";
import SpecKey from "./SpecKey";

const { Schema } = mongoose;

const specificationSchema = new Schema({
  value: { type: String, required: true },
  spsKey: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SpecKey",
    required: true,
  },
  name: { type: String, required: true },
  description: { type: String, required: true },
  isFeature: { type: Boolean, default: false },
});

const Specification =
  mongoose.models.Specification ||
  mongoose.model("Specification", specificationSchema);
export default Specification;

import mongoose from "mongoose";
const { Schema } = mongoose;

const specKeySchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true, unique: true },
  value: { type: String, required: true, unique: true },
  type: { type: Number, required: true, unique: true },
});

const SpecKey =
  mongoose.models.SpecKey ||
  mongoose.model("SpecKey", specKeySchema, "spec_key");
export default SpecKey;

import mongoose from "mongoose";

const { Schema } = mongoose;

const stakTypeSchema = new Schema({
  id: { type: String, require: true, unique: true },
  title: { type: String, require: true, unique: true },
  value: { type: String, require: true, unique: true },
});

const StakeType =
  mongoose.models.StakeType || mongoose.model("StakeType", stakTypeSchema);

export default StakeType;

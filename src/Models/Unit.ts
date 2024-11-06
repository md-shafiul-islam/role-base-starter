import mongoose from "mongoose";

const { Schema } = mongoose;

const unitSchema = new Schema({
  id: { type: String, require: true, unique: true },
  name: { type: String, require: true },
  description: { type: String },
  value: { type: String, require: true, unique: true },
  num: { type: Number, require: true },
  parent: { type: Schema.Types.ObjectId, ref: "Unit", default: null },
  totalValue: { type: Number, default: 0.0 },
  isSub: { type: Boolean, default: false },
});

const Unit = mongoose.models.Unit || mongoose.model("Unit", unitSchema);

export default Unit;

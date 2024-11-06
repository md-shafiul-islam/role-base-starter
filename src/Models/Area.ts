import mongoose from "mongoose";

const { Schema } = mongoose;

const areaSchema = new Schema({
  name: { type: String, require: true },
  key: { type: String, require: true },
  code: { type: String, required: true, unique: true },
  region: { type: Schema.Types.ObjectId, ref: "Region", require: true },
});

const Area = mongoose.models.Area || mongoose.model("Area", areaSchema);
export default Area;

import mongoose from "mongoose";
import City from "@/src/Models/City";

const { Schema } = mongoose;

const regionSchema = new Schema({
  name: { type: String, require: true },
  key: { type: String, require: true },
  code: { type: Number },
  city: { type: Schema.Types.ObjectId, ref: City, require: true },
  areas: [{ type: Schema.Types.ObjectId, ref: "Area", require: true }],
});

const Region = mongoose.models.Region || mongoose.model("Region", regionSchema);
export default Region;

import mongoose from "mongoose";


const { Schema } = mongoose;


const citySchema = new Schema({
  name: { type: String, require: true },
  key: { type: String, require: true },
  code: { type: String, required: true, unique: true },
  regions: [{ type: Schema.Types.ObjectId, ref: "Region" }]
});

const City =
  mongoose.models.City || mongoose.model("City", citySchema);
export default City;

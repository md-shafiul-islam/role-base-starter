import mongoose from "mongoose";
import Region from "./Region";

const { Schema } = mongoose;

const addressSchema = new Schema({
  id: { type: String, require: true },
  region: { type: Schema.Types.ObjectId, ref: Region, default: null },
  city: { type: String, require: true },
  regionName: { type: String, require: true },
  phoneNo: { type: String },
  name: { type: String },
  details: { type: String },
});

const Address =
  mongoose.models.Address || mongoose.model("Address", addressSchema);
export default Address;

import mongoose   from "mongoose";

const { Schema } = mongoose;


const rateKeySchema = new Schema({
  name: { type: String, required: true },
  value: { type: String, required: true },
});

const RateKey =
  mongoose.models.RateKey || mongoose.model("RateKey", rateKeySchema);

export default RateKey;

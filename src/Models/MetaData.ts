import mongoose   from "mongoose";

const { Schema } = mongoose;


const metaDetaSchema = new Schema({
  name:{ type: String, require: true },
  content:{ type: String, require: true },
});

const MetaDeta =
  mongoose.models.MetaDeta || mongoose.model("MetaDeta", metaDetaSchema);

export default MetaDeta;

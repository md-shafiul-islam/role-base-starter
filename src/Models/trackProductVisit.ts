import mongoose   from "mongoose";
import Product from "./Product";

const { Schema } = mongoose;

const tracktPageVisitSchema = new Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Product,
  },
  pageName: { unique: true, type: String },

  visits: { type: Number, require: true, default: 0 },
});

const TracktPageVisit =
  mongoose.models.TracktPageVisit ||
  mongoose.model("TracktPageVisit", tracktPageVisitSchema);

export default TracktPageVisit;

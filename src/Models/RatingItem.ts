import mongoose   from "mongoose";
import Rating from "./rating";


const { Schema } = mongoose;


const ratingItemSchema = new Schema({
  rateKey: { type: String, required: true },
  rating: { type: mongoose.Schema.Types.ObjectId, ref: Rating, required: true },
  maxValue: { type: Number, required: true },
  minValue: { type: Number, required: true },
  inValue: { type: Number, required: true },
  description: { type: String, required: true },
});

const RatingItem =
  mongoose.models.RatingItem || mongoose.model("RatingItem", ratingItemSchema);

export default RatingItem;

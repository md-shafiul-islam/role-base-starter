import mongoose from "mongoose";

const { Schema } = mongoose;

const organizationSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: { type: String, nullable: true },
    email: { type: String, require: true, unique: true },
    phoneNo: { type: String, unique: true },
    tradeNo: { type: String, unique: true },
    tradeLicense: { type: String, unique: true },
    contract: { type: String, require: true },
    image: { type: String },
    totalDiscountReceive: { type: Number, require: true },
    totalDueDiscount: { type: Number, require: true },
    totalDiscount: { type: Number, require: true },
    products: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Product", require: false },
    ],

    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: false,
      },
    ],
    isActive: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Organization =
  mongoose.models.Organization ||
  mongoose.model("Organization", organizationSchema);

export default Organization;

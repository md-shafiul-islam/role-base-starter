import { randomUUID } from "crypto";
import mongoose from "mongoose";
import User from "@/src/Models/User";
import Unit from "@/src/Models/Unit";
import Stakeholder from "@/src/Models/Stakeholder";
import Product from "@/src/Models/Product";
import Organization from "@/src/Models/Organization";

const { Schema } = mongoose;

const invoiceSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Organization,
      require: true,
    },
    vendorUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Stakeholder,
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: Product,
          required: true,
        },
        name: { type: String, require: true },
        qty: { type: Number, require: true },
        clientDiscount: { type: Number, require: true },
        agentDiscount: { type: Number, require: true },
        price: { type: Number, require: true },
        itemTotal: { type: Number, require: true },
      },
    ],
    totalQuantity: { type: Number, required: true },
    itemsTotal: { type: Number, required: true },
    clientTotalDiscount: { type: Number, required: true },
    agentTotalCharge: { type: Number, required: true },
    lessAdjustment: { type: Number, required: true },
    grandTotal: { type: Number, required: true },
    paidAmount: { type: Number, required: true },
    creditAmount: { type: Number, required: true },
    changeAmount: { type: Number, required: true },
    isApprove: { type: Boolean, default: false },
    isAccept: { type: Boolean, default: false },
    vendorNote: { type: String },
    clientNote: { type: String },
    parentUnit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Unit,
      default: null,
    },
    approveUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      default: null,
    },
  },
  { timestamps: true }
);

const Invoice =
  mongoose.models.Invoice || mongoose.model("Invoice", invoiceSchema);
export default Invoice;

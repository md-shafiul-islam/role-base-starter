import mongoose from "mongoose";
import Role from "@/src/Models/Role";
import Organization from "@/src/Models/Organization";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    authId: { type: String, nullable: true },
    name: { type: String, nullable: true },
    email: { type: String, require: true, unique: true },
    phoneNo: { type: String, unique: true },
    userName: { type: String, unique: true },
    password: { type: String },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Role,
      require: false,
    },
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Organization,
      require: false,
      default: null,
    },

    isActive: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    isEmailVerified: { type: Boolean, default: false },
    hasStakholder: { type: Boolean, require, default: false },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;

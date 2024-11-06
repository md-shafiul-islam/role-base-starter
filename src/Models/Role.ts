import mongoose from "mongoose";

const { Schema } = mongoose;

interface Role {
  publicId: string;
  code: number;
  title: string;
  description: string;
  isActive: string;
  access: [];
}

const roleSchema = new Schema({
  publicId: { type: String, required: true, unique: true },
  roleKey: { type: String, require: true, unique: true },
  code: { type: Number, require: true, unique: true },
  title: { type: String, require: true },
  description: { type: String },
  isActive: { type: Boolean, default: true },
  access: [{ type: Schema.Types.ObjectId, ref: "RoleAccess" }],
});

const Role = mongoose.models.Role || mongoose.model("Role", roleSchema);

export default Role;

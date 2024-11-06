import mongoose from "mongoose";

import Role from "@/src/Models/Role";
import Menu from "@/src/Models/Menu";

const { Schema } = mongoose;

interface IRoleAccess {
  publicId: string;
  role: Role
  menu: Menu,
  menuKey: string;
  title: string;
  key: string;
  isEdit: boolean;
  isRemove: boolean;
  isView: boolean;
  isAdd: boolean;
  isApprove: boolean;
  isActive: boolean;
  isAll: boolean;
  isAuth: boolean;
}

const roleAccessSchema = new Schema({
  publicId: { type: String, required: true, unique: true, alias: "id" },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Role,
    required: true,
    nullable: true

  },
  menu: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Menu,
    required: true,
    nullable: true
  },
  menuKey: { type: String, require: true },
  title: { type: String, require: true },
  key: { type: String, require: true },
  isEdit: { type: Boolean, default: false },
  isRemove: { type: Boolean, default: false },
  isView: { type: Boolean, default: false },
  isAdd: { type: Boolean, default: false },
  isApprove: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  isAll: { type: Boolean, default: false },
  isAuth: { type: Boolean, default: false },
}, { timestamps: true });

// roleAccessSchema.virtual("id").get(function () {
//   return this.publicId;
// })

const RoleAccess =
  mongoose.models.RoleAccess || mongoose.model("RoleAccess", roleAccessSchema, "role_access");
export default RoleAccess;

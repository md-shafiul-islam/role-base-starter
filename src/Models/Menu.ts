import mongoose from "mongoose";

const { Schema } = mongoose;

interface Menu {
  publicId: string;
  title: string;
  key: string;
  url: string;
  isAdmin: boolean;
}

const menuSchema = new Schema({
  publicId: { type: String, required: true, unique: true },
  title: { type: String, require: true },
  key: { type: String, require: true },
  url: { type: String, default: false },
  isAdmin: { type: Boolean, default: false },
});

const Menu = mongoose.models.Menu || mongoose.model("Menu", menuSchema);

export default Menu;

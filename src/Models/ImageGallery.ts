import mongoose   from "mongoose";

const { Schema } = mongoose;


const imageGallerySchema = new Schema(
  {
    name: { tyep: String, require: true },

    altTag: { tyep: String, require: true },

    title: { tyep: String, require: true },

    location: { tyep: String, require: true },
  },
  { timestamps: true }
);

const ImageGallery =
  mongoose.models.ImageGallery ||
  mongoose.model("ImageGallery", imageGallerySchema);

export default ImageGallery;

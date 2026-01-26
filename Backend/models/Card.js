import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true, // 🟢 optional
    },

    description: {
      type: String,
      trim: true, // 🟢 optional
    },

    imageUrl: {
      type: String,
      trim: true, // 🟢 optional (Cloudinary secure_url)
    },

    cloudinaryPublicId: {
      type: String,
      trim: true, // 🟢 optional (delete ke kaam aayega)
    },

    brand: {
      type: String,
      required: true, // 🔴 ONLY mandatory field
      trim: true,
    },

    capacity: {
      type: String,
      trim: true, // 🟢 optional
    },

    type: {
      type: String,
      trim: true, // 🟢 optional
    },

    price: {
      type: Number, // 🟢 optional
    },

    isActive: {
      type: Boolean,
      default: false, // 🟢 optional
    },
  },
  {
    timestamps: true,
  }
);

const Card = mongoose.model("Card", cardSchema);

export default Card;

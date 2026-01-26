
import BannerImage from "../models/BannerImage.js";
import cloudinary from "../utils/cloudinary.js";

/* ===============================
   GET ALL BANNER IMAGES
================================ */
export const getAllBannerImages = async (req, res) => {
  try {
    const images = await BannerImage.find().sort({ createdAt: -1 });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   ADD BANNER IMAGES (MULTIPLE)
   Upload to Cloudinary + save in DB
================================ */
export const addBannerImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No images selected" });
    }

    const uploadedImages = await Promise.all(
      req.files.map(async (file) => {
        const result = await cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
          { folder: "banners" }
        );

        const banner = new BannerImage({
          url: result.secure_url,
          public_id: result.public_id,
        });

        return banner.save();
      })
    );

    res.status(201).json(uploadedImages);
  } catch (err) {
    console.error("Banner upload error:", err);
    res.status(500).json({ message: "Upload failed" });
  }
};

/* ===============================
   DELETE BANNER IMAGE
   Remove from Cloudinary + DB
================================ */
export const deleteBannerImage = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await BannerImage.findById(id);

    if (!image) return res.status(404).json({ message: "Image not found" });

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(image.public_id);

    // Delete from DB
    await BannerImage.findByIdAndDelete(id);

    res.status(200).json({ message: "Banner image deleted successfully" });
  } catch (error) {
    console.error("Delete banner error:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ===============================
   SET ACTIVE BANNER
   Only one active banner at a time
================================ */
export const setActiveBanner = async (req, res) => {
  try {
    const { id } = req.params;

    // Make all banners inactive
    // await BannerImage.updateMany({}, { isActive: false });

    // Set selected banner as active
    const updatedBanner = await BannerImage.findByIdAndUpdate(
      id,
      { isActive: true },
      { new: true }
    );

    if (!updatedBanner)
      return res.status(404).json({ message: "Banner not found" });

    res.status(200).json(updatedBanner);
  } catch (error) {
    console.error("Set active banner error:", error);
    res.status(500).json({ message: error.message });
  }
};

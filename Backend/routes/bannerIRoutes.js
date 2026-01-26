import express from "express";
import {
  getAllBannerImages,
  addBannerImages,  // ✅ plural
  deleteBannerImage,
  setActiveBanner,
} from "../controllers/bannerImageController.js";

import uploadImage from "../middlewares/uploadImage.js";

const router = express.Router();

// GET all banners
router.get("/", getAllBannerImages);

// ADD multiple banners
router.post("/", uploadImage.array("images", 10), addBannerImages);

// DELETE banner
router.delete("/:id", deleteBannerImage);

// SET active banner
router.patch("/set-active/:id", setActiveBanner);

export default router;

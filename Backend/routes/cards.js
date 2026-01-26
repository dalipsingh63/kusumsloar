import express from "express";
import {
  getAllCards,
  addCard,
  deleteCard,
  toggleActiveCard,
} from "../controllers/cardController.js";

import cardUpload from "../middlewares/cardUpload.js";

const router = express.Router();

/* =========================
   ROUTES
========================= */

// GET all cards
router.get("/", getAllCards);

// ADD card (Cloudinary, image optional, brand required)
router.post("/", cardUpload.single("image"), addCard);

// DELETE card
router.delete("/:id", deleteCard);

// TOGGLE active/inactive
router.patch("/active/:id", toggleActiveCard);

export default router;

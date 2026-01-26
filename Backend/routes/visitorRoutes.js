// routes/visitorRoutes.js
import express from "express";
import {
  logVisitor,
  getAllVisitors,
} from "../controllers/visitorController.js";

const router = express.Router();

// ===============================
// Log visitor (Frontend se call)
// ===============================
router.post("/", logVisitor);

// ===============================
// Get all visitors (Admin panel)
// ===============================
router.get("/", getAllVisitors);

export default router;

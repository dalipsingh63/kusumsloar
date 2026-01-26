// controllers/visitorController.js
import Visitor from "../models/Visitor.js";

// ===============================
// Log a visitor
// ===============================
export const logVisitor = async (req, res) => {
  try {
    const { page, device, country, city } = req.body;

    // IP address get karna
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

    // ===============================
    // Admin visit ignore karne ke rules
    // 1️⃣ Agar admin page /admin se aa rahi ho
    // 2️⃣ Agar IP localhost ya admin IP ho
    // ===============================
    if (page?.startsWith("/admin")) {
      return res.status(200).json({ message: "Admin visit ignored" });
    }
    if (ip === "127.0.0.1" || ip === "::1") {
      return res.status(200).json({ message: "Admin visit ignored" });
    }

    // Create new visitor record
    const visitor = new Visitor({
      ip,
      page,
      device,
      country,
      city,
    });

    await visitor.save();

    res.status(201).json({ message: "Visitor logged successfully" });
  } catch (error) {
    console.error("Error logging visitor:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ===============================
// Get all visitors (Admin panel ke liye)
// ===============================
export const getAllVisitors = async (req, res) => {
  try {
    let visitors = await Visitor.find().sort({ createdAt: -1 }); // latest first

    // Admin visits ignore karne ke liye filter (optional extra safety)
    visitors = visitors.filter(v => {
      // Ignore localhost IP / admin IP
      return v.ip !== "127.0.0.1" && v.ip !== "::1";
    });

    res.status(200).json(visitors);
  } catch (error) {
    console.error("Error fetching visitors:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// src/services/visitorService.js
import API from "./api";

// ================================
// 👤 LOG VISITOR (Auto – Page Load)
// ================================
export const logVisitor = async () => {
  try {
    await API.post("/visitors", {
      page: window.location.pathname,
      device: navigator.userAgent,
    });
  } catch (error) {
    // silent error – user ko kuch nahi dikhana
  }
};

// ================================
// 🛠 GET ALL VISITORS (Admin Panel)
// ================================
export const getAllVisitors = async () => {
  try {
    const res = await API.get("/visitors");
    return res.data; // ✅ same pattern as videos
  } catch (error) {
    console.error("❌ Error fetching visitors:", error.response?.data || error.message);
    throw error;
  }
};

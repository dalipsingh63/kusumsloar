// models/Visitor.js
import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema({
  ip: { type: String },                   // Visitor ka IP address (optional)
  page: { type: String, required: true }, // Kaunse page visit kiya
  device: { type: String },               // Browser / device info
  country: { type: String },              // Optional: country info (IP se get kar sakte ho)
  city: { type: String },                 // Optional: city info
  createdAt: { type: Date, default: Date.now }, // Visit ka timestamp
});

const Visitor = mongoose.model("Visitor", visitorSchema);

export default Visitor;

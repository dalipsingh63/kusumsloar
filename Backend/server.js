
// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.js";
// import path from "path";
// import { fileURLToPath } from "url";

// // Routes
// import userSignupRoute from "./routes/userSignupRoute.js";
// import bannerIRoutes from "./routes/bannerIRoutes.js";
// import cardsRoute from "./routes/cards.js";
// import bookingRoutes from "./routes/bookingRoutes.js";
// import videoRoutes from "./routes/videoRoutes.js";
// import visitorRoutes from "./routes/visitorRoutes.js";

// dotenv.config();

// const app = express();

// // ===== MIDDLEWARE =====
// app.use(cors());
// app.use(express.json());

// // ===== DB =====
// connectDB();

// // ===== PATH FIX =====
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


// // ===== API ROUTES =====
// app.use("/api/user", userSignupRoute);
// app.use("/api/banner-images", bannerIRoutes);
// app.use("/api/cards", cardsRoute);
// app.use("/api/bookings", bookingRoutes);
// app.use("/api/videos", videoRoutes);
// app.use("/api/visitors", visitorRoutes);
// // ===== FRONTEND BUILD =====
// const frontendPath = path.join(__dirname, "../light-house/dist");
// app.use(express.static(frontendPath));

// // React Router fallback (API excluded)
// app.get(/^\/(?!api).*/, (req, res) => {
//   res.sendFile(path.join(frontendPath, "index.html"));
// });

// // ===== SERVER =====
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });   


// vercel pr fontrnted krne pr




// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import connectDB from "./config/db.js";
// import path from "path";
// import { fileURLToPath } from "url";

// // Routes
// import userSignupRoute from "./routes/userSignupRoute.js";
// import bannerIRoutes from "./routes/bannerIRoutes.js";
// import cardsRoute from "./routes/cards.js";
// import bookingRoutes from "./routes/bookingRoutes.js";
// import videoRoutes from "./routes/videoRoutes.js";
// import visitorRoutes from "./routes/visitorRoutes.js";

// dotenv.config();

// const app = express();

// // ===== MIDDLEWARE =====
// app.use(
//   cors({
//     origin: [
//       "https://kusumsloar.vercel.app",
//       "https://kusumsolar.com",
//     ],
//     credentials: true,
//   })
// );

// app.use(express.json());

// // ===== DB =====
// connectDB();

// // ===== PATH FIX =====
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


// // ===== API ROUTES =====
// app.use("/api/user", userSignupRoute);
// app.use("/api/banner-images", bannerIRoutes);
// app.use("/api/cards", cardsRoute);
// app.use("/api/bookings", bookingRoutes);
// app.use("/api/videos", videoRoutes);
// app.use("/api/visitors", visitorRoutes);

// // ===== FRONTEND BUILD =====
// const frontendPath = path.join(__dirname, "../light-house/dist");
// app.use(express.static(frontendPath));

// // React Router fallback (API excluded)
// app.get(/^\/(?!api).*/, (req, res) => {
//   res.sendFile(path.join(frontendPath, "index.html"));
// });

// // ===== SERVER =====
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });






import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";

// Routes
import userSignupRoute from "./routes/userSignupRoute.js";
import bannerIRoutes from "./routes/bannerIRoutes.js";
import cardsRoute from "./routes/cards.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import visitorRoutes from "./routes/visitorRoutes.js";

dotenv.config();

const app = express();

// ===== MIDDLEWARE =====
app.use(
  cors({
    origin: [
      "https://kusumsloar.vercel.app",
      "https://kusumsolar.com",
      "https://www.kusumsolar.com",
    ],
    credentials: true,
  })
);

app.use(express.json());

// ===== DB =====
connectDB();

// ===== PATH FIX =====
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===== API ROUTES =====
app.use("/api/user", userSignupRoute);
app.use("/api/banner-images", bannerIRoutes);
app.use("/api/cards", cardsRoute);
app.use("/api/bookings", bookingRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/visitors", visitorRoutes);

// ===== FRONTEND BUILD =====
const frontendPath = path.join(__dirname, "../light-house/dist");
app.use(express.static(frontendPath));

// React Router fallback (API excluded)
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// ===== SERVER =====
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

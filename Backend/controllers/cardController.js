import Card from "../models/Card.js";
import cloudinary from "../utils/cloudinary.js";

/* =========================
   GET ALL CARDS
========================= */
export const getAllCards = async (req, res) => {
  try {
    const cards = await Card.find().sort({ createdAt: -1 });

    const response = cards.map((card) => ({
      _id: card._id,
      brand: card.brand,
      title: card.title || "",
      description: card.description || "",
      capacity: card.capacity || "",
      type: card.type || "",
      price: card.price || null,
      imageUrl: card.imageUrl || "", // 🔥 already full cloudinary URL
      isActive: card.isActive || false,
      createdAt: card.createdAt,
    }));

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   ADD CARD (CLOUDINARY)
========================= */
export const addCard = async (req, res) => {
  try {
    const { brand, title, description, capacity, type, price } = req.body;

    // 🔴 ONLY brand required
    if (!brand) {
      return res.status(400).json({ message: "Brand is required" });
    }

    let imageUrl = "";
    let cloudinaryPublicId = "";

    if (req.file) {
      await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "cards" },
          (error, result) => {
            if (error) return reject(error);

            imageUrl = result.secure_url;
            cloudinaryPublicId = result.public_id;
            resolve();
          }
        );

        uploadStream.end(req.file.buffer);
      });
    }

    const card = new Card({
      brand,
      title,
      description,
      capacity,
      type,
      price,
      imageUrl,
      cloudinaryPublicId,
    });

    const savedCard = await card.save();
    res.status(201).json(savedCard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   DELETE CARD
========================= */
export const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findById(id);

    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    // 🔥 delete image from cloudinary
    if (card.cloudinaryPublicId) {
      await cloudinary.uploader.destroy(card.cloudinaryPublicId);
    }

    await Card.findByIdAndDelete(id);
    res.status(200).json({ message: "Card deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   TOGGLE ACTIVE
========================= */
export const toggleActiveCard = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findById(id);

    if (!card) {
      return res.status(404).json({ message: "Card not found" });
    }

    card.isActive = !card.isActive;
    await card.save();

    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

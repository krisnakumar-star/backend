const express = require("express");
const router = express.Router();

const {
  addPlace,
  getPlaces,
  getPlaceById,
} = require("../controllers/placeController");

const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// ===================================================
// ➕ ADD PLACE (Protected)
// ===================================================
router.post(
  "/",
  protect,
  upload.array("images", 5),
  addPlace
);

// ===================================================
// 🌍 GET ALL PLACES (Public)
// ===================================================
router.get("/", getPlaces);

// ===================================================
// 📍 GET SINGLE PLACE BY ID (Public)
// ===================================================
router.get("/:id", getPlaceById);

module.exports = router;

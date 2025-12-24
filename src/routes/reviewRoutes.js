const express = require("express");
const router = express.Router();

const {
  addReview,
  getReviewsByPlace,
} = require("../controllers/reviewController");

const { protect } = require("../middleware/authMiddleware");

// ➕ Add review (logged-in users)
router.post("/:placeId", protect, addReview);

// 🌍 Get reviews for a place
router.get("/:placeId", getReviewsByPlace);

module.exports = router;

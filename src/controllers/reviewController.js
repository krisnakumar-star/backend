const Review = require("../models/Review");
const Place = require("../models/placeModel");

// ➕ ADD REVIEW (Protected)
const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const placeId = req.params.placeId;

    // Create review
    const review = await Review.create({
      user: req.user._id,
      place: placeId,
      rating,
      comment,
    });

    // Recalculate average rating
    const reviews = await Review.find({ place: placeId });

    const avgRating =
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

    await Place.findByIdAndUpdate(placeId, {
      avgRating: Number(avgRating.toFixed(1)), // ✅ FIXED
      numReviews: reviews.length,
    });

    res.status(201).json(review);
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "You already reviewed this place" });
    }

    res.status(500).json({ message: error.message });
  }
};

// 🌍 GET REVIEWS FOR A PLACE (Public)
const getReviewsByPlace = async (req, res) => {
  try {
    const reviews = await Review.find({
      place: req.params.placeId,
    }).populate("user", "name");

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addReview, getReviewsByPlace };

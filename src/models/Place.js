const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema(
  {
    // 🏷️ BASIC INFO
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      index: true, // 🔍 faster category filter
    },

    images: [
      {
        type: String,
      },
    ],

    // 📍 FULL ADDRESS (NO MAP / NO LAT-LNG)
    address: {
      type: String,
      required: true,
      trim: true,
    },

    landmark: {
      type: String,
      required: true,
      trim: true,
      index: true, // 🔍 search by landmark
    },

    city: {
      type: String,
      required: true,
      trim: true,
      index: true, // 🔥 MAIN SEARCH FIELD
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
    },

    // ⭐ REVIEW SYSTEM
    avgRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    numReviews: {
      type: Number,
      default: 0,
    },

    // 👤 OWNER
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// 🔎 TEXT SEARCH (city + landmark + title)
placeSchema.index({
  city: "text",
  landmark: "text",
  title: "text",
});

module.exports = mongoose.model("Place", placeSchema);

const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true, // 🔍 helps search
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["Cafe", "Food", "Nature", "Shop", "Art", "Nightlife", "Other"],
      index: true,
    },

    images: {
      type: [String],
      default: [],
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    landmark: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
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

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

/* 🔍 TEXT SEARCH (optional but powerful) */
placeSchema.index({
  title: "text",
  description: "text",
  city: "text",
});

module.exports = mongoose.model("Place", placeSchema);

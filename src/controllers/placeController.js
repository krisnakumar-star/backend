const mongoose = require("mongoose");
const Place = require("../models/placeModel");

// ➕ ADD PLACE
exports.addPlace = async (req, res) => {
  try {
    const images = req.files?.map((file) => file.path) || [];

    const place = new Place({
      ...req.body,
      images,
      createdBy: req.user._id,
    });

    const savedPlace = await place.save();
    res.status(201).json(savedPlace);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🌍 GET ALL PLACES
exports.getPlaces = async (req, res) => {
  try {
    const { category, city } = req.query;
    const query = {};

    if (category) query.category = category;
    if (city) query.city = new RegExp(city, "i");

    const places = await Place.find(query).sort({ createdAt: -1 });
    res.json(places);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📍 GET PLACE BY ID
exports.getPlaceById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid place ID" });
    }

    const place = await Place.findById(id);

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    res.json(place);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

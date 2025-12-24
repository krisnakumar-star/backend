const Place = require("../models/Place");

// ===================================================
// ➕ ADD PLACE
// ===================================================
const addPlace = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      address,
      landmark,
      city,
      state,
      country,
    } = req.body;

    // ❗ VALIDATION
    if (
      !title ||
      !description ||
      !category ||
      !address ||
      !landmark ||
      !city ||
      !state ||
      !country
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // 🖼️ IMAGES (optional)
    const imageUrls = Array.isArray(req.files)
      ? req.files.map((file) => file.path)
      : [];

    const place = await Place.create({
      title,
      description,
      category,
      address,
      landmark,
      city,
      state,
      country,
      images: imageUrls,
      createdBy: req.user._id,
    });

    res.status(201).json(place);
  } catch (error) {
    console.error("ADD PLACE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ===================================================
// 🌍 GET ALL PLACES (CITY / AREA / LANDMARK SEARCH)
// ===================================================
const getPlaces = async (req, res) => {
  try {
    const { city, category, search } = req.query;

    let query = {};

    // 🔍 AREA SEARCH (city OR landmark OR title)
    if (search) {
      query.$or = [
        { city: new RegExp(search, "i") },
        { landmark: new RegExp(search, "i") },
        { title: new RegExp(search, "i") },
      ];
    }

    // 🏙️ CITY FILTER (from explore input)
    if (city) {
      query.city = new RegExp(city, "i");
    }

    // 🏷️ CATEGORY FILTER
    if (category && category !== "all") {
      query.category = category;
    }

    const places = await Place.find(query)
      .sort({ createdAt: -1 }) // newest first
      .populate("createdBy", "name");

    res.json(places);
  } catch (error) {
    console.error("GET PLACES ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ===================================================
// 📍 GET PLACE BY ID
// ===================================================
const getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id)
      .populate("createdBy", "name");

    if (!place) {
      return res.status(404).json({ message: "Place not found" });
    }

    res.json(place);
  } catch (error) {
    console.error("GET PLACE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addPlace,
  getPlaces,
  getPlaceById,
};

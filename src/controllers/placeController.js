const mongoose = require("mongoose");
const Place = require("../models/placeModel");

/* ================= ➕ ADD PLACE ================= */
exports.addPlace = async (req, res) => {
  try {
    const images = req.files?.map((file) => file.path) || [];

    const place = new Place({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      images,
      address: req.body.address,
      landmark: req.body.landmark,
      city: req.body.city.toLowerCase(),
      state: req.body.state,
      country: req.body.country,
      createdBy: req.user._id,
    });

    const savedPlace = await place.save();

    res.status(201).json({
      message: "Place added successfully",
      place: savedPlace,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= 🌍 GET ALL PLACES (PAGINATED) ================= */
exports.getPlaces = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 6,
      category,
      city,
      sort = "newest",
    } = req.query;

    const query = {};

    if (category && category !== "all") {
      query.category = category;
    }

    if (city) {
      query.city = new RegExp(city, "i");
    }

    /* 🔃 SORTING */
    let sortOption = { createdAt: -1 };
    if (sort === "rating") {
      sortOption = { avgRating: -1 };
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [places, total] = await Promise.all([
      Place.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(Number(limit)),
      Place.countDocuments(query),
    ]);

    res.json({
      places,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      total,
    });
  } catch (error) {
    console.error("GET PLACES ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/* ================= 📍 GET PLACE BY ID ================= */
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

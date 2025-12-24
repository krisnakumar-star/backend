const express = require("express");
const cors = require("cors");

const app = express();

// ======================
// MIDDLEWARE
// ======================
app.use(
  cors({
    origin: "*", // later restrict to frontend URL
    credentials: true,
  })
);
app.use(express.json());

// 🔍 DEBUG MIDDLEWARE (OK to keep for now)
app.use((req, res, next) => {
  console.log("➡️", req.method, req.url);
  console.log("📦 Body:", req.body);
  next();
});

// ======================
// ROUTES
// ======================
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/places", require("./routes/placeRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));

// ======================
// TEST ROUTE
// ======================
app.get("/", (req, res) => {
  res.send("Local Treasure API is running 🚀");
});

module.exports = app;

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// ======================
// CONNECT DATABASE
// ======================
connectDB();

// ======================
// MIDDLEWARE
// ======================
app.use(cors());
app.use(express.json());


// 🔍 DEBUG MIDDLEWARE (you can remove later)
app.use((req, res, next) => {
  console.log('➡️', req.method, req.url);
  console.log('📦 Body:', req.body);
  next();
});

// ======================
// ROUTES
// ======================
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/places', require('./routes/placeRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes')); 
app.use("/api/contact", require("./routes/contactRoutes"));
// ⭐ STEP 7 ADDED

// ======================
// TEST ROUTE
// ======================
app.get('/', (req, res) => {
  res.send('Local Treasure API is running 🚀');
});

module.exports = app;

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/places', require('./routes/placeRoutes')); // ✅ THIS LINE

app.get('/', (req, res) => {
  res.send('Local Treasure API is running 🚀');
});

module.exports = app;

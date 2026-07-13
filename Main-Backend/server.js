require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const AddroomRoutes = require('./routes/AddroomRoutes');
const OwnerRoutes = require('./routes/Hotel-OwnerRoutes');
const UserRoutes = require('./routes/UserRoutes');
const AdminRoutes = require('./routes/AdminRoutes');
const BookRoomRoutes = require('./routes/BookRoomRoutes');
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

const allowedOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map((origin) => origin.trim())
  : true; // reflect any origin when not configured (local dev)

app.use(cors({ origin: allowedOrigins }));

// Routes
app.use('/api/Admin',AdminRoutes);
app.use('/api/rooms', AddroomRoutes);
app.use('/api/Owners', OwnerRoutes);
app.use('/api/users', UserRoutes);
app.use('/api/bookroom',BookRoomRoutes);

app.get('/', (req, res) => res.send('Hotel Project API is running'));

// Start server
const PORT = process.env.PORT || 5200;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);

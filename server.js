require('dotenv').config();
const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');

const app = express();

// ─── Middleware ───────────────────────────────────────────────────
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || '*',
    'http://localhost:3000',
    'http://127.0.0.1:5500',   // VS Code Live Server
    'http://localhost:5500',
  ],
  credentials: true
}));
app.use(express.json());

// ─── Routes ──────────────────────────────────────────────────────
app.use('/api/auth',         require('./auth'));
app.use('/api/register',     require('./register'));
app.use('/api/certificates', require('./certificates'));

// ─── Health check ────────────────────────────────────────────────
app.get('/', (req, res) => res.json({
  status: '✅ GDG CSMU API is running',
  version: '1.0.0',
  endpoints: {
    auth:         '/api/auth/signup  |  /api/auth/login  |  /api/auth/me',
    register:     'POST /api/register  |  GET /api/register/check',
    certificates: 'POST /api/certificates/generate  |  GET /api/certificates/verify/:id'
  }
}));

// ─── 404 handler ─────────────────────────────────────────────────
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

// ─── Connect MongoDB & Start ──────────────────────────────────────
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ MongoDB Atlas connected');
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    console.error('👉 Check your MONGODB_URI in .env file');
    process.exit(1);
  });

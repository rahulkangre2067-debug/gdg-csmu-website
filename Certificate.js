const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  certId:    { type: String, required: true, unique: true },
  name:      { type: String, required: true, trim: true },
  email:     { type: String, required: true, lowercase: true },
  rollNo:    { type: String, trim: true },
  course:    { type: String, trim: true },
  eventName: { type: String, required: true },
  issuedAt:  { type: Date, default: Date.now }
});

module.exports = mongoose.model('Certificate', certificateSchema);

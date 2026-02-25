const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name:      { type: String, required: true, trim: true },
  email:     { type: String, required: true, lowercase: true, trim: true },
  phone:     { type: String, trim: true },
  rollNo:    { type: String, trim: true },
  course:    { type: String, trim: true },
  eventId:   { type: String, required: true },
  eventName: { type: String, required: true },
  status:    { type: String, enum: ['pending', 'confirmed', 'attended'], default: 'pending' },
  registeredAt: { type: Date, default: Date.now }
});

// Prevent double registration
registrationSchema.index({ email: 1, eventId: 1 }, { unique: true });

module.exports = mongoose.model('Registration', registrationSchema);

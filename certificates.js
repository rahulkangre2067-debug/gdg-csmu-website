const router = require('express').Router();
const Certificate = require('./Certificate');
const Registration = require('./Registration');

// POST /api/certificates/generate
router.post('/generate', async (req, res) => {
  try {
    const { name, email, rollNo, course, eventName } = req.body;
    if (!name || !email || !eventName)
      return res.status(400).json({ message: 'Name, email and event name are required' });

    // Check they actually registered + attended
    // (comment this out during testing if needed)
    // const reg = await Registration.findOne({ email, eventName });
    // if (!reg) return res.status(403).json({ message: 'No registration found for this event' });

    // Check if cert already issued
    const existing = await Certificate.findOne({ email, eventName });
    if (existing)
      return res.json({ message: 'Certificate already issued', data: existing });

    // Generate unique cert ID
    const certId = 'GDG-CSMU-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substr(2, 4).toUpperCase();

    const cert = await Certificate.create({ certId, name, email, rollNo, course, eventName });
    res.status(201).json({ message: 'Certificate generated! 🎓', data: cert });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/certificates/verify/:certId — Verify a certificate
router.get('/verify/:certId', async (req, res) => {
  const cert = await Certificate.findOne({ certId: req.params.certId });
  if (!cert) return res.status(404).json({ valid: false, message: 'Certificate not found' });
  res.json({ valid: true, data: cert });
});

// GET /api/certificates/my?email=x — Get all certs for an email
router.get('/my', async (req, res) => {
  const certs = await Certificate.find({ email: req.query.email }).sort({ issuedAt: -1 });
  res.json({ count: certs.length, data: certs });
});

module.exports = router;

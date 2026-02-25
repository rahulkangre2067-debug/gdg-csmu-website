const router = require('express').Router();
const Registration = require('./Registration');

// POST /api/register  — Register for an event
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, rollNo, course, eventId, eventName } = req.body;
    if (!name || !email || !eventId || !eventName)
      return res.status(400).json({ message: 'Name, email and event are required' });

    // Check duplicate
    const exists = await Registration.findOne({ email, eventId });
    if (exists)
      return res.status(400).json({ message: 'You are already registered for this event!' });

    const reg = await Registration.create({ name, email, phone, rollNo, course, eventId, eventName });
    res.status(201).json({ message: `Successfully registered for ${eventName}! 🎉`, data: reg });
  } catch (err) {
    if (err.code === 11000)
      return res.status(400).json({ message: 'Already registered for this event' });
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/register/check?email=x&eventId=y — Check if already registered
router.get('/check', async (req, res) => {
  const { email, eventId } = req.query;
  const exists = await Registration.findOne({ email, eventId });
  res.json({ registered: !!exists });
});

// GET /api/register/all — Admin: see all registrations
router.get('/all', async (req, res) => {
  const regs = await Registration.find().sort({ registeredAt: -1 });
  res.json({ count: regs.length, data: regs });
});

// GET /api/register/event/:eventId — Admin: registrations for one event
router.get('/event/:eventId', async (req, res) => {
  const regs = await Registration.find({ eventId: req.params.eventId }).sort({ registeredAt: -1 });
  res.json({ count: regs.length, event: req.params.eventId, data: regs });
});

module.exports = router;

const express = require('express');
const SpeakingTest = require('../models/SpeakingTest');

const router = express.Router();

// GET /api/speaking
router.get('/', async (req, res) => {
  try {
    const doc = await SpeakingTest.findOne();
    if (!doc) return res.status(404).json({ message: 'Speaking test not found' });
    res.json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

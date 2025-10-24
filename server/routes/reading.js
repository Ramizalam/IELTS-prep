const express = require('express');
const ReadingTest = require('../models/ReadingTest');

const router = express.Router();

// GET /api/reading
router.get('/', async (req, res) => {
  try {
    const doc = await ReadingTest.findOne();
    if (!doc) return res.status(404).json({ message: 'Reading test not found' });
    res.json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

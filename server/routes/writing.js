const express = require('express');
const WritingTest = require('../models/WritingTest');

const router = express.Router();

// GET /api/writing
router.get('/', async (req, res) => {
  try {
    const doc = await WritingTest.findOne();
    if (!doc) return res.status(404).json({ message: 'Writing test not found' });
    res.json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

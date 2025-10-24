const express = require('express');
const ListeningTest = require('../models/ListeningTest');

const router = express.Router();

// GET /api/listening
router.get('/', async (req, res) => {
  try {
    const doc = await ListeningTest.findOne();
    if (!doc) return res.status(404).json({ message: 'Listening test not found' });
    res.json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

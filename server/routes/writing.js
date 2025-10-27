const express = require('express');
const WritingTest = require('../models/WritingTest');
const WritingSubmission = require('../models/WritingSubmission');
const router = express.Router();

// GET /api/writing - Get writing test
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

// POST /api/writing/submit - Submit writing test
router.post('/submit', async (req, res) => {
  try {
    const { userId, testId, task1Response, task2Response } = req.body;

    // Validate required fields
    if (!userId || !testId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check if submission already exists (draft)
    let submission = await WritingSubmission.findOne({
      userId,
      testId,
      status: 'draft',
    });

    if (submission) {
      // Update existing draft
      submission.task1Response = task1Response;
      submission.task2Response = task2Response;
      submission.status = 'submitted';
      submission.submittedAt = new Date();
    } else {
      // Create new submission
      submission = new WritingSubmission({
        userId,
        testId,
        task1Response,
        task2Response,
        status: 'submitted',
        submittedAt: new Date(),
      });
    }

    await submission.save();

    res.json({
      success: true,
      message: 'Writing test submitted successfully!',
      submissionId: submission._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/writing/save-draft - Save draft (auto-save)
router.post('/save-draft', async (req, res) => {
  try {
    const { userId, testId, task1Response, task2Response } = req.body;

    if (!userId || !testId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Find existing draft or create new one
    let submission = await WritingSubmission.findOneAndUpdate(
      { userId, testId, status: 'draft' },
      {
        userId,
        testId,
        task1Response,
        task2Response,
        status: 'draft',
      },
      { upsert: true, new: true }
    );

    res.json({
      success: true,
      message: 'Draft saved',
      submissionId: submission._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/writing/submission/:userId/:testId - Get user's submission/draft
router.get('/submission/:userId/:testId', async (req, res) => {
  try {
    const { userId, testId } = req.params;

    const submission = await WritingSubmission.findOne({
      userId,
      testId,
    }).sort({ createdAt: -1 });

    if (!submission) {
      return res.json({ submission: null });
    }

    res.json({ submission });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/writing/submissions/:userId - Get all user submissions
router.get('/submissions/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const submissions = await WritingSubmission.find({ userId })
      .populate('testId')
      .sort({ createdAt: -1 });

    res.json({ submissions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

const express = require('express');
const SpeakingTest = require('../models/SpeakingTest');
const router = express.Router();

// GET /api/speaking - Get test questions
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

// POST /api/speaking/evaluate - Evaluate user response with AI
router.post('/evaluate', async (req, res) => {
  try {
    const { transcript, partNumber, questionIndex } = req.body;

    if (!transcript) {
      return res.status(400).json({ message: 'Transcript is required' });
    }

    // Evaluate based on IELTS speaking criteria
    const evaluation = evaluateResponse(transcript, partNumber);
    
    res.json(evaluation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Evaluation error' });
  }
});

// Helper function to evaluate IELTS speaking response
function evaluateResponse(transcript, partNumber) {
  const words = transcript.trim().split(/\s+/);
  const wordCount = words.length;
  const sentences = transcript.split(/[.!?]+/).filter(s => s.trim().length > 0);
  
  // Fluency & Coherence (0-9)
  let fluency = 5.0;
  if (wordCount > 30) fluency += 0.5;
  if (wordCount > 50) fluency += 0.5;
  if (wordCount > 80) fluency += 0.5;
  if (sentences.length > 3) fluency += 0.5;
  
  // Lexical Resource (vocabulary)
  let lexical = 5.0;
  const uniqueWords = new Set(words.map(w => w.toLowerCase()));
  const lexicalDiversity = uniqueWords.size / wordCount;
  if (lexicalDiversity > 0.6) lexical += 1.0;
  if (wordCount > 50) lexical += 0.5;
  
  // Grammatical Range
  let grammar = 5.0;
  if (transcript.includes(',')) grammar += 0.5;
  if (transcript.match(/because|however|although|therefore/i)) grammar += 0.5;
  if (wordCount > 40) grammar += 0.5;
  
  // Pronunciation (based on text complexity)
  let pronunciation = 5.0;
  if (words.some(w => w.length > 8)) pronunciation += 0.5;
  if (wordCount > 60) pronunciation += 0.5;
  
  // Adjust for part difficulty
  if (partNumber === 2 && wordCount > 120) {
    fluency += 0.5;
    lexical += 0.5;
  }
  if (partNumber === 3 && wordCount > 50) {
    grammar += 0.5;
    lexical += 0.5;
  }
  
  // Cap at 9.0
  fluency = Math.min(fluency, 9.0);
  lexical = Math.min(lexical, 9.0);
  grammar = Math.min(grammar, 9.0);
  pronunciation = Math.min(pronunciation, 9.0);
  
  const overallBand = ((fluency + lexical + grammar + pronunciation) / 4).toFixed(1);
  
  return {
    fluency: fluency.toFixed(1),
    lexical: lexical.toFixed(1),
    grammar: grammar.toFixed(1),
    pronunciation: pronunciation.toFixed(1),
    overallBand: parseFloat(overallBand),
    wordCount,
    feedback: generateFeedback(wordCount, partNumber, parseFloat(overallBand))
  };
}

function generateFeedback(wordCount, partNumber, band) {
  const feedback = [];
  
  if (wordCount < 30) {
    feedback.push('Try to elaborate more on your answers.');
  } else if (wordCount > 80) {
    feedback.push('Excellent response length!');
  }
  
  if (partNumber === 2 && wordCount < 100) {
    feedback.push('Part 2 requires 1-2 minutes of speaking (approximately 150-200 words).');
  }
  
  if (band >= 7.0) {
    feedback.push('Great fluency and vocabulary usage!');
  } else if (band < 5.5) {
    feedback.push('Focus on using varied vocabulary and complete sentences.');
  }
  
  return feedback;
}

module.exports = router;

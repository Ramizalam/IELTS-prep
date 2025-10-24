const mongoose = require('mongoose');

const SectionSchema = new mongoose.Schema({
  title: String,
  description: String,
  questions: String, // e.g., "1-10"
});

const ListeningTestSchema = new mongoose.Schema({
  sections: [SectionSchema],
  correctAnswers: [mongoose.Schema.Types.Mixed],
});

module.exports = mongoose.model('ListeningTest', ListeningTestSchema);

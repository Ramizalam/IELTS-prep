import React, { useState, useEffect } from 'react';
import { Headphones, Clock, Play, Pause, Volume2 } from 'lucide-react';
import Timer from './Timer';

interface ListeningModuleProps {
  onComplete: (results: { score: number; answers: (string | number)[]; timeSpent: number }) => void;
}

const ListeningModule: React.FC<ListeningModuleProps> = ({ onComplete }) => {
  const [currentSection, setCurrentSection] = useState(1);
  const [answers, setAnswers] = useState<(string | number)[]>(Array(40).fill(''));
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  const correctAnswers = [
    // Section 1 (1-10)
    'library', '9:30', 'thompson', '07789 123456', 'student discount', 'monday', 'beginner', 'swimming', '25', 'reception',
    // Section 2 (11-20)
    'A', 'B', 'C', 'A', 'B', 'museum', 'guided tour', 'photography', 'café', 'gift shop',
    // Section 3 (21-30)
    'research methods', 'data collection', 'analysis', 'presentation', 'peer review', 'C', 'A', 'B', 'A', 'C',
    // Section 4 (31-40)
    'climate change', 'global warming', 'renewable energy', 'sustainability', 'carbon footprint', 'fossil fuels', 'solar power', 'wind energy', 'hydroelectric', 'environmental impact'
  ];

  const sections = [
    {
      title: 'Section 1 - Social Context',
      description: 'Conversation between a student and librarian about joining the library',
      questions: '1-10'
    },
    {
      title: 'Section 2 - General Interest',
      description: 'Monologue about a local museum and its facilities',
      questions: '11-20'
    },
    {
      title: 'Section 3 - Academic Context',
      description: 'Discussion between students and tutor about a research project',
      questions: '21-30'
    },
    {
      title: 'Section 4 - Academic Lecture',
      description: 'Lecture about renewable energy and environmental impact',
      questions: '31-40'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAnswerChange = (questionIndex: number, value: string | number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = value;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      const userAnswer = typeof answer === 'string' ? answer.toLowerCase().trim() : answer.toString();
      const correctAnswer = correctAnswers[index].toString().toLowerCase();
      if (userAnswer === correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const convertToIELTSBand = (rawScore: number) => {
    const bandTable = {
      39: 9.0, 37: 8.5, 35: 8.0, 32: 7.5, 30: 7.0,
      26: 6.5, 23: 6.0, 18: 5.5, 16: 5.0, 13: 4.5,
      10: 4.0, 8: 3.5, 6: 3.0, 4: 2.5, 3: 2.0
    };
    
    for (const [score, band] of Object.entries(bandTable)) {
      if (rawScore >= parseInt(score)) {
        return band;
      }
    }
    return 1.0;
  };

  const handleSubmit = () => {
    const rawScore = calculateScore();
    const bandScore = convertToIELTSBand(rawScore);
    onComplete({ score: bandScore, answers, timeSpent });
  };

  const renderQuestions = (startIndex: number, endIndex: number) => {
    const questions = [];
    for (let i = startIndex; i <= endIndex; i++) {
      const questionNum = i + 1;
      questions.push(
        <div key={i} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {questionNum}. {getQuestionText(i)}
          </label>
          {getQuestionInput(i, questionNum)}
        </div>
      );
    }
    return questions;
  };

  const getQuestionText = (index: number) => {
    const texts = [
      'What is the main purpose of the student\'s visit?',
      'What time does the library open on weekdays?',
      'What is the librarian\'s surname?',
      'What is the contact number for renewals?',
      'What type of discount is available?',
      'Which day is the library closed?',
      'What level computer course is recommended?',
      'Which activity is NOT available at the library?',
      'How many computers are in the study area?',
      'Where should visitors go for help?'
    ];
    
    if (index < 10) return texts[index];
    if (index < 20) return `Question ${index + 1} - Multiple choice A, B, or C`;
    if (index < 30) return `Question ${index + 1} - Complete the summary`;
    return `Question ${index + 1} - Complete the notes`;
  };

  const getQuestionInput = (index: number, questionNum: number) => {
    if (index >= 10 && index < 15) {
      return (
        <div className="space-y-2">
          {['A', 'B', 'C'].map(option => (
            <label key={option} className="flex items-center">
              <input
                type="radio"
                name={`q${questionNum}`}
                value={option}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      );
    }
    
    return (
      <input
        type="text"
        value={answers[index]}
        onChange={(e) => handleAnswerChange(index, e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="Enter your answer"
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Headphones className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">IELTS Listening Test</h1>
                <p className="text-gray-600">40 questions • 30 minutes + 10 minutes transfer time</p>
              </div>
            </div>
            <Timer duration={40 * 60} onTimeUp={handleSubmit} />
          </div>
        </div>

        {/* Audio Player Simulation */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Audio Player</h3>
            <div className="flex items-center space-x-2">
              <Volume2 className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-500">Volume: 75%</span>
            </div>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? 'Pause' : 'Play'} Audio</span>
              </button>
            </div>
            <div className="mt-4 bg-blue-100 text-blue-800 text-sm p-3 rounded">
              <p><strong>Note:</strong> In the actual test, audio will play automatically and cannot be paused or replayed. 
              This simulation allows you to control playback for practice purposes.</p>
            </div>
          </div>
        </div>

        {/* Section Navigation */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Test Sections</h3>
            <div className="flex space-x-2">
              {[1, 2, 3, 4].map(num => (
                <button
                  key={num}
                  onClick={() => setCurrentSection(num)}
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    currentSection === num
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Section {num}
                </button>
              ))}
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800">{sections[currentSection - 1].title}</h4>
            <p className="text-blue-700 text-sm mt-1">{sections[currentSection - 1].description}</p>
            <p className="text-blue-600 text-sm mt-2">Questions: {sections[currentSection - 1].questions}</p>
          </div>
        </div>

        {/* Questions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-lg font-semibold mb-6">Section {currentSection} Questions</h3>
          {renderQuestions((currentSection - 1) * 10, currentSection * 10 - 1)}
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Complete Listening Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListeningModule;
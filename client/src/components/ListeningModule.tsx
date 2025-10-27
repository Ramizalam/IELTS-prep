import React, { useState, useEffect } from 'react';
import { Headphones, Play, Pause, Volume2 } from 'lucide-react';
import Timer from './Timer';

interface ListeningModuleProps {
  onComplete: (results: { score: number; answers: (string | number)[]; timeSpent: number }) => void;
}

const ListeningModule: React.FC<ListeningModuleProps> = ({ onComplete }) => {
  const [currentSection, setCurrentSection] = useState(1);
  const [answers, setAnswers] = useState<(string | number)[]>(Array(40).fill(''));
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sections, setSections] = useState<{ title: string; description: string; questions: string }[]>([]);
  const [correctAnswers, setCorrectAnswers] = useState<(string | number)[]>([]);

  // Section 2 correct answers (questions 11-20)
  const section2CorrectAnswers = ['B', 'C', 'C', 'B', 'D', 'A', 'B', 'B', 'C', 'C'];

  // Section 2 question options
  const section2Options = [
    // Question 1 options
    ['A library', 'A railway station', 'A school', 'A government office'],
    // Question 2 options
    ['On the right of the main hall', 'Upstairs on the second floor', 'On the left of the main hall', 'Behind the café'],
    // Question 3 options
    ['Riverdale architecture', 'Ancient artifacts', 'Women in Modern Art', 'Space exploration'],
    // Question 4 options
    ['Antique jewelry', 'Postcards and crafts', 'Paintings by local artists', 'Second-hand books'],
    // Question 5 options
    ['500', '1,000', '2,500', '5,000'],
    // Question 6 options
    ['Members only', 'Everyone', 'Tourists', 'Students'],
    // Question 7 options
    ['30 minutes', '45 minutes', '1 hour', '90 minutes'],
    // Question 8 options
    ['Sunday', 'Monday', 'Tuesday', 'Saturday'],
    // Question 9 options
    ['£10', '£8', '£6', 'Free'],
    // Question 10 options
    ['The café', 'The ticket counter', 'The Information Desk', 'The souvenir shop']
  ];

  // Section 3 correct answers (questions 21-30)
  const section3CorrectAnswers = ['B', 'B', 'C', 'C', 'B', 'A', 'B', 'B', 'B', 'B'];

  // Section 3 question options
  const section3Options = [
    // Question 1 options
    ['The use of smartphones in education', 'The effect of social media on students\' study habits', 'The impact of group study on grades', 'The rise of online learning'],
    // Question 2 options
    ['It\'s a popular research area', 'They noticed their classmates using social media while studying', 'Their tutor suggested it', 'It\'s easy to collect data for it'],
    // Question 3 options
    ['Through interviews only', 'By reviewing articles', 'Using an online questionnaire', 'By conducting experiments'],
    // Question 4 options
    ['Observations', 'Surveys of teachers', 'Conducting interviews', 'Reading journal articles'],
    // Question 5 options
    ['20 to 30', '50 to 60', '70 to 80', 'Over 100'],
    // Question 6 options
    ['Both quantitative and qualitative data', 'Only numerical data', 'Only interview data', 'Historical data'],
    // Question 7 options
    ['At the end of this month', 'On the 15th of next month', 'Two weeks from now', 'June 30th'],
    // Question 8 options
    ['APA', 'Harvard', 'MLA', 'Chicago'],
    // Question 9 options
    ['Monday to Friday, 9 a.m. – 5 p.m.', 'Monday to Friday, 10 a.m. – 4 p.m.', 'Weekends only', 'Every day, 8 a.m. – 6 p.m.'],
    // Question 10 options
    ['Focus on grammar and spelling', 'Keep questions clear, data reliable, and time managed', 'Use as many sources as possible', 'Finish early to get extra credit']
  ];

  // Section 4 correct answers (questions 31-40)
  const section4CorrectAnswers = ['B', 'B', 'B', 'C', 'A', 'B', 'B', 'C', 'B', 'A'];

  // Section 4 question options
  const section4Options = [
    // Question 1 options
    ['Energy produced from fossil fuels', 'Energy from natural sources that are constantly replenished', 'Energy generated only from water and wind', 'Energy that is stored in batteries'],
    // Question 2 options
    ['Canada', 'India', 'Japan', 'Germany'],
    // Question 3 options
    ['They create noise pollution', 'They take up a lot of land and may disturb habitats', 'They produce harmful gases', 'They are unreliable in all climates'],
    // Question 4 options
    ['It causes water pollution', 'It releases carbon dioxide', 'It can harm birds and create noise', 'It destroys forests'],
    // Question 5 options
    ['Flooding and displacement of people', 'Noise pollution', 'Depletion of groundwater', 'Radiation emissions'],
    // Question 6 options
    ['It uses non-renewable materials', 'It releases carbon dioxide when burned', 'It depends heavily on weather conditions', 'It produces toxic waste'],
    // Question 7 options
    ['Air pollution from factories', 'Mining rare materials that harm ecosystems', 'Waste from turbine blades', 'Oil leakage'],
    // Question 8 options
    ['40% by 2030', '50% by 2040', '70% by 2050', '90% by 2060'],
    // Question 9 options
    ['It increases reliance on oil imports', 'It improves energy security and independence', 'It lowers education costs', 'It reduces industrial growth'],
    // Question 10 options
    ['High installation costs and storage issues', 'Lack of raw materials', 'Global population growth', 'Weak demand from industries']
  ];

  // Fetch test data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const baseUrl = import.meta.env?.VITE_API_URL || 'http://localhost:5000';
        const res = await fetch(`${baseUrl}/api/listening`);
        if (!res.ok) throw new Error(`Failed to load listening data (${res.status})`);
        const data = await res.json();
        setSections(data.sections || []);
        setCorrectAnswers(data.correctAnswers || []);
      } catch (e: any) {
        setError(e.message || 'Error fetching listening data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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

  const toggleAudio = () => {
    if (audioRef) {
      if (isPlaying) {
        audioRef.pause();
      } else {
        audioRef.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const getAudioSource = () => {
    const baseUrl = import.meta.env?.VITE_API_URL || 'http://localhost:5000';
    switch (currentSection) {
      case 1:
        return `${baseUrl}/public/Librarian audio.mp3`;
      case 2:
        return `${baseUrl}/public/museum audio.mp3`;
      case 3:
        return `${baseUrl}/public/Research project.mp3`;
      case 4:
        return `${baseUrl}/public/Lecture audio.mp3`;
      default:
        return `${baseUrl}/public/Librarian audio.mp3`;
    }
  };

  const getAudioLabel = () => {
    switch (currentSection) {
      case 1:
        return 'Library Audio';
      case 2:
        return 'Museum Audio';
      case 3:
        return 'Research Project Audio';
      case 4:
        return 'Lecture Audio';
      default:
        return 'Library Audio';
    }
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((answer, index) => {
      const userAnswer = typeof answer === 'string' ? answer.toLowerCase().trim() : answer.toString();
      
      // Use Section 2 correct answers for questions 10-19
      let correctAnswer;
      if (index >= 10 && index < 20) {
        correctAnswer = section2CorrectAnswers[index - 10].toLowerCase();
      } else if (index >= 20 && index < 30) {
        // Use Section 3 correct answers for questions 20-29
        correctAnswer = section3CorrectAnswers[index - 20].toLowerCase();
      } else if (index >= 30 && index < 40) {
        // Use Section 4 correct answers for questions 30-39
        correctAnswer = section4CorrectAnswers[index - 30].toLowerCase();
      } else {
        correctAnswer = correctAnswers[index]?.toString().toLowerCase() || '';
      }
      
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
    const section1Texts = [
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

    const section2Texts = [
      'What was the museum building originally used as?',
      'Where can visitors find the History Gallery?',
      'What is the theme of the current temporary exhibition?',
      'What can visitors buy at the souvenir shop?',
      'How many reference books are in the reading room?',
      'Who is allowed to borrow books from the reading room?',
      'How long does each guided tour last?',
      'On which day is the museum closed?',
      'How much does a student ticket cost?',
      'Where should visitors go if they need assistance?'
    ];

    const section3Texts = [
      'What is the main topic of the students\' research project?',
      'Why did the students choose this topic?',
      'How do the students plan to collect data?',
      'What additional method does the tutor recommend?',
      'How many participants should they include in their research?',
      'What kind of data should the students collect?',
      'When is the first draft due?',
      'What referencing style should they use?',
      'When is the Writing Support Centre open?',
      'What advice does the tutor give at the end?'
    ];

    const section4Texts = [
      'What does renewable energy mainly refer to?',
      'Which country benefits most from solar energy due to high sunlight exposure?',
      'What is a disadvantage of large solar farms?',
      'What is one environmental concern about wind energy?',
      'What negative impact can hydroelectric dams cause?',
      'Why is biomass energy considered less clean than other renewable sources?',
      'What environmental issue is related to producing solar panels?',
      'According to the lecture, renewable energy could reduce global CO₂ emissions by up to:',
      'What is one major benefit of renewable energy for countries?',
      'Which of the following is mentioned as a barrier to renewable energy adoption?'
    ];
    
    if (index < 10) return section1Texts[index];
    if (index < 20) return section2Texts[index - 10];
    if (index < 30) return section3Texts[index - 20];
    if (index < 40) return section4Texts[index - 30];
    return `Question ${index + 1} - Complete the notes`;
  };

  const getQuestionInput = (index: number, questionNum: number) => {
    // Section 2 questions (10-19) with full answer options
    if (index >= 10 && index < 20) {
      const questionIndex = index - 10;
      const options = section2Options[questionIndex];
      return (
        <div className="space-y-2">
          {options.map((option, optionIndex) => {
            const letter = String.fromCharCode(65 + optionIndex); // A, B, C, D
            return (
              <label key={letter} className="flex items-center">
                <input
                  type="radio"
                  name={`q${questionNum}`}
                  value={letter}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm">{letter}) {option}</span>
              </label>
            );
          })}
        </div>
      );
    }

    // Section 3 questions (20-29) with full answer options
    if (index >= 20 && index < 30) {
      const questionIndex = index - 20;
      const options = section3Options[questionIndex];
      return (
        <div className="space-y-2">
          {options.map((option, optionIndex) => {
            const letter = String.fromCharCode(65 + optionIndex); // A, B, C, D
            return (
              <label key={letter} className="flex items-center">
                <input
                  type="radio"
                  name={`q${questionNum}`}
                  value={letter}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm">{letter}) {option}</span>
              </label>
            );
          })}
        </div>
      );
    }

    // Section 4 questions (30-39) with full answer options
    if (index >= 30 && index < 40) {
      const questionIndex = index - 30;
      const options = section4Options[questionIndex];
      return (
        <div className="space-y-2">
          {options.map((option, optionIndex) => {
            const letter = String.fromCharCode(65 + optionIndex); // A, B, C, D
            return (
              <label key={letter} className="flex items-center">
                <input
                  type="radio"
                  name={`q${questionNum}`}
                  value={letter}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  className="mr-2"
                />
                <span className="text-sm">{letter}) {option}</span>
              </label>
            );
          })}
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

        {loading && (
          <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-600">Loading listening data...</div>
        )}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-4 mb-6">{error}</div>
        )}

        {!loading && !error && sections.length > 0 && (
        <>
        {/* Audio Player */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Audio Player</h3>
            <div className="flex items-center space-x-2">
              <Volume2 className="w-5 h-5 text-gray-500" />
              <span className="text-sm text-gray-500">{getAudioLabel()}</span>
            </div>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-4">
            <audio
              ref={setAudioRef}
              onEnded={handleAudioEnded}
              className="w-full mb-4"
              controls
              key={currentSection} // Force re-render when section changes
            >
              <source src={getAudioSource()} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={toggleAudio}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                <span>{isPlaying ? 'Pause' : 'Play'} Audio</span>
              </button>
            </div>
            <div className="mt-4 bg-blue-100 text-blue-800 text-sm p-3 rounded">
              <p><strong>Note:</strong> In the actual IELTS test, audio will play automatically and cannot be paused or replayed. 
              This practice version allows you to control playback for learning purposes.</p>
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
        </>
        )}
      </div>
    </div>
  );
};

export default ListeningModule;
import React, { useState, useEffect } from 'react';
import { BookOpen, Clock } from 'lucide-react';
import Timer from './Timer';

interface ReadingModuleProps {
  onComplete: (results: { score: number; answers: (string | number)[]; timeSpent: number }) => void;
}

const ReadingModule: React.FC<ReadingModuleProps> = ({ onComplete }) => {
  const [currentPassage, setCurrentPassage] = useState(1);
  const [answers, setAnswers] = useState<(string | number)[]>(Array(40).fill(''));
  const [timeSpent, setTimeSpent] = useState(0);

  const correctAnswers = [
    // Passage 1 (1-13)
    'B', 'A', 'C', 'B', 'A', 'TRUE', 'FALSE', 'NOT GIVEN', 'TRUE', 'FALSE', 'education', 'technology', 'communication',
    // Passage 2 (14-26)
    'iv', 'vii', 'ii', 'i', 'vi', 'C', 'A', 'B', 'D', 'innovation', 'research', 'development', 'market',
    // Passage 3 (27-40)
    'YES', 'NO', 'NOT GIVEN', 'YES', 'NO', 'D', 'B', 'A', 'C', 'B', 'sustainability', 'environment', 'future', 'challenges'
  ];

  const passages = [
    {
      title: 'The Evolution of Urban Planning',
      text: `Modern urban planning has undergone significant transformations over the past century. What began as simple grid systems in the early 1900s has evolved into complex, sustainable city designs that prioritize both human welfare and environmental protection.

      The Industrial Revolution marked a turning point in urban development. Cities grew rapidly, but this growth came with challenges: overcrowding, pollution, and inadequate infrastructure. Urban planners of the early 20th century, such as Daniel Burnham and Frederick Law Olmsted, recognized the need for comprehensive city planning that would address these issues.

      One of the most influential movements was the Garden City concept, introduced by Ebenezer Howard in 1898. This approach aimed to combine the benefits of city and country living by creating self-contained communities surrounded by greenbelts. The idea was to limit urban sprawl while providing residents with access to both urban amenities and natural spaces.

      The mid-20th century saw the rise of modernist planning, characterized by large-scale housing projects and car-centric design. However, critics like Jane Jacobs argued that such approaches ignored the social fabric of communities and the importance of mixed-use development.

      Today's urban planning emphasizes sustainability, walkability, and community engagement. Smart city technologies are being integrated to improve efficiency and quality of life. Cities are now designed with climate change in mind, incorporating green infrastructure, renewable energy systems, and resilient design principles.

      The future of urban planning will likely involve even greater integration of technology, more participatory planning processes, and innovative solutions to address growing populations and environmental challenges.`,
      questions: 13
    },
    {
      title: 'Artificial Intelligence in Healthcare',
      text: `Artificial Intelligence (AI) is revolutionizing healthcare delivery and patient outcomes across the globe. From diagnostic imaging to drug discovery, AI applications are transforming how medical professionals work and how patients receive care.

      In diagnostic imaging, AI algorithms can now detect abnormalities in medical scans with accuracy that rivals or exceeds human specialists. Machine learning models trained on thousands of images can identify early-stage cancers, cardiovascular diseases, and neurological conditions that might be missed by the human eye. This capability is particularly valuable in regions with shortages of specialist radiologists.

      Drug discovery, traditionally a process taking decades and costing billions of dollars, is being accelerated through AI. Researchers use machine learning to predict how different compounds will interact with biological targets, significantly reducing the time needed to identify promising drug candidates. Some pharmaceutical companies report reducing drug discovery timelines from years to months.

      Personalized medicine is another area where AI is making significant strides. By analyzing genetic data, medical histories, and lifestyle factors, AI systems can predict individual patient responses to treatments and recommend personalized therapeutic approaches. This precision medicine approach improves treatment effectiveness while reducing adverse reactions.

      However, the integration of AI in healthcare faces several challenges. Data privacy concerns are paramount, as medical records contain highly sensitive information. There are also questions about algorithmic bias, transparency in decision-making, and the potential for over-reliance on technology.

      Regulatory frameworks are still developing to ensure AI medical devices meet safety and efficacy standards. Healthcare professionals need training to effectively integrate AI tools into their practice while maintaining the human touch that is essential to patient care.

      Despite these challenges, the potential benefits of AI in healthcare are immense. As technology continues to advance and regulatory frameworks mature, AI will likely become an indispensable tool in modern medicine.`,
      questions: 13
    },
    {
      title: 'Climate Change and Global Food Security',
      text: `Climate change poses one of the most significant threats to global food security in the 21st century. Rising temperatures, changing precipitation patterns, and extreme weather events are already affecting agricultural productivity worldwide, with implications for billions of people who depend on farming for their livelihoods and food security.

      Temperature increases affect crop yields in complex ways. While some regions may benefit from longer growing seasons and increased CO2 concentrations, many major agricultural areas face declining productivity. Heat stress reduces the yields of staple crops like wheat, rice, and maize. In tropical regions, temperatures are approaching or exceeding the thermal tolerance of many crops.

      Water availability is becoming increasingly unpredictable. Drought conditions are intensifying in many regions, while others experience more frequent flooding. Both extremes damage crops and reduce yields. Changes in rainfall patterns also affect the timing of planting and harvesting, disrupting traditional farming cycles that have been refined over generations.

      Sea-level rise threatens coastal agricultural areas through saltwater intrusion, which makes soil unsuitable for most crops. Small island states and low-lying coastal regions are particularly vulnerable, with some areas already experiencing permanent loss of agricultural land.

      The impacts are not evenly distributed globally. Developing countries, particularly those in sub-Saharan Africa and parts of Asia, face the greatest risks. These regions often have limited adaptive capacity due to poverty, inadequate infrastructure, and reliance on rain-fed agriculture.

      Adaptation strategies are being developed and implemented worldwide. These include developing climate-resilient crop varieties, improving water management systems, and diversifying agricultural practices. Precision agriculture technologies help farmers optimize inputs and reduce waste. Some farmers are shifting to crops better suited to changing conditions.

      However, adaptation alone may not be sufficient. Mitigation efforts to reduce greenhouse gas emissions are crucial to limit the severity of climate impacts. Agriculture itself is both a victim and a contributor to climate change, responsible for significant greenhouse gas emissions through livestock production, rice cultivation, and deforestation.

      International cooperation is essential to address these challenges. Technology transfer, financial support for adaptation measures, and coordinated research efforts are all necessary components of a global response to climate change and food security challenges.`,
      questions: 14
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
      const userAnswer = typeof answer === 'string' ? answer.toString().toLowerCase().trim() : answer.toString();
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

  const getQuestionStartIndex = (passageNum: number) => {
    if (passageNum === 1) return 0;
    if (passageNum === 2) return 13;
    return 26;
  };

  const renderQuestions = (passageNum: number) => {
    const startIndex = getQuestionStartIndex(passageNum);
    const endIndex = startIndex + passages[passageNum - 1].questions;
    const questions = [];

    for (let i = startIndex; i < endIndex; i++) {
      const questionNum = i + 1;
      questions.push(
        <div key={i} className="mb-4 p-4 bg-gray-50 rounded-lg">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {questionNum}. {getQuestionText(i, passageNum)}
          </label>
          {getQuestionInput(i, questionNum, passageNum)}
        </div>
      );
    }
    return questions;
  };

  const getQuestionText = (index: number, passageNum: number) => {
    const questionTexts: { [key: number]: string[] } = {
      1: [
        'What was the main cause of urban growth challenges?',
        'Who introduced the Garden City concept?',
        'What did critics say about modernist planning?',
        'What is emphasized in today\'s urban planning?',
        'What will future planning likely involve?',
        'The Industrial Revolution led to overcrowding in cities.',
        'Daniel Burnham worked alone on city planning.',
        'The Garden City concept was introduced in 1898.',
        'Jane Jacobs supported modernist planning.',
        'Smart city technologies improve quality of life.',
        'Modern planning prioritizes _____ and environmental protection.',
        'Cities now integrate _____ to improve efficiency.',
        'Future planning will involve greater _____.'
      ],
      2: [
        'Which paragraph contains the following information? Choose the correct heading for each paragraph.',
        'AI in diagnostic imaging',
        'Drug discovery acceleration',
        'Personalized medicine advances',
        'Implementation challenges',
        'What is the main advantage of AI in medical imaging?',
        'How has AI affected drug discovery timelines?',
        'What does personalized medicine analyze?',
        'What is a major concern about AI in healthcare?',
        'AI promotes _____ in medical research.',
        'Machine learning accelerates _____.',
        'Precision medicine focuses on _____.',
        'Regulatory frameworks ensure _____.'
      ],
      3: [
        'Climate change definitely threatens food security worldwide.',
        'All regions will benefit from longer growing seasons.',
        'Sea-level rise affects coastal agricultural areas.',
        'Developing countries have adequate adaptive capacity.',
        'Agriculture contributes to greenhouse gas emissions.',
        'Which regions face the greatest climate risks?',
        'What is saltwater intrusion?',
        'What are precision agriculture technologies used for?',
        'Why is international cooperation necessary?',
        'What type of cooperation is mentioned as essential?',
        'Adaptation strategies focus on _____.',
        'Climate change affects the _____ negatively.',
        'Technology and cooperation are needed for the _____.',
        'Agriculture faces significant _____.'
      ]
    };

    const passageQuestions = questionTexts[passageNum];
    const questionIndex = index - getQuestionStartIndex(passageNum);
    return passageQuestions[questionIndex] || `Question ${index + 1}`;
  };

  const getQuestionInput = (index: number, questionNum: number, passageNum: number) => {
    const questionIndex = index - getQuestionStartIndex(passageNum);
    
    // Multiple choice questions
    if ((passageNum === 1 && questionIndex < 5) || 
        (passageNum === 2 && questionIndex >= 5 && questionIndex < 9) ||
        (passageNum === 3 && questionIndex >= 5 && questionIndex < 10)) {
      return (
        <div className="space-y-2">
          {['A', 'B', 'C', 'D'].map(option => (
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

    // True/False/Not Given or Yes/No/Not Given
    if ((passageNum === 1 && questionIndex >= 5 && questionIndex < 10) ||
        (passageNum === 3 && questionIndex < 5)) {
      const options = passageNum === 1 ? ['TRUE', 'FALSE', 'NOT GIVEN'] : ['YES', 'NO', 'NOT GIVEN'];
      return (
        <div className="space-y-2">
          {options.map(option => (
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

    // Text input for completion questions
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
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">IELTS Reading Test</h1>
                <p className="text-gray-600">40 questions • 60 minutes</p>
              </div>
            </div>
            <Timer duration={60 * 60} onTimeUp={handleSubmit} />
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Passage */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                Passage {currentPassage}: {passages[currentPassage - 1].title}
              </h2>
              <div className="flex space-x-2">
                {[1, 2, 3].map(num => (
                  <button
                    key={num}
                    onClick={() => setCurrentPassage(num)}
                    className={`px-3 py-1 rounded-md text-sm font-medium ${
                      currentPassage === num
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="prose max-w-none text-gray-700 leading-relaxed">
              {passages[currentPassage - 1].text.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          </div>

          {/* Questions */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-6">
              Questions for Passage {currentPassage}
            </h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {renderQuestions(currentPassage)}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-8">
          <button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Complete Reading Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadingModule;
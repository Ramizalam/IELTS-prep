import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import Timer from './Timer';

interface ReadingModuleProps {
  onComplete: (results: { score: number; answers: (string | number)[]; timeSpent: number }) => void;
}

const ReadingModule: React.FC<ReadingModuleProps> = ({ onComplete }) => {
  const [currentPassage, setCurrentPassage] = useState(1);
  const [answers, setAnswers] = useState<(string | number)[]>(Array(40).fill(''));
  const [timeSpent, setTimeSpent] = useState(0);

  const correctAnswers = [
    // Passage 1 (1-10) - Updated with new questions
    'C', 'B', 'D', 'D', 'B', 'C', 'C', 'B', 'B', 'C',
    // Passage 2 (11-25) - Updated with new questions
    'B', 'B', 'B', 'C', 'B', 'C', 'B', 'C', 'C', 'C', 'B', 'B', 'B', 'A', 'C',
    // Passage 3 (26-40) - Updated with new questions
    'B', 'C', 'B', 'B', 'B', 'B', 'B', 'B', 'C', 'B', 'B', 'C', 'A', 'B', 'B'
  ];

  const passage1Options = [
    // Question 1 options
    ['Sustainable city designs', 'Smart city technologies', 'Simple grid systems', 'Green infrastructure'],
    // Question 2 options
    ['World War I', 'The Industrial Revolution', 'The Renaissance', 'The Green Revolution'],
    // Question 3 options
    ['Overcrowding', 'Pollution', 'Inadequate infrastructure', 'Advanced transportation systems'],
    // Question 4 options
    ['Daniel Burnham', 'Frederick Law Olmsted', 'Jane Jacobs', 'Ebenezer Howard'],
    // Question 5 options
    ['To promote industrial development', 'To combine city and country living', 'To expand urban sprawl', 'To increase car usage'],
    // Question 6 options
    ['Greenbelts and self-contained communities', 'Small-scale housing and pedestrian areas', 'Large-scale housing projects and car-centric design', 'Renewable energy systems'],
    // Question 7 options
    ['Daniel Burnham', 'Ebenezer Howard', 'Jane Jacobs', 'Frederick Law Olmsted'],
    // Question 8 options
    ['Industrial growth', 'Walkability and sustainability', 'Expansion of highways', 'High-rise development'],
    // Question 9 options
    ['Car-centric layouts', 'Smart city technologies', 'Isolated housing projects', 'Factory-centered cities'],
    // Question 10 options
    ['It will reduce technology use', 'It will focus only on rural areas', 'It will involve more technology and community participation', 'It will return to grid-based designs']
  ];

  const passage2Options = [
    // Question 1 options
    ['AI is replacing doctors in hospitals', 'AI is transforming healthcare delivery and patient outcomes', 'AI is mainly used for entertainment', 'AI is reducing the number of healthcare workers'],
    // Question 2 options
    ['Surgery', 'Diagnostic imaging', 'Nursing', 'Dentistry'],
    // Question 3 options
    ['Only skin diseases', 'Early-stage cancers and cardiovascular diseases', 'Only fractures', 'Emotional conditions'],
    // Question 4 options
    ['Because it is cheaper than traditional machines', 'Because it replaces nurses', 'Because of a shortage of specialist radiologists', 'Because it does not require electricity'],
    // Question 5 options
    ['By manufacturing drugs faster', 'By predicting how compounds interact with biological targets', 'By marketing drugs to hospitals', 'By reducing drug side effects directly'],
    // Question 6 options
    ['A few weeks', 'A few months', 'Decades and billions of dollars', 'Only one year'],
    // Question 7 options
    ['Days to hours', 'Years to months', 'Centuries to decades', 'Months to days'],
    // Question 8 options
    ['Providing the same treatment to all patients', 'Using AI to create generic drugs', 'Tailoring treatment based on individual patient data', 'Reducing the number of doctors'],
    // Question 9 options
    ['Only medical histories', 'Only genetic data', 'Genetic data, medical histories, and lifestyle factors', 'Hospital management data'],
    // Question 10 options
    ['Reducing hospital visits', 'Increasing drug prices', 'Improving treatment effectiveness and reducing adverse reactions', 'Eliminating the need for human doctors'],
    // Question 11 options
    ['Too many radiologists', 'Data privacy concerns', 'Lack of funding for AI research', 'Poor internet connectivity'],
    // Question 12 options
    ['The tendency of AI to prefer human doctors', 'Errors in AI decisions due to biased training data', 'A type of medical treatment', 'A new diagnostic tool'],
    // Question 13 options
    ['They make AI devices cheaper', 'They ensure AI medical devices are safe and effective', 'They promote competition among doctors', 'They increase hospital profits'],
    // Question 14 options
    ['Training', 'New hospital buildings', 'Government funding', 'More patients'],
    // Question 15 options
    ['AI will replace all medical professionals', 'AI\'s benefits are limited and temporary', 'AI will become an indispensable tool in modern medicine', 'AI should be banned due to ethical issues']
  ];

  const passage3Options = [
    // Question 1 options
    ['Climate change only affects coastal regions', 'Climate change is a major threat to global food security', 'Agriculture no longer depends on climate', 'Farming practices are identical worldwide'],
    // Question 2 options
    ['Rising temperatures', 'Changing rainfall patterns', 'Improved soil fertility everywhere', 'Extreme weather events'],
    // Question 3 options
    ['They always increase crop production', 'They have complex effects; some areas gain while others lose productivity', 'They have no effect on agriculture', 'They improve only tropical crops'],
    // Question 4 options
    ['Corn, beans, and potatoes', 'Wheat, rice, and maize', 'Cotton, coffee, and sugarcane', 'Apples, bananas, and grapes'],
    // Question 5 options
    ['Crops grow faster and stronger', 'Crops exceed their thermal tolerance', 'Rainfall increases evenly', 'New crops are easily introduced'],
    // Question 6 options
    ['Rainfall has become more predictable', 'Droughts and floods are both becoming more frequent', 'All regions are getting more rainfall', 'Rivers are freezing more often'],
    // Question 7 options
    ['It improves crop diversity', 'It disrupts traditional planting and harvesting cycles', 'It encourages farmers to use more fertilizers', 'It increases the size of farms'],
    // Question 8 options
    ['By reducing sunlight for crops', 'Through saltwater intrusion into farmland', 'By cooling the oceans', 'By increasing crop pollination'],
    // Question 9 options
    ['Mountain regions', 'Polar regions', 'Small island states and low-lying coastal areas', 'Desert regions'],
    // Question 10 options
    ['Developed countries', 'Developing countries in sub-Saharan Africa and parts of Asia', 'Northern Europe', 'North America'],
    // Question 11 options
    ['They have too much technology', 'They rely heavily on rain-fed agriculture and lack infrastructure', 'They grow only one crop type', 'They export most of their food'],
    // Question 12 options
    ['Developing climate-resilient crops', 'Diversifying farming practices', 'Building more urban areas', 'Improving water management systems'],
    // Question 13 options
    ['It helps farmers optimize inputs and reduce waste', 'It increases fertilizer dependency', 'It limits crop rotation', 'It replaces all manual labor'],
    // Question 14 options
    ['It focuses only on economic growth', 'It reduces greenhouse gas emissions to limit climate change severity', 'It eliminates all agricultural risks', 'It ensures equal food distribution'],
    // Question 15 options
    ['National isolation', 'International cooperation and technology sharing', 'Reducing scientific research', 'Relying solely on local farmers']
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
      questions: 10
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
      questions: 15
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
      questions: 15
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
    if (passageNum === 2) return 10;
    return 25;
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
        'What was the main characteristic of early 1900s urban planning?',
        'What major event led to rapid urban growth and new planning challenges?',
        'Which of the following was not a problem caused by rapid urban growth during the Industrial Revolution?',
        'Who introduced the Garden City concept?',
        'What was the main goal of the Garden City concept?',
        'What characterized modernist planning in the mid-20th century?',
        'Who criticized modernist urban planning for ignoring community life?',
        'What is a key focus of today\'s urban planning?',
        'Which of the following is an example of a modern urban planning feature?',
        'What does the passage suggest about the future of urban planning?'
      ],
      2: [
        'What is the main idea of the passage?',
        'In which area of healthcare is AI being used to detect abnormalities?',
        'What can AI algorithms detect in medical scans?',
        'Why is AI particularly useful in diagnostic imaging in some regions?',
        'How does AI help in drug discovery?',
        'Traditionally, drug discovery used to take:',
        'With AI, some pharmaceutical companies have reduced drug discovery timelines from:',
        'What is the focus of personalized medicine?',
        'Which type of data is analyzed in personalized medicine?',
        'What is one major benefit of personalized medicine using AI?',
        'What is one challenge mentioned regarding AI in healthcare?',
        'What is "algorithmic bias" in the context of AI healthcare?',
        'Why are regulatory frameworks important in AI healthcare?',
        'What do healthcare professionals need to effectively use AI tools?',
        'What is the passage\'s final outlook on AI in healthcare?'
      ],
      3: [
        'What is the main idea of the passage?',
        'Which of the following is not mentioned as an effect of climate change on agriculture?',
        'How do rising temperatures affect crop yields?',
        'Which staple crops are specifically mentioned as being affected by heat stress?',
        'What happens in tropical regions due to rising temperatures?',
        'How is water availability changing according to the passage?',
        'What effect does unpredictable rainfall have on farming?',
        'How does sea-level rise threaten agriculture?',
        'Which regions are most vulnerable to sea-level rise?',
        'Which areas face the greatest risk from climate impacts on agriculture?',
        'Why are these developing regions more vulnerable?',
        'Which of the following is not an adaptation strategy mentioned in the passage?',
        'What role does precision agriculture play?',
        'Why is mitigation important in addition to adaptation?',
        'What does the passage suggest as essential for addressing food security challenges?'
      ]
    };

    const passageQuestions = questionTexts[passageNum];
    const questionIndex = index - getQuestionStartIndex(passageNum);
    return passageQuestions[questionIndex] || `Question ${index + 1}`;
  };

  const getQuestionInput = (index: number, questionNum: number, passageNum: number) => {
    const questionIndex = index - getQuestionStartIndex(passageNum);
    
    // Multiple choice questions for Passage 1 with full options
    if (passageNum === 1 && questionIndex < 10) {
      const options = passage1Options[questionIndex];
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
    
    // Multiple choice questions for Passage 2 with full options
    if (passageNum === 2 && questionIndex < 15) {
      const options = passage2Options[questionIndex];
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
    
    // Multiple choice questions for Passage 3 with full options
    if (passageNum === 3 && questionIndex < 15) {
      const options = passage3Options[questionIndex];
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
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
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
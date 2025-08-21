import React, { useState, useEffect } from 'react';
import { Mic, Clock, MessageSquare, User, Volume2 } from 'lucide-react';
import Timer from './Timer';

interface SpeakingModuleProps {
  onComplete: (results: {
    part1Score: number;
    part2Score: number;
    part3Score: number;
    responses: string[];
    timeSpent: number;
  }) => void;
}

const SpeakingModule: React.FC<SpeakingModuleProps> = ({ onComplete }) => {
  const [currentPart, setCurrentPart] = useState(1);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<string[]>([]);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isRecording, setIsRecording] = useState(false);

  const speakingParts = [
    {
      title: 'Part 1 - Introduction and Interview',
      duration: '4-5 minutes',
      description: 'General questions about yourself, your life, and familiar topics',
      questions: [
        'What is your full name?',
        'Where are you from?',
        'Do you work or are you a student?',
        'What do you like about your job/studies?',
        'Do you enjoy reading books? Why or why not?',
        'What kind of books do you prefer?',
        'How has your reading habit changed over the years?'
      ]
    },
    {
      title: 'Part 2 - Individual Long Turn',
      duration: '3-4 minutes',
      description: 'Speak for 1-2 minutes on a given topic after 1 minute of preparation',
      questions: [
        `Describe a memorable journey you have taken.
        
        You should say:
        • Where you went
        • Who you went with
        • What you did during the journey
        • And explain why this journey was memorable for you
        
        You have 1 minute to prepare. You can make notes if you wish.`
      ]
    },
    {
      title: 'Part 3 - Two-way Discussion',
      duration: '4-5 minutes',
      description: 'Abstract discussion related to Part 2 topic',
      questions: [
        'Why do you think people enjoy traveling?',
        'How has tourism changed in your country over the years?',
        'What are the benefits and drawbacks of international tourism?',
        'Do you think virtual travel experiences could replace real travel in the future?',
        'How important is it for young people to experience different cultures?'
      ]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const evaluateSpeaking = (partNum: number, responses: string[]): number => {
    // Simplified evaluation based on response length and content
    const startIndex = getPartStartIndex(partNum);
    const endIndex = getPartEndIndex(partNum);
    const partResponses = responses.slice(startIndex, endIndex);
    
    let totalScore = 0;
    let responseCount = 0;
    
    partResponses.forEach(response => {
      if (response.trim()) {
        const wordCount = response.trim().split(/\s+/).length;
        let score = 4.0; // Base score
        
        if (wordCount > 20) score += 0.5;
        if (wordCount > 50) score += 0.5;
        if (wordCount > 80) score += 0.5;
        if (response.includes('.') || response.includes('!') || response.includes('?')) score += 0.5;
        if (partNum === 2 && wordCount > 120) score += 1.0; // Long turn bonus
        
        totalScore += Math.min(score, 9.0);
        responseCount++;
      }
    });
    
    return responseCount > 0 ? totalScore / responseCount : 5.0;
  };

  const getPartStartIndex = (partNum: number): number => {
    if (partNum === 1) return 0;
    if (partNum === 2) return 7;
    return 8;
  };

  const getPartEndIndex = (partNum: number): number => {
    if (partNum === 1) return 7;
    if (partNum === 2) return 8;
    return 13;
  };

  const handleResponseSubmit = (response: string) => {
    const newResponses = [...responses];
    const responseIndex = getPartStartIndex(currentPart) + currentQuestion;
    newResponses[responseIndex] = response;
    setResponses(newResponses);

    if (currentQuestion < speakingParts[currentPart - 1].questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Move to next part or complete
      if (currentPart < 3) {
        setCurrentPart(currentPart + 1);
        setCurrentQuestion(0);
      } else {
        // Complete test
        const part1Score = evaluateSpeaking(1, newResponses);
        const part2Score = evaluateSpeaking(2, newResponses);
        const part3Score = evaluateSpeaking(3, newResponses);
        
        onComplete({
          part1Score,
          part2Score,
          part3Score,
          responses: newResponses,
          timeSpent
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Mic className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">IELTS Speaking Test</h1>
                <p className="text-gray-600">3 parts • 11-14 minutes total</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-lg font-bold text-gray-800">
                  {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
                </div>
                <div className="text-sm text-gray-500">Time elapsed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Examiner Introduction */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start space-x-4">
            <User className="w-8 h-8 text-blue-600 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">Examiner Instructions</h3>
              <p className="text-gray-700 mb-4">
                Good morning/afternoon. I'm your IELTS examiner today. This speaking test will take 
                about 11-14 minutes and consists of three parts. I'll be asking you questions and 
                I'd like you to answer as fully as possible. Please speak clearly and don't worry 
                if I stop you - it just means we need to move on to keep to the time limit.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <p className="text-blue-800">
                  <strong>Current Part:</strong> {speakingParts[currentPart - 1].title} 
                  ({speakingParts[currentPart - 1].duration})
                </p>
                <p className="text-blue-700 text-sm mt-1">
                  {speakingParts[currentPart - 1].description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Current Question */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start space-x-4 mb-6">
            <MessageSquare className="w-6 h-6 text-green-600 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800 mb-3">
                Question {getPartStartIndex(currentPart) + currentQuestion + 1}
              </h3>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-line">
                  {speakingParts[currentPart - 1].questions[currentQuestion]}
                </p>
              </div>
              
              {currentPart === 2 && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 text-sm">
                    <strong>Preparation Time:</strong> Take up to 1 minute to prepare your response. 
                    You may make notes. Then speak for 1-2 minutes.
                  </p>
                </div>
              )}
            </div>
          </div>

          <SpeakingResponse
            onSubmit={handleResponseSubmit}
            isLongTurn={currentPart === 2}
          />
        </div>

        {/* Progress Indicator */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-semibold text-gray-800">Test Progress</h4>
            <span className="text-sm text-gray-500">
              Part {currentPart} of 3 • Question {currentQuestion + 1} of {speakingParts[currentPart - 1].questions.length}
            </span>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            {speakingParts.map((part, index) => {
              const partNum = index + 1;
              const isActive = partNum === currentPart;
              const isCompleted = partNum < currentPart;
              
              return (
                <div
                  key={partNum}
                  className={`p-3 rounded-lg text-center ${
                    isActive ? 'bg-blue-100 border border-blue-300' :
                    isCompleted ? 'bg-green-100 border border-green-300' :
                    'bg-gray-100 border border-gray-200'
                  }`}
                >
                  <div className={`font-semibold ${
                    isActive ? 'text-blue-800' :
                    isCompleted ? 'text-green-800' :
                    'text-gray-600'
                  }`}>
                    Part {partNum}
                  </div>
                  <div className={`text-xs mt-1 ${
                    isActive ? 'text-blue-600' :
                    isCompleted ? 'text-green-600' :
                    'text-gray-500'
                  }`}>
                    {part.duration}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

interface SpeakingResponseProps {
  onSubmit: (response: string) => void;
  isLongTurn: boolean;
}

const SpeakingResponse: React.FC<SpeakingResponseProps> = ({ onSubmit, isLongTurn }) => {
  const [response, setResponse] = useState('');
  const [preparationTime, setPreparationTime] = useState(isLongTurn ? 60 : 0);
  const [isPreparingNotes, setIsPreparingNotes] = useState(isLongTurn);

  useEffect(() => {
    if (isPreparingNotes && preparationTime > 0) {
      const timer = setTimeout(() => {
        setPreparationTime(preparationTime - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (isPreparingNotes && preparationTime === 0) {
      setIsPreparingNotes(false);
    }
  }, [preparationTime, isPreparingNotes]);

  const handleSubmit = () => {
    if (response.trim()) {
      onSubmit(response);
      setResponse('');
      setPreparationTime(isLongTurn ? 60 : 0);
      setIsPreparingNotes(isLongTurn);
    }
  };

  if (isPreparingNotes) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-gray-800">Preparation Time</h4>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span className="font-bold text-blue-600">{preparationTime}s</span>
          </div>
        </div>
        
        <textarea
          placeholder="Make notes for your response (optional)..."
          className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        
        <button
          onClick={() => setIsPreparingNotes(false)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
        >
          Start Speaking
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3 mb-3">
        <Volume2 className="w-5 h-5 text-red-500" />
        <span className="text-red-600 font-medium">Recording your response...</span>
      </div>
      
      <textarea
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        placeholder="Type your spoken response here (simulate speaking)..."
        className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          {response.trim().split(/\s+/).length} words
        </span>
        <button
          onClick={handleSubmit}
          disabled={!response.trim()}
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-md font-medium transition-colors"
        >
          Next Question
        </button>
      </div>
    </div>
  );
};

export default SpeakingModule;
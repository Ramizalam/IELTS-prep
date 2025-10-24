import React, { useState, useEffect } from 'react';
import { PenTool, Clock, FileText } from 'lucide-react';
import Timer from './Timer';

interface WritingModuleProps {
  onComplete: (results: {
    task1Score: number;
    task2Score: number;
    task1Response: string;
    task2Response: string;
    timeSpent: number;
  }) => void;
}

const WritingModule: React.FC<WritingModuleProps> = ({ onComplete }) => {
  const [currentTask, setCurrentTask] = useState(1);
  const [task1Response, setTask1Response] = useState('');
  const [task2Response, setTask2Response] = useState('');
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const evaluateTask1 = (response: string): number => {
    const wordCount = response.trim().split(/\s+/).length;
    const hasIntroduction = response.toLowerCase().includes('chart') || response.toLowerCase().includes('graph') || response.toLowerCase().includes('table');
    const hasOverview = response.toLowerCase().includes('overall') || response.toLowerCase().includes('in general');
    const hasData = /\d+/.test(response);
    const hasComparisons = response.includes('than') || response.includes('compared') || response.includes('whereas');
    
    let score = 4.0; // Base score
    
    if (wordCount >= 150) score += 0.5;
    if (wordCount >= 170) score += 0.5;
    if (hasIntroduction) score += 0.5;
    if (hasOverview) score += 0.5;
    if (hasData) score += 0.5;
    if (hasComparisons) score += 0.5;
    if (wordCount > 200) score += 0.5;
    
    return Math.min(score, 9.0);
  };

  const evaluateTask2 = (response: string): number => {
    const wordCount = response.trim().split(/\s+/).length;
    const paragraphs = response.split('\n\n').filter(p => p.trim().length > 0).length;
    const hasPosition = response.toLowerCase().includes('agree') || response.toLowerCase().includes('disagree') || 
                       response.toLowerCase().includes('believe') || response.toLowerCase().includes('opinion');
    const hasExamples = response.toLowerCase().includes('example') || response.toLowerCase().includes('instance');
    const hasConclusion = response.toLowerCase().includes('conclusion') || response.toLowerCase().includes('summary');
    
    let score = 4.0; // Base score
    
    if (wordCount >= 250) score += 0.5;
    if (wordCount >= 280) score += 0.5;
    if (paragraphs >= 4) score += 0.5;
    if (hasPosition) score += 1.0;
    if (hasExamples) score += 0.5;
    if (hasConclusion) score += 0.5;
    if (wordCount > 320) score += 0.5;
    
    return Math.min(score, 9.0);
  };

  const handleSubmit = () => {
    const task1Score = evaluateTask1(task1Response);
    const task2Score = evaluateTask2(task2Response);
    
    onComplete({
      task1Score,
      task2Score,
      task1Response,
      task2Response,
      timeSpent
    });
  };

  const getWordCount = (text: string) => {
    return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <PenTool className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-800">IELTS Writing Test</h1>
                <p className="text-gray-600">2 tasks • 60 minutes total</p>
              </div>
            </div>
            <Timer duration={60 * 60} onTimeUp={handleSubmit} />
          </div>
        </div>

        {/* Task Navigation */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <button
                onClick={() => setCurrentTask(1)}
                className={`px-4 py-2 rounded-md font-medium ${
                  currentTask === 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Task 1
              </button>
              <button
                onClick={() => setCurrentTask(2)}
                className={`px-4 py-2 rounded-md font-medium ${
                  currentTask === 2
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Task 2
              </button>
            </div>
            
            <div className="text-sm text-gray-500">
              Recommended time: Task 1 - 20 min • Task 2 - 40 min
            </div>
          </div>
        </div>

        {currentTask === 1 && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Task 1 Instructions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Writing Task 1</h2>
              <div className="mb-6">
                <p className="text-gray-700 mb-4">
                  <strong>Time:</strong> 20 minutes<br />
                  <strong>Word count:</strong> At least 150 words
                </p>
                
                <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                  <h3 className="font-semibold text-blue-800 mb-2">Task Instructions</h3>
                  <p className="text-blue-700">
                    The chart below shows the percentage of households with different types of internet 
                    connections in three countries from 2010 to 2020.
                  </p>
                  <p className="text-blue-700 mt-2">
                    Summarize the information by selecting and reporting the main features, and make 
                    comparisons where relevant.
                  </p>
                </div>

                {/* Simulated Chart Data */}
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h4 className="font-semibold mb-3">Internet Connection Types by Country (2010-2020)</h4>
                  <div className="text-sm">
                    <p><strong>Broadband:</strong></p>
                    <p>Country A: 45% (2010) → 85% (2020)</p>
                    <p>Country B: 30% (2010) → 75% (2020)</p>
                    <p>Country C: 25% (2010) → 65% (2020)</p>
                    
                    <p className="mt-2"><strong>Mobile Internet:</strong></p>
                    <p>Country A: 15% (2010) → 70% (2020)</p>
                    <p>Country B: 20% (2010) → 80% (2020)</p>
                    <p>Country C: 10% (2010) → 60% (2020)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Task 1 Response */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Your Response</h3>
                <div className="flex items-center space-x-4">
                  <span className={`text-sm ${getWordCount(task1Response) >= 150 ? 'text-green-600' : 'text-red-600'}`}>
                    {getWordCount(task1Response)} words
                  </span>
                  <span className="text-sm text-gray-500">
                    (minimum: 150)
                  </span>
                </div>
              </div>
              
              <textarea
                value={task1Response}
                onChange={(e) => setTask1Response(e.target.value)}
                className="w-full h-96 p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Write your response here..."
              />
            </div>
          </div>
        )}

        {currentTask === 2 && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Task 2 Instructions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Writing Task 2</h2>
              <div className="mb-6">
                <p className="text-gray-700 mb-4">
                  <strong>Time:</strong> 40 minutes<br />
                  <strong>Word count:</strong> At least 250 words
                </p>
                
                <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
                  <h3 className="font-semibold text-green-800 mb-2">Essay Question</h3>
                  <p className="text-green-700 mb-3">
                    Many people believe that social media has had a negative impact on society, 
                    particularly on young people. Others argue that social media has brought 
                    significant benefits to communication and information sharing.
                  </p>
                  <p className="text-green-700 font-medium">
                    Discuss both views and give your own opinion.
                  </p>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">Writing Tips</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Present both sides of the argument clearly</li>
                    <li>• Give your own opinion and support it</li>
                    <li>• Use specific examples where possible</li>
                    <li>• Organize your essay with clear paragraphs</li>
                    <li>• Write a strong conclusion</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Task 2 Response */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Your Response</h3>
                <div className="flex items-center space-x-4">
                  <span className={`text-sm ${getWordCount(task2Response) >= 250 ? 'text-green-600' : 'text-red-600'}`}>
                    {getWordCount(task2Response)} words
                  </span>
                  <span className="text-sm text-gray-500">
                    (minimum: 250)
                  </span>
                </div>
              </div>
              
              <textarea
                value={task2Response}
                onChange={(e) => setTask2Response(e.target.value)}
                className="w-full h-96 p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Write your essay here..."
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="text-center mt-8">
          <button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Complete Writing Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default WritingModule;

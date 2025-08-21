import React, { useState } from 'react';
import { Clock, BookOpen, Headphones, PenTool, Mic, ChevronRight } from 'lucide-react';
import WelcomeScreen from './components/WelcomeScreen';
import ListeningModule from './components/ListeningModule';
import ReadingModule from './components/ReadingModule';
import WritingModule from './components/WritingModule';
import SpeakingModule from './components/SpeakingModule';
import ResultsScreen from './components/ResultsScreen';

export interface TestResults {
  listening: { score: number; answers: (string | number)[]; timeSpent: number };
  reading: { score: number; answers: (string | number)[]; timeSpent: number };
  writing: { task1Score: number; task2Score: number; task1Response: string; task2Response: string; timeSpent: number };
  speaking: { part1Score: number; part2Score: number; part3Score: number; responses: string[]; timeSpent: number };
}

function App() {
  const [currentModule, setCurrentModule] = useState<'welcome' | 'listening' | 'reading' | 'writing' | 'speaking' | 'results'>('welcome');
  const [testResults, setTestResults] = useState<Partial<TestResults>>({});

  const handleModuleComplete = (module: keyof TestResults, results: any) => {
    setTestResults(prev => ({ ...prev, [module]: results }));
    
    // Navigate to next module
    const moduleOrder = ['listening', 'reading', 'writing', 'speaking'];
    const currentIndex = moduleOrder.indexOf(module);
    
    if (currentIndex < moduleOrder.length - 1) {
      setCurrentModule(moduleOrder[currentIndex + 1] as any);
    } else {
      setCurrentModule('results');
    }
  };

  const startTest = () => {
    setCurrentModule('listening');
  };

  const resetTest = () => {
    setCurrentModule('welcome');
    setTestResults({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {currentModule === 'welcome' && (
        <WelcomeScreen onStart={startTest} />
      )}
      
      {currentModule === 'listening' && (
        <ListeningModule onComplete={(results) => handleModuleComplete('listening', results)} />
      )}
      
      {currentModule === 'reading' && (
        <ReadingModule onComplete={(results) => handleModuleComplete('reading', results)} />
      )}
      
      {currentModule === 'writing' && (
        <WritingModule onComplete={(results) => handleModuleComplete('writing', results)} />
      )}
      
      {currentModule === 'speaking' && (
        <SpeakingModule onComplete={(results) => handleModuleComplete('speaking', results)} />
      )}
      
      {currentModule === 'results' && (
        <ResultsScreen results={testResults as TestResults} onReset={resetTest} />
      )}
    </div>
  );
}

export default App;
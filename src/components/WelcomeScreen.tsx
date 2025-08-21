  import React from 'react';
  import { BookOpen, Clock, CheckCircle } from 'lucide-react';
  
  interface WelcomeScreenProps {
    onStart: () => void;
  }
  
  const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
    const heroImage =
      'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=';

    const moduleImages = {
      listening:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=',
      reading:
        'https://images.unsplash.com/photo-1519682337058-a94d519337bc?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=',
      writing:
        'https://images.unsplash.com/photo-1517976487492-57651fb41e36?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=',
      speaking:
        'https://images.unsplash.com/photo-1523246199118-0c1b3fc09c12?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=',
    } as const;

    return (
      <div className="min-h-screen flex items-start justify-center p-6 md:p-10">
        <div className="w-full max-w-6xl mx-auto space-y-10">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <div
              className="h-[280px] md:h-[360px] w-full bg-center bg-cover"
              style={{ backgroundImage: `linear-gradient(rgba(3,7,18,0.55), rgba(3,7,18,0.45)), url(${heroImage})` }}
            />
            <div className="absolute inset-0 p-8 md:p-12 flex flex-col items-start justify-end">
              <BookOpen className="w-12 h-12 text-white mb-3" />
              <h1 className="text-white text-3xl md:text-5xl font-extrabold tracking-tight">
                Master the IELTS with Confidence
              </h1>
              <p className="text-white/90 mt-3 md:text-lg max-w-2xl">
                Realistic exam simulation, professional timing, and insights to lift your band score.
              </p>
              <div className="mt-6">
                <button
                  onClick={onStart}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 md:py-4 md:px-8 rounded-xl text-base md:text-lg transition-all duration-200 transform hover:translate-y-[-2px] shadow-lg shadow-blue-600/30"
                >
                  Begin IELTS Test
                </button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-7 md:p-10">
              <h3 className="text-2xl font-semibold text-gray-800 mb-5">Test Overview</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Listening: 30 minutes + 10 minutes transfer</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Reading: 60 minutes</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Writing: 60 minutes (Task 1 & Task 2)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Speaking: 11-14 minutes (3 parts)</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-7 md:p-10">
              <h3 className="text-2xl font-semibold text-gray-800 mb-5">What You'll Get</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-500" />
                  <span>Official IELTS band scores (0-9)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-500" />
                  <span>Detailed performance analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-500" />
                  <span>Expert examiner feedback</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-blue-500" />
                  <span>Personalized study plan</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { key: 'listening', label: 'Listening', img: moduleImages.listening },
              { key: 'reading', label: 'Reading', img: moduleImages.reading },
              { key: 'writing', label: 'Writing', img: moduleImages.writing },
              { key: 'speaking', label: 'Speaking', img: moduleImages.speaking },
            ].map(card => (
              <div key={card.key} className="group relative overflow-hidden rounded-2xl shadow-lg">
                <div
                  className="h-28 md:h-36 w-full bg-center bg-cover transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: `linear-gradient(rgba(3,7,18,0.3), rgba(3,7,18,0.3)), url(${card.img})` }}
                />
                <div className="absolute inset-0 flex items-end p-4">
                  <span className="bg-white/90 text-gray-900 text-sm md:text-base font-semibold px-3 py-1.5 rounded-lg shadow">
                    {card.label}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 md:p-8 flex gap-4 md:gap-6 items-start">
            <Clock className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-amber-900">Test Conditions</h4>
              <p className="text-amber-800 mt-1">
                This simulation follows official IELTS timing and format. Choose a quiet place and ensure a stable
                internet connection for the best experience.
              </p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={onStart}
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 md:py-4 md:px-8 rounded-xl text-base md:text-lg transition-all duration-200 transform hover:translate-y-[-2px] shadow-lg shadow-blue-600/30"
            >
              Start Full Test
            </button>
            <p className="text-sm text-gray-500 mt-3">Total time: ~2h 45m</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default WelcomeScreen;
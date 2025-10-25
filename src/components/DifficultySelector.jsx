import React from 'react';

const DifficultySelector = ({ onSelectDifficulty }) => {
  const difficulties = [
    {
      level: 'easy',
      title: 'Easy',
      description: 'Claude plays casually and makes mistakes',
      color: 'from-green-500 to-emerald-600',
      icon: '😊'
    },
    {
      level: 'medium',
      title: 'Medium',
      description: 'Claude plays well but misses opportunities',
      color: 'from-yellow-500 to-orange-600',
      icon: '🤔'
    },
    {
      level: 'hard',
      title: 'Hard',
      description: 'Claude plays strategically and never misses',
      color: 'from-red-500 to-pink-600',
      icon: '🧠'
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Join Dots
          </h1>
          <p className="text-xl text-blue-200">Connect Four with AI Claude</p>
        </div>

        <div className="glass-strong rounded-3xl p-8 shadow-2xl">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Choose Difficulty
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {difficulties.map(({ level, title, description, color, icon }) => (
              <button
                key={level}
                onClick={() => onSelectDifficulty(level)}
                className="glass rounded-2xl p-6 hover:scale-105 transition-all duration-300 hover:shadow-xl group"
              >
                <div className="text-6xl mb-4">{icon}</div>
                <div className={`text-2xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent mb-3`}>
                  {title}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {description}
                </p>
                <div className={`mt-4 h-1 bg-gradient-to-r ${color} rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
              </button>
            ))}
          </div>

          <div className="mt-8 text-center text-gray-400 text-sm">
            <p>🔴 You play as Red • 🟡 Claude plays as Yellow</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DifficultySelector;

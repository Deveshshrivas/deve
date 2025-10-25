import React from 'react';

const AIThinkingPanel = ({ aiMoves, isThinking, currentThought }) => {
  return (
    <div className="glass-strong rounded-3xl p-6 shadow-2xl h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="text-3xl">🤖</div>
        <div>
          <h3 className="text-xl font-bold text-white">Claude's Mind</h3>
          <p className="text-sm text-gray-400">AI Thinking Process</p>
        </div>
      </div>

      {isThinking && (
        <div className="mb-6 glass rounded-xl p-4 border-2 border-yellow-500/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex gap-1">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="text-yellow-300 font-medium">Thinking...</span>
          </div>
          <p className="text-gray-300 text-sm">{currentThought}</p>
        </div>
      )}

      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        {aiMoves.length === 0 && !isThinking && (
          <div className="text-center text-gray-500 py-8">
            <div className="text-4xl mb-2">💭</div>
            <p>AI moves will appear here</p>
          </div>
        )}

        {aiMoves.map((move, index) => (
          <div key={index} className="glass rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-start justify-between mb-2">
              <span className="text-yellow-400 font-bold">Round {move.round}</span>
              <span className="text-gray-400 text-sm">Column {move.column}</span>
            </div>
            
            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-400">Move:</span>
                <p className="text-white mt-1">{move.reasoning}</p>
              </div>
              
              {move.threats && (
                <div>
                  <span className="text-gray-400">Threats:</span>
                  <p className="text-orange-300 mt-1">{move.threats}</p>
                </div>
              )}
              
              {move.strategy && (
                <div>
                  <span className="text-gray-400">Strategy:</span>
                  <p className="text-blue-300 mt-1">{move.strategy}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIThinkingPanel;

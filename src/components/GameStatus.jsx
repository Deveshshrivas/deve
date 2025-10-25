import React from 'react';
import { PLAYER, AI } from '../gameLogic';

const GameStatus = ({ 
  currentPlayer, 
  winner, 
  isDraw, 
  onPlayAgain, 
  onChangeDifficulty,
  difficulty 
}) => {
  const getPlayerName = (player) => {
    return player === PLAYER ? 'Your' : "Claude's";
  };

  const getPlayerColor = (player) => {
    return player === PLAYER 
      ? 'from-red-500 to-pink-600' 
      : 'from-yellow-400 to-orange-500';
  };

  const getDifficultyBadge = () => {
    const colors = {
      easy: 'bg-green-500/20 text-green-300 border-green-500/50',
      medium: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50',
      hard: 'bg-red-500/20 text-red-300 border-red-500/50'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-sm border ${colors[difficulty]}`}>
        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
      </span>
    );
  };

  if (winner || isDraw) {
    return (
      <div className="glass-strong rounded-3xl p-8 shadow-2xl text-center">
        <div className="mb-6">
          {isDraw ? (
            <>
              <div className="text-6xl mb-4">🤝</div>
              <h2 className="text-4xl font-bold text-white mb-2">It's a Draw!</h2>
              <p className="text-gray-300">The board is full. Well played!</p>
            </>
          ) : (
            <>
              <div className="text-6xl mb-4">{winner === PLAYER ? '🎉' : '🤖'}</div>
              <h2 className={`text-4xl font-bold bg-gradient-to-r ${getPlayerColor(winner)} bg-clip-text text-transparent mb-2`}>
                {getPlayerName(winner)} Win!
              </h2>
              <p className="text-gray-300">
                {winner === PLAYER ? 'Congratulations! You beat Claude!' : 'Claude wins this round!'}
              </p>
            </>
          )}
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={onPlayAgain}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Play Again
          </button>
          <button
            onClick={onChangeDifficulty}
            className="px-8 py-3 glass text-white font-bold rounded-xl hover:scale-105 transition-all duration-300"
          >
            Change Difficulty
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-strong rounded-3xl p-6 shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm text-gray-400 mb-1">Current Turn</h3>
          <div className={`text-2xl font-bold bg-gradient-to-r ${getPlayerColor(currentPlayer)} bg-clip-text text-transparent`}>
            {currentPlayer === PLAYER ? 'Your Turn' : "Claude's Turn"}
          </div>
        </div>
        <div className="text-4xl">
          {currentPlayer === PLAYER ? '🔴' : '🟡'}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-700">
        <span className="text-gray-400 text-sm">Difficulty:</span>
        {getDifficultyBadge()}
      </div>

      <button
        onClick={onChangeDifficulty}
        className="w-full mt-4 px-4 py-2 glass text-white text-sm rounded-lg hover:bg-white/10 transition-all duration-300"
      >
        Change Settings
      </button>
    </div>
  );
};

export default GameStatus;

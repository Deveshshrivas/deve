import React from 'react';
import { PLAYER, AI } from '../gameLogic';

const GameBoard = ({ 
  board, 
  onColumnClick, 
  winningCells, 
  lastMove, 
  isAnimating,
  hoverColumn,
  onColumnHover,
  onColumnLeave,
  currentPlayer 
}) => {
  const ROWS = 6;
  const COLS = 7;

  const isWinningCell = (row, col) => {
    return winningCells?.some(([r, c]) => r === row && c === col);
  };

  const isLastMove = (row, col) => {
    return lastMove && lastMove.row === row && lastMove.col === col;
  };

  const getCellColor = (value) => {
    if (value === PLAYER) {
      return 'bg-gradient-to-br from-red-500 to-pink-600';
    } else if (value === AI) {
      return 'bg-gradient-to-br from-yellow-400 to-orange-500';
    }
    return 'bg-gray-700/50';
  };

  const getCellGlow = (value) => {
    if (value === PLAYER) {
      return 'shadow-[0_0_20px_rgba(239,68,68,0.6)]';
    } else if (value === AI) {
      return 'shadow-[0_0_20px_rgba(251,191,36,0.6)]';
    }
    return '';
  };

  const getPreviewPieceColor = () => {
    if (currentPlayer === PLAYER) {
      return 'bg-gradient-to-br from-red-500/60 to-pink-600/60';
    }
    return 'bg-gradient-to-br from-yellow-400/60 to-orange-500/60';
  };

  return (
    <div className="glass-strong rounded-3xl p-8 shadow-2xl">
      <div className="inline-block">
        {/* Column hover preview */}
        <div className="flex gap-2 mb-4">
          {Array(COLS).fill(null).map((_, col) => (
            <div key={col} className="w-16 h-8 flex items-center justify-center">
              {hoverColumn === col && !isAnimating && board[0][col] === 0 && (
                <div className={`w-12 h-12 rounded-full ${getPreviewPieceColor()} opacity-50 animate-pulse`}></div>
              )}
            </div>
          ))}
        </div>

        {/* Game board */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-4 shadow-2xl">
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="flex gap-2 mb-2 last:mb-0">
              {row.map((cell, colIndex) => (
                <div
                  key={colIndex}
                  onClick={() => !isAnimating && onColumnClick(colIndex)}
                  onMouseEnter={() => onColumnHover(colIndex)}
                  onMouseLeave={onColumnLeave}
                  className={`w-16 h-16 rounded-lg flex items-center justify-center transition-all duration-200 ${
                    !isAnimating && cell === 0 ? 'cursor-pointer hover:bg-blue-500/50' : ''
                  }`}
                >
                  <div className="relative w-14 h-14">
                    {/* Cell background */}
                    <div className="absolute inset-0 bg-slate-900/80 rounded-full"></div>
                    
                    {/* Piece */}
                    {cell !== 0 && (
                      <div
                        className={`absolute inset-0 rounded-full ${getCellColor(cell)} ${getCellGlow(cell)} 
                          ${isWinningCell(rowIndex, colIndex) ? 'animate-pulse-glow' : ''}
                          transition-all duration-300`}
                      >
                        {/* Last move ring */}
                        {isLastMove(rowIndex, colIndex) && (
                          <div className="absolute inset-0 rounded-full border-4 border-white animate-pulse"></div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameBoard;

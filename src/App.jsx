import React, { useState, useEffect, useRef } from 'react';
import AnimatedBackground from './components/AnimatedBackground';
import DifficultySelector from './components/DifficultySelector';
import GameBoard from './components/GameBoard';
import GameStatus from './components/GameStatus';
import AIThinkingPanel from './components/AIThinkingPanel';
import { 
  createEmptyBoard, 
  dropPiece, 
  checkWinner, 
  isBoardFull,
  isValidMove,
  PLAYER,
  AI
} from './gameLogic';
import { makeAIMove } from './aiPlayer';

function App() {
  const [gameState, setGameState] = useState('difficulty'); // 'difficulty', 'playing'
  const [difficulty, setDifficulty] = useState('medium');
  const [board, setBoard] = useState(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER);
  const [winner, setWinner] = useState(null);
  const [winningCells, setWinningCells] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [lastMove, setLastMove] = useState(null);
  const [aiMoves, setAiMoves] = useState([]);
  const [isAIThinking, setIsAIThinking] = useState(false);
  const [currentThought, setCurrentThought] = useState('');
  const [hoverColumn, setHoverColumn] = useState(null);
  const [roundNumber, setRoundNumber] = useState(1);

  const aiThinkingRef = useRef(null);

  // Check for winner after each move
  useEffect(() => {
    const result = checkWinner(board);
    if (result) {
      setWinner(result.winner);
      setWinningCells(result.cells);
    } else if (isBoardFull(board)) {
      setIsDraw(true);
    }
  }, [board]);

  // AI move logic
  useEffect(() => {
    if (currentPlayer === AI && !winner && !isDraw && gameState === 'playing') {
      const makeMove = async () => {
        setIsAIThinking(true);
        setIsAnimating(true);
        
        try {
          const moveData = await makeAIMove(board, difficulty, (thought) => {
            setCurrentThought(thought);
          });

          if (moveData) {
            // Add thinking delay for better UX
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const result = dropPiece(board, moveData.column, AI);
            if (result) {
              setBoard(result.board);
              setLastMove({ row: result.row, col: moveData.column });
              
              // Add AI move to history
              setAiMoves(prev => [{
                round: roundNumber,
                column: moveData.column,
                reasoning: moveData.reasoning,
                threats: moveData.threats,
                strategy: moveData.strategy
              }, ...prev]);

              setRoundNumber(prev => prev + 1);
              
              // Scroll to top of AI panel
              if (aiThinkingRef.current) {
                aiThinkingRef.current.scrollTop = 0;
              }
              
              setCurrentPlayer(PLAYER);
            }
          }
        } catch (error) {
          console.error('AI move failed:', error);
          setCurrentPlayer(PLAYER);
        } finally {
          setIsAIThinking(false);
          setIsAnimating(false);
          setCurrentThought('');
        }
      };

      makeMove();
    }
  }, [currentPlayer, board, winner, isDraw, difficulty, gameState, roundNumber]);

  const handleDifficultySelect = (level) => {
    setDifficulty(level);
    setGameState('playing');
    resetGame();
  };

  const handleColumnClick = (col) => {
    if (isAnimating || currentPlayer !== PLAYER || winner || isDraw) {
      return;
    }

    if (!isValidMove(board, col)) {
      return;
    }

    setIsAnimating(true);
    const result = dropPiece(board, col, PLAYER);
    
    if (result) {
      // Animate the drop
      setTimeout(() => {
        setBoard(result.board);
        setLastMove({ row: result.row, col });
        setCurrentPlayer(AI);
        setIsAnimating(false);
      }, 300);
    } else {
      setIsAnimating(false);
    }
  };

  const resetGame = () => {
    setBoard(createEmptyBoard());
    setCurrentPlayer(PLAYER);
    setWinner(null);
    setWinningCells(null);
    setIsDraw(false);
    setIsAnimating(false);
    setLastMove(null);
    setAiMoves([]);
    setIsAIThinking(false);
    setCurrentThought('');
    setRoundNumber(1);
  };

  const handlePlayAgain = () => {
    resetGame();
  };

  const handleChangeDifficulty = () => {
    setGameState('difficulty');
    resetGame();
  };

  const handleColumnHover = (col) => {
    if (!isAnimating && currentPlayer === PLAYER && !winner && !isDraw) {
      setHoverColumn(col);
    }
  };

  const handleColumnLeave = () => {
    setHoverColumn(null);
  };

  return (
    <div className="min-h-screen text-white">
      <AnimatedBackground />
      
      {gameState === 'difficulty' ? (
        <DifficultySelector onSelectDifficulty={handleDifficultySelect} />
      ) : (
        <div className="min-h-screen p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
                Join Dots
              </h1>
              <p className="text-blue-200">Connect Four • Human vs AI</p>
            </div>

            {/* Game Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Game Board - Left/Center */}
              <div className="lg:col-span-2 flex flex-col gap-6">
                <GameStatus
                  currentPlayer={currentPlayer}
                  winner={winner}
                  isDraw={isDraw}
                  onPlayAgain={handlePlayAgain}
                  onChangeDifficulty={handleChangeDifficulty}
                  difficulty={difficulty}
                />
                
                <div className="flex justify-center">
                  <GameBoard
                    board={board}
                    onColumnClick={handleColumnClick}
                    winningCells={winningCells}
                    lastMove={lastMove}
                    isAnimating={isAnimating}
                    hoverColumn={hoverColumn}
                    onColumnHover={handleColumnHover}
                    onColumnLeave={handleColumnLeave}
                    currentPlayer={currentPlayer}
                  />
                </div>
              </div>

              {/* AI Thinking Panel - Right */}
              <div className="lg:col-span-1">
                <div ref={aiThinkingRef} className="h-full min-h-[600px]">
                  <AIThinkingPanel
                    aiMoves={aiMoves}
                    isThinking={isAIThinking}
                    currentThought={currentThought}
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-8 text-gray-400 text-sm">
              <p>Powered by Claude AI • Built with React & Tailwind CSS</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

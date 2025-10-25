import { 
  dropPiece, 
  checkWinner, 
  getAvailableColumns, 
  boardToAscii,
  PLAYER,
  AI 
} from './gameLogic';

export const makeAIMove = async (board, difficulty, onThinking) => {
  const availableCols = getAvailableColumns(board);
  
  if (availableCols.length === 0) {
    return null;
  }

  // Format the board state for Claude
  const boardState = boardToAscii(board);
  
  const difficultyInstructions = {
    easy: `You are playing Connect Four at EASY difficulty. Play casually and make some random moves. 
    You don't need to always block the opponent's winning moves. Make it fun and beatable for the human player.`,
    medium: `You are playing Connect Four at MEDIUM difficulty. Play well but occasionally miss opportunities. 
    You should block obvious wins but might miss some strategic setups. Balance between challenging and beatable.`,
    hard: `You are playing Connect Four at HARD difficulty. Play optimally and strategically:
    - ALWAYS block opponent's immediate winning moves
    - Look for your own winning moves
    - Create multiple threats
    - Control the center columns
    - Think ahead about future opportunities`
  };

  const prompt = `${difficultyInstructions[difficulty]}

Current board state:
${boardState}

Available columns: ${availableCols.join(', ')}

Analyze the board and decide your move. Consider:
1. Can you win immediately? (Check if you can connect 4 Yellow pieces)
2. Must you block the opponent? (Check if Red can connect 4 in their next move)
3. What strategic position gives you the best future opportunities?

Respond with ONLY a JSON object in this exact format:
{
  "column": <number 0-6>,
  "reasoning": "<brief explanation of your move>",
  "threats": "<any threats you see>",
  "strategy": "<your strategic thinking>"
}`;

  try {
    onThinking?.('Analyzing board position...');
    
    // Call Claude API
    const response = await window.claude.complete({
      prompt,
      max_tokens: 500,
      temperature: difficulty === 'easy' ? 0.8 : difficulty === 'medium' ? 0.5 : 0.3
    });

    onThinking?.('Processing move...');

    // Parse Claude's response
    let moveData;
    try {
      // Extract JSON from response
      const jsonMatch = response.completion.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        moveData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', parseError);
      // Fallback to smart move
      moveData = makeSmartMove(board, availableCols, difficulty);
    }

    // Validate the column
    let column = parseInt(moveData.column);
    if (!availableCols.includes(column)) {
      console.warn('AI chose invalid column, using fallback');
      column = makeSmartMove(board, availableCols, difficulty).column;
    }

    return {
      column,
      reasoning: moveData.reasoning || 'Making a move',
      threats: moveData.threats || 'None detected',
      strategy: moveData.strategy || 'Playing strategically'
    };

  } catch (error) {
    console.error('AI move error:', error);
    onThinking?.('Using fallback AI...');
    
    // Fallback to deterministic AI
    return makeSmartMove(board, availableCols, difficulty);
  }
};

// Fallback smart move logic
const makeSmartMove = (board, availableCols, difficulty) => {
  // Check for winning move
  for (const col of availableCols) {
    const result = dropPiece(board, col, AI);
    if (result && checkWinner(result.board)?.winner === AI) {
      return {
        column: col,
        reasoning: 'Taking the winning move!',
        threats: 'Found winning opportunity',
        strategy: 'Winning the game'
      };
    }
  }

  // Check for blocking move (only on medium/hard)
  if (difficulty !== 'easy') {
    for (const col of availableCols) {
      const result = dropPiece(board, col, PLAYER);
      if (result && checkWinner(result.board)?.winner === PLAYER) {
        return {
          column: col,
          reasoning: 'Blocking opponent\'s winning move',
          threats: 'Opponent threatens to win',
          strategy: 'Defensive play'
        };
      }
    }
  }

  // Strategic moves based on difficulty
  if (difficulty === 'hard') {
    // Prefer center columns
    const centerCols = [3, 2, 4, 1, 5, 0, 6].filter(col => availableCols.includes(col));
    return {
      column: centerCols[0],
      reasoning: 'Playing strategically in center area',
      threats: 'Building position',
      strategy: 'Controlling the center'
    };
  } else if (difficulty === 'medium') {
    // Mix of center and random
    const preferredCols = Math.random() > 0.3 
      ? [3, 2, 4].filter(col => availableCols.includes(col))
      : availableCols;
    const col = preferredCols.length > 0 
      ? preferredCols[Math.floor(Math.random() * preferredCols.length)]
      : availableCols[Math.floor(Math.random() * availableCols.length)];
    return {
      column: col,
      reasoning: 'Playing a balanced move',
      threats: 'Developing position',
      strategy: 'Mixed strategy'
    };
  } else {
    // Easy: random move
    const col = availableCols[Math.floor(Math.random() * availableCols.length)];
    return {
      column: col,
      reasoning: 'Playing casually',
      threats: 'Exploring options',
      strategy: 'Having fun!'
    };
  }
};

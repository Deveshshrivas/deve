// Game utility functions

export const ROWS = 6;
export const COLS = 7;
export const PLAYER = 1; // Human (Red)
export const AI = 2; // Claude (Yellow)

export const createEmptyBoard = () => {
  return Array(ROWS).fill(null).map(() => Array(COLS).fill(0));
};

export const dropPiece = (board, col, player) => {
  const newBoard = board.map(row => [...row]);
  for (let row = ROWS - 1; row >= 0; row--) {
    if (newBoard[row][col] === 0) {
      newBoard[row][col] = player;
      return { board: newBoard, row };
    }
  }
  return null;
};

export const checkWinner = (board) => {
  // Check horizontal
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS - 3; col++) {
      const val = board[row][col];
      if (val !== 0 && 
          val === board[row][col + 1] && 
          val === board[row][col + 2] && 
          val === board[row][col + 3]) {
        return {
          winner: val,
          cells: [[row, col], [row, col + 1], [row, col + 2], [row, col + 3]]
        };
      }
    }
  }

  // Check vertical
  for (let row = 0; row < ROWS - 3; row++) {
    for (let col = 0; col < COLS; col++) {
      const val = board[row][col];
      if (val !== 0 && 
          val === board[row + 1][col] && 
          val === board[row + 2][col] && 
          val === board[row + 3][col]) {
        return {
          winner: val,
          cells: [[row, col], [row + 1, col], [row + 2, col], [row + 3, col]]
        };
      }
    }
  }

  // Check diagonal (down-right)
  for (let row = 0; row < ROWS - 3; row++) {
    for (let col = 0; col < COLS - 3; col++) {
      const val = board[row][col];
      if (val !== 0 && 
          val === board[row + 1][col + 1] && 
          val === board[row + 2][col + 2] && 
          val === board[row + 3][col + 3]) {
        return {
          winner: val,
          cells: [[row, col], [row + 1, col + 1], [row + 2, col + 2], [row + 3, col + 3]]
        };
      }
    }
  }

  // Check diagonal (down-left)
  for (let row = 0; row < ROWS - 3; row++) {
    for (let col = 3; col < COLS; col++) {
      const val = board[row][col];
      if (val !== 0 && 
          val === board[row + 1][col - 1] && 
          val === board[row + 2][col - 2] && 
          val === board[row + 3][col - 3]) {
        return {
          winner: val,
          cells: [[row, col], [row + 1, col - 1], [row + 2, col - 2], [row + 3, col - 3]]
        };
      }
    }
  }

  return null;
};

export const isBoardFull = (board) => {
  return board[0].every(cell => cell !== 0);
};

export const isValidMove = (board, col) => {
  return board[0][col] === 0;
};

export const boardToAscii = (board) => {
  let ascii = '```\n';
  ascii += '  0 1 2 3 4 5 6\n';
  ascii += '  ─────────────\n';
  for (let row = 0; row < ROWS; row++) {
    ascii += `${row}|`;
    for (let col = 0; col < COLS; col++) {
      const cell = board[row][col];
      ascii += cell === 0 ? '· ' : cell === PLAYER ? 'R ' : 'Y ';
    }
    ascii += '|\n';
  }
  ascii += '  ─────────────\n';
  ascii += '```\n';
  ascii += 'R = Red (Human), Y = Yellow (AI)';
  return ascii;
};

export const getAvailableColumns = (board) => {
  return Array.from({ length: COLS }, (_, i) => i).filter(col => isValidMove(board, col));
};

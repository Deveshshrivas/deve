# Join Dots

Connect-Four style game "Join Dots" — Human (red) vs Claude (yellow).

Features implemented:
- React + Vite app skeleton
- Tailwind CSS for styling
- 6x7 board, smooth drop animation, last move ring, pulsing win highlight
- Difficulty selection (easy, medium, hard)
- AI integration that tries to call `window.claude.complete` (if available) and falls back to a local AI
- AI thinking panel showing ASCII board and move history
- Animated gradient background orbs and glassmorphism panels

Quick start

1. Install dependencies

```powershell
npm install
```

2. Start dev server

```powershell
npm run dev
```

Notes
- To enable Claude integration, expose a global `window.claude.complete` function that accepts an object with `prompt` and returns an object containing `.output.text` with a JSON object like {"col":2, "thoughts":[...]}. The app falls back to local AI if Claude is unavailable.
- This is a front-end-only implementation; no server required.
# Join Dots - Connect Four AI Game

A visually stunning Connect Four game featuring AI-powered opponent Claude with three difficulty levels.

## Features

### Core Game Mechanics
- **Classic Connect Four**: 6 rows × 7 columns grid
- **Two Players**: Human (Red) vs AI Claude (Yellow)
- **Win Conditions**: Connect 4 pieces horizontally, vertically, or diagonally
- **Smooth Animations**: Pieces drop with physics-based animation
- **Visual Feedback**: 
  - Ring highlight on last move
  - Pulsing animation on winning pieces
  - Hover effects showing where pieces will drop

### AI Integration (Claude)
- **Three Difficulty Levels**:
  - **Easy**: Claude plays casually, makes random moves, doesn't always block wins
  - **Medium**: Plays well but occasionally misses opportunities  
  - **Hard**: Plays strategically - always blocks wins, creates opportunities, thinks ahead
- **AI Thinking Panel**: Shows Claude's reasoning in real-time
- **Move Analysis**: Displays threats, strategy, and reasoning for each AI move
- **Round Tracking**: All AI moves logged with round numbers

### UI/UX Design
- **Modern Dark Theme**: Gradient backgrounds with blue/slate tones
- **Animated Background**: Floating gradient orbs (purple, blue, pink)
- **Glassmorphism Effects**: Translucent panels with blur effects
- **Smooth Animations**: All interactions have polished transitions
- **Color Scheme**:
  - Red pieces: Red/pink gradients with glow
  - Yellow pieces: Yellow/orange gradients with glow
- **Responsive Layout**: Game board on left, AI panel on right

## Technology Stack

- **React 18** with hooks (useState, useEffect, useRef)
- **Vite** for fast development
- **Tailwind CSS** for styling
- **Claude AI API** (window.claude.complete)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to the URL shown (typically http://localhost:5173)

## How to Play

1. **Select Difficulty**: Choose Easy, Medium, or Hard difficulty level
2. **Make Your Move**: Click on any column to drop your red piece
3. **Watch Claude Think**: See Claude's reasoning in the AI panel on the right
4. **Win Condition**: Connect 4 pieces in a row to win!
5. **Play Again**: Reset or change difficulty anytime

## Game Controls

- **Click Column**: Drop piece in that column (if it's your turn)
- **Hover Column**: Preview where your piece will land
- **Play Again**: Start new game with same difficulty
- **Change Settings**: Return to difficulty selection

## Project Structure

```
game/
├── src/
│   ├── components/
│   │   ├── AnimatedBackground.jsx
│   │   ├── DifficultySelector.jsx
│   │   ├── GameBoard.jsx
│   │   ├── GameStatus.jsx
│   │   └── AIThinkingPanel.jsx
│   ├── gameLogic.js
│   ├── aiPlayer.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## AI Implementation

The AI uses `window.claude.complete` API with different strategies:

- **Easy**: Temperature 0.8, casual play, random moves
- **Medium**: Temperature 0.5, balanced strategy
- **Hard**: Temperature 0.3, optimal play with minimax-like thinking

Fallback AI is included if Claude API is unavailable.

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## Preview Production Build

```bash
npm run preview
```

## Browser Compatibility

- Modern browsers with ES6+ support
- Chrome, Firefox, Safari, Edge (latest versions)

## License

MIT

## Credits

- Built with React & Tailwind CSS
- Powered by Claude AI
- Game design inspired by classic Connect Four

---

**Enjoy playing Join Dots!** 🎮

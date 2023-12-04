// GameContext.js
import React, { createContext, useState } from 'react';

export const GameContext = createContext({
  gameState: null,
  setGameState: () => {}
});

export const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState(null);

  return (
    <GameContext.Provider value={{ gameState, setGameState }}>
      {children}
    </GameContext.Provider>
  );
};

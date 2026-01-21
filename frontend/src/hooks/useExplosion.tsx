import React, { useContext, useState, createContext, useCallback } from "react";

// Define the context type
type ExplosionContextType = {
  explode: boolean;
  explodeSubmarine: () => void;
  resetExplosion: () => void;
};

// Create the context with default values
export const ExplosionContext = createContext<ExplosionContextType>({
  explode: false,
  explodeSubmarine: () => {},
  resetExplosion: () => {},
});

// Provider component to wrap your app or part of it
export const ExplosionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [explode, setExplode] = useState(false);

  // Call this to trigger an explosion
  const explodeSubmarine = useCallback(() => {
    setExplode(true);
  }, []);

  // Call this to reset the explosion
  const resetExplosion = useCallback(() => {
    setExplode(false);
  }, []);

  return (
    <ExplosionContext.Provider value={{ explode, explodeSubmarine, resetExplosion }}>
      {children}
    </ExplosionContext.Provider>
  );
};

// Custom hook to use the explosion context
export const useExplosion = () => {
  return useContext(ExplosionContext);
};